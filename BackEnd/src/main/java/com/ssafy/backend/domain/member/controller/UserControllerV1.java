package com.ssafy.backend.domain.member.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

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

import com.ssafy.backend.domain.member.model.request.UserSignupDto;
import com.ssafy.backend.domain.member.model.request.UserUpdateDto;
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

		Long registerUserId = userService.join(signupDto);

		if (registerUserId != null) {
			status = HttpStatus.OK;
			resultMap.put("msg", Constants.SUCCESS);
			resultMap.put("registerUserId", registerUserId);
		} else {
			status = HttpStatus.BAD_REQUEST;
			resultMap.put("msg", Constants.FAIL);
		}

		return ResponseEntity.status(status).body(resultMap);
	}

	@GetMapping("/{nickname}")
	@ApiOperation(value = "사용자 정보 조회")
	public ResponseEntity<?> getInfoUser(
		@PathVariable(name = "nickname") String nickname,
		HttpServletRequest httpServletRequest) {
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.OK;

		try {
			UserInfoDto infoDto = userService.getInfoByNickname(nickname);

			status = HttpStatus.OK;
			resultMap.put("msg", Constants.SUCCESS);
			resultMap.put("userInfo", infoDto);
		} catch (IllegalAccessException e) {
			log.debug("user/info error: {}", e);

			status = HttpStatus.BAD_REQUEST;
			resultMap.clear();
			resultMap.put("msg", Constants.FAIL);
		}

		return ResponseEntity.status(status).body(resultMap);
	}

	@PutMapping("/{nickname}")
	@ApiOperation(value = "사용자 정보 수정")
	public ResponseEntity<?> updateUser(
		@PathVariable(name = "nickname") String nickname,
		@RequestBody UserUpdateDto updateDto,
		HttpServletRequest httpServletRequest) {
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.OK;

		String accessToken = getAuthToken(httpServletRequest);
		String userNickname = jwtUtil.getUserNickname(accessToken);

		try {
			if (!nickname.equals(userNickname)) {
				throw new IllegalAccessException();
			}

			Long updatedUserId = userService.update(userNickname, updateDto);

			status = HttpStatus.CREATED;
			resultMap.put("msg", Constants.SUCCESS);
			resultMap.put("updatedUserId", updatedUserId);

		} catch (IllegalAccessException e) {
			log.debug("user/info error: {}", e);

			status = HttpStatus.BAD_REQUEST;
			resultMap.clear();
			resultMap.put("msg", Constants.FAIL);
		}

		return ResponseEntity.status(status).body(resultMap);
	}

	@DeleteMapping("/{nickname}")
	@ApiOperation(value = "사용자 정보 삭제")
	public ResponseEntity<?> deleteUser(
		@PathVariable(name = "nickname") String nickname,
		HttpServletRequest httpServletRequest) {
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.OK;

		String accessToken = getAuthToken(httpServletRequest);
		String userEmail = jwtUtil.getUserEmail(accessToken);

		try {
			Long deletedUserId = userService.updateExpire(userEmail, true);
			// Long deletedUserId = userService.delete(userEmail);

			status = HttpStatus.NO_CONTENT;
			resultMap.put("msg", Constants.SUCCESS);
			resultMap.put("deletedUserId", deletedUserId);

		} catch (IllegalAccessException e) {
			log.debug("user/info error: {}", e);

			status = HttpStatus.ACCEPTED;
			resultMap.clear();
			resultMap.put("msg", Constants.FAIL);
		}

		return ResponseEntity.status(status).body(resultMap);
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
