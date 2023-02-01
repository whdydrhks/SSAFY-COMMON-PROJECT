package com.ssafy.backend.domain.member.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.backend.domain.member.entity.UserEntity;
import com.ssafy.backend.domain.member.model.request.UserLoginDto;
import com.ssafy.backend.domain.member.model.request.UserSignupDto;
import com.ssafy.backend.domain.member.model.response.UserInfoDto;
import com.ssafy.backend.domain.member.service.UserService;
import com.ssafy.backend.global.util.Constants;
import com.ssafy.backend.global.util.CookieUtil;
import com.ssafy.backend.global.util.JwtUtil;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@Api(tags = "UserController v1")
@RequestMapping("api/v1/user")
public class UserControllerV1 {

	private final PasswordEncoder passwordEncoder;

	private final JwtUtil jwtUtil;
	private final CookieUtil cookieUtil;

	private final UserService userService;

	/**
	 * 유저 로그인을 위한 메소드
	 * Jwt토큰을 발급해 access토큰을 유저에게 쿠키로 전송하고, refresh토큰은 redis db에 저장해서 보관한다.
	 *
	 * @param
	 * @return
	 * @throws IllegalAccessException
	 */
	@PostMapping("/login")
	@ApiOperation(value = "일반 로그인")
	public ResponseEntity<?> login(@RequestBody UserLoginDto loginDto, HttpServletRequest httpServletRequest,
		HttpServletResponse httpServletResponse) throws IllegalAccessException {
		Map<String, Object> resultMap = new HashMap<>();
		//	HttpHeaders headers = new HttpHeaders();
		//	HttpStatus status = HttpStatus.OK;

		UserEntity user = userService.login(loginDto);
		String accessJwt = jwtUtil.createAccessToken(user);
		String refreshJwt = jwtUtil.createRefreshToken(user);

		Cookie refreshToken = cookieUtil.createCookie(jwtUtil.REFRESH_TOKEN, refreshJwt);

		//	resultMap.put(jwtUtil.REFRESH_TOKEN, refreshToken);
		//	resultMap.put(jwtUtil.ACCESS_TOKEN, accessJwt);
		resultMap.put("msg", "로그인 성공");

		httpServletResponse.addCookie(refreshToken);

		return ResponseEntity.ok()
			.header(HttpHeaders.AUTHORIZATION, accessJwt)
			.body(resultMap);
	}

	// 미완성
	@PostMapping("/logout")
	@ApiOperation(value = "로그아웃")
	public ResponseEntity<?> logout(HttpServletRequest httpServletRequest,
		HttpServletResponse httpServletResponse) throws IllegalAccessException {
		Map<String, Object> resultMap = new HashMap<>();
		//	HttpStatus status = HttpStatus.OK;

		String accessToken = getAuthToken(httpServletRequest);
		String userEmail = jwtUtil.getUserEmail(accessToken);

		jwtUtil.deleteRefreshToken(userEmail);

		resultMap.put("msg", "로그인 성공");

		return ResponseEntity.ok()
			.body(resultMap);
	}

	@GetMapping
	@ApiOperation(value = "사용자 전체 조회")
	public ResponseEntity<?> userInfoAll(
		@RequestParam(value = "keyword", defaultValue = "", required = false) String keyword,
		@RequestParam(value = "pageNo", defaultValue = "1", required = false) int page,
		HttpServletRequest httpServletRequest) {
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.OK;

		String accessToken = getAuthToken(httpServletRequest);
		String userEmail = jwtUtil.getUserEmail(accessToken);

		try {
			UserInfoDto infoDto = userService.getInfoByEmail(userEmail);
			resultMap.put("userInfo", infoDto);
			resultMap.put("msg", Constants.SUCCESS);
		} catch (IllegalAccessException e) {
			log.debug("user/info error: {}", e);

			resultMap.clear();
			resultMap.put("msg", Constants.FAIL);

			status = HttpStatus.ACCEPTED;
		}

		return ResponseEntity.status(status).body(resultMap);
	}

	@PostMapping
	@ApiOperation(value = "회원 가입")
	public ResponseEntity<?> signup(@RequestBody UserSignupDto signupDto) {
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.OK;

		if (userService.join(signupDto) != null) {
			resultMap.put("msg", Constants.SUCCESS);
		} else {
			resultMap.put("msg", Constants.FAIL);
			status = HttpStatus.BAD_REQUEST;
		}

		return ResponseEntity.status(status).body(resultMap);
	}

	@DeleteMapping
	@ApiOperation(value = "회원 탈퇴")
	public ResponseEntity<?> deleteAll(HttpServletRequest httpServletRequest) {
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.OK;

		String accessToken = getAuthToken(httpServletRequest);
		String userEmail = jwtUtil.getUserEmail(accessToken);

		try {
			Long deletedUserId = userService.updateExpire(userEmail, true);
			// Long deletedUserId = userService.delete(userEmail);

			resultMap.put("msg", Constants.SUCCESS);
			resultMap.put("deletedUserId", deletedUserId);
		} catch (IllegalAccessException e) {
			log.debug("user/info error: {}", e);

			resultMap.clear();
			resultMap.put("msg", Constants.FAIL);

			status = HttpStatus.ACCEPTED;
		}

		return ResponseEntity.status(status).body(resultMap);
	}

	@GetMapping("/{nickname}")
	@ApiOperation(value = "사용자 정보 조회")
	public ResponseEntity<?> getInfoUser(@PathVariable(name = "nickname") String nickname,
		HttpServletRequest httpServletRequest) {
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.OK;

		try {
			UserInfoDto infoDto = userService.getInfoByNickname(nickname);

			resultMap.put("msg", Constants.SUCCESS);
			resultMap.put("userInfo", infoDto);
		} catch (IllegalAccessException e) {

			resultMap.clear();
			resultMap.put("msg", Constants.FAIL);

			status = HttpStatus.BAD_REQUEST;
		}

		return ResponseEntity.status(status).body(resultMap);
	}

	@PutMapping("/{nickname}")
	@ApiOperation(value = "사용자 정보 수정")
	public ResponseEntity<?> updateUser() {
		return null;
	}

	@DeleteMapping("/{nickname}")
	@ApiOperation(value = "사용자 정보 삭제")
	public ResponseEntity<?> deleteUser() {
		return null;
	}

	@GetMapping("/request")
	@ApiOperation(value = "토큰 테스트")
	public ResponseEntity<?> request() {
		Map<String, Object> resultMap = new HashMap<>();

		resultMap.put("msg", "respones");

		return ResponseEntity.ok()
			.body(resultMap);
	}

	/**
	 * 헤더의 Authorization 자리에 있는 AccessToken 정보를 가지고온다.
	 *
	 * @param
	 * @return accessToken의 정보
	 */
	private String getAuthToken(HttpServletRequest httpServletRequest) {
		return httpServletRequest.getHeader(HttpHeaders.AUTHORIZATION);
	}

}
