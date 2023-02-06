package com.ssafy.backend.domain.member.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
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
import com.ssafy.backend.domain.member.service.UserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@Api(tags = "UserController v1")
@RequestMapping("/v1/user")
public class UserControllerV1 {

	private final UserService userService;

	@GetMapping("/search")
	@ApiOperation(value = "사용자 검색")
	public ResponseEntity<?> userShelter(
		@RequestParam(value = "keyword", defaultValue = "", required = false) String keyword,
		@RequestParam(value = "pageNo", defaultValue = "1", required = false) int page,
		HttpServletRequest request) {

		return ResponseEntity
			.ok(userService.searchInfoByNickname(keyword));
	}

	@GetMapping
	@ApiOperation(value = "사용자 전체 조회")
	public ResponseEntity<?> getUserInfoAll(
		@RequestParam(value = "pageNo", defaultValue = "1", required = false) int page,
		HttpServletRequest request) {

		return ResponseEntity
			.ok(userService.getInfoAll());
	}

	@PostMapping
	@ApiOperation(value = "회원 가입")
	public ResponseEntity<?> signup(
		@RequestBody UserSignupDto signupDto,
		HttpServletRequest request) {

		return ResponseEntity
			.ok(userService.register(signupDto));
	}

	@GetMapping("/{nickname}")
	@ApiOperation(value = "사용자 정보 조회")
	public ResponseEntity<?> getInfoUser(
		@PathVariable(name = "nickname") String nickname,
		HttpServletRequest request) {

		return ResponseEntity
			.ok(userService.getInfoByNickname(nickname));
	}

	@PutMapping("/{nickname}")
	@ApiOperation(value = "사용자 정보 수정")
	public ResponseEntity<?> updateUser(
		@PathVariable(name = "nickname") String nickname,
		@RequestBody UserUpdateDto updateDto,
		HttpServletRequest request) {

		return ResponseEntity
			.ok(userService.update(nickname, updateDto, request));
	}

	@DeleteMapping("/{nickname}")
	@ApiOperation(value = "사용자 정보 삭제")
	public ResponseEntity<?> deleteUser(
		@PathVariable(name = "nickname") String nickname,
		HttpServletRequest request) {

		return ResponseEntity
			.ok(userService.updateExpire(nickname, true, request));
	}

}
