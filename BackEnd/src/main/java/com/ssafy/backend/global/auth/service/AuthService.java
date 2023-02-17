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

		System.out.println("\ntoken email : " + tokenEmail);

		// 로컬에 남아있는 refresh 토큰을 삭제하지 않아도 redis 상에서 삭제되기만 하면 로그아웃 처리 된 것과 다름 없음
		// reissue가 동작하지 않을 것

		// refresh token 정보를 받아올 수 있는지 테스트
		System.out.println("\ntoken cookie : " + cookieUtil.getCookie(request, jwtUtil.REFRESH_TOKEN));

		jwtUtil.deleteRefreshToken(tokenEmail);

		return ResponseEntity.ok()
			.body(responseUtil.buildSuccessResponse("Logout Success"));
	}

}
