package com.ssafy.backend.global.auth.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.backend.global.auth.model.LoginDto;
import com.ssafy.backend.global.auth.service.AuthService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@Api(tags = "AuthController v1")
@RequestMapping("/v1/auth")
public class AuthControllerV1 {

	private final AuthService authService;

	@PostMapping("/login")
	@ApiOperation(value = "로그인", notes = "로그인과 비밀번호 정보를 받아 로그인 결과를 jwt로 반환한다.")
	public ResponseEntity<?> login(
		@RequestBody LoginDto loginDto) {
		log.info("[Api Call] " + this.getClass().getName() + " - login");

		return authService.login(loginDto);
	}

	@PostMapping("/logout")
	@ApiOperation(value = "로그아웃", notes = "로그인된 사용자의 정보를 받아 서버에서 로그아웃을 수행한다.")
	public ResponseEntity<?> logout(
		HttpServletRequest request) {
		log.info("[Api Call] " + this.getClass().getName() + " - logout");

		return authService.logout(request);
	}

}
