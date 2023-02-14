package com.ssafy.backend.global.auth.service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.backend.domain.member.entity.UserEntity;
import com.ssafy.backend.domain.member.repository.UserRepository;
import com.ssafy.backend.global.auth.model.LoginDto;
import com.ssafy.backend.global.error.exception.ApiErrorException;
import com.ssafy.backend.global.util.CookieUtil;
import com.ssafy.backend.global.util.JwtUtil;
import com.ssafy.backend.global.util.ResponseUtil;
import com.ssafy.backend.global.util.enums.ApiStatus;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AuthService {

	private final PasswordEncoder passwordEncoder;

	private final CookieUtil cookieUtil;
	private final JwtUtil jwtUtil;
	private final ResponseUtil responseUtil;

	private final UserRepository userRepository;

	/**
	 * 로그인을 처리하는 메소드
	 *
	 * @param
	 * @return ResponseEntity&lt&gt
	 */
	@Transactional
	public ResponseEntity<?> login(LoginDto loginDto) {

		UserEntity findUser = userRepository.findByEmailAndExpiredLike(loginDto.getEmail(), "F")
			.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

		if (!passwordEncoder.matches(loginDto.getPassword(), findUser.getPassword())) {
			throw new ApiErrorException(ApiStatus.INVALID_PASSWORD);
		}

		String accessJwt = jwtUtil.createAccessToken(findUser);
		String refreshJwt = jwtUtil.createRefreshToken(findUser);

		Cookie refreshToken = cookieUtil.createCookie(jwtUtil.REFRESH_TOKEN, refreshJwt);
		ResponseCookie refreshCookie = cookieUtil.toResponseCookie(refreshToken);

		HttpHeaders headers = new HttpHeaders();
		headers.set(HttpHeaders.SET_COOKIE, refreshCookie.toString());
		headers.set(HttpHeaders.AUTHORIZATION, accessJwt);

		return ResponseEntity.ok()
			.headers(headers)
			.body(responseUtil.buildSuccessResponse("Login Success"));
	}

	/**
	 * 로그아웃을 처리하는 메소드
	 *
	 * @param
	 * @return ResponseEntity&lt&gt
	 */
	@Transactional
	public ResponseEntity<?> logout(HttpServletRequest request) {

		String tokenEmail = jwtUtil.getUserEmail(request);

		Cookie refreshToken = cookieUtil.deleteCookie(cookieUtil.getCookie(request, jwtUtil.REFRESH_TOKEN));
		ResponseCookie refreshCookie = cookieUtil.toResponseCookie(refreshToken);

		jwtUtil.deleteRefreshToken(tokenEmail);

		HttpHeaders headers = new HttpHeaders();
		headers.set(HttpHeaders.SET_COOKIE, refreshCookie.toString());

		return ResponseEntity.ok()
			.headers(headers)
			.body(responseUtil.buildSuccessResponse("Logout Success"));
	}

}
