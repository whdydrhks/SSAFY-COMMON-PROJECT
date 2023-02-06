package com.ssafy.backend.global.auth.service;

import java.util.Optional;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpHeaders;
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
@Transactional(readOnly = true) // 기본적으로 트랜잭션 안에서만 데이터 변경하게 설정(성능 향상)
@RequiredArgsConstructor // Lombok을 사용해 @Autowired 없이 의존성 주입. final 객제만 주입됨을 주의
public class AuthService {

	private final PasswordEncoder passwordEncoder;

	private final CookieUtil cookieUtil;
	private final JwtUtil jwtUtil;
	private final ResponseUtil responseUtil;

	private final UserRepository userRepository;

	/**
	 * 일반 로그인을 처리하는 메소드
	 *
	 * @param
	 * @return Optional<>
	 */
	@Transactional
	public ResponseEntity<?> login(LoginDto loginDto) {
		UserEntity findUser = userRepository.findByEmailAndExpiredLike(loginDto.getEmail(), "F")
			.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

		// 로그인을 시도한 이메일과 동일한 이메일이 없거나,
		// 비밀번호가 일치하지 않는다면 빈 Optional객체를 보냄
		if (!passwordEncoder.matches(loginDto.getPassword(), findUser.getPassword())) {
			throw new ApiErrorException(ApiStatus.INVALID_PASSWORD);
		}

		String accessJwt = jwtUtil.createAccessToken(findUser);
		String refreshJwt = jwtUtil.createRefreshToken(findUser);

		Cookie refreshToken = cookieUtil.createCookie(jwtUtil.REFRESH_TOKEN, refreshJwt);

		HttpHeaders headers = new HttpHeaders();
		headers.set(HttpHeaders.SET_COOKIE, refreshToken.toString());
		headers.set(HttpHeaders.AUTHORIZATION, accessJwt);

		return ResponseEntity.ok()
			.headers(headers)
			.body("Login Success");
	}

	/**
	 * 로그아웃을 처리하는 메소드
	 *
	 * @param
	 * @return Optional<>
	 */
	@Transactional
	public ResponseEntity<?> logout(HttpServletRequest request) {

		String tokenEmail = getEmailInAuthToken(request);

		jwtUtil.deleteRefreshToken(tokenEmail);

		return ResponseEntity
			.ok("Logout Success");
	}

	/**
	 * 헤더의 Authorization 자리에 있는 AccessToken 정보를 가지고온다.
	 *
	 * @param
	 * @return accessToken의 정보
	 */
	private String getAuthToken(HttpServletRequest request) {

		return Optional.ofNullable(request.getHeader(HttpHeaders.AUTHORIZATION))
			.orElseThrow(() -> new ApiErrorException(ApiStatus.NOT_LOGGED_IN));
	}

	/**
	 * 헤더의 Authorization 자리에 있는 AccessToken의 id 정보를 가지고온다.
	 *
	 * @param
	 * @return String accessToken의 id 정보
	 */
	private String getIdInAuthToken(HttpServletRequest request) {

		return jwtUtil.getUserId(getAuthToken(request));
	}

	/**
	 * 헤더의 Authorization 자리에 있는 AccessToken의 email 정보를 가지고온다.
	 *
	 * @param
	 * @return String accessToken의 email정보
	 */
	private String getEmailInAuthToken(HttpServletRequest request) {

		return jwtUtil.getUserEmail(getAuthToken(request));
	}

}
