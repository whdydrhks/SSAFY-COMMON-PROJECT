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

import com.ssafy.backend.domain.member.model.request.UserMatchPasswordDto;
import com.ssafy.backend.domain.member.model.request.UserRegisterDto;
import com.ssafy.backend.domain.member.model.request.UserUpdateDto;
import com.ssafy.backend.domain.member.model.request.UserUpdatePasswordDto;
import com.ssafy.backend.domain.member.service.UserService;
import com.ssafy.backend.global.file.service.FileService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@Api(tags = "UserController v1")
@RequestMapping("/v1/user")
public class UserControllerV1 {

	private final UserService userService;
	private final FileService fileService;

	@GetMapping
	@ApiOperation(value = "사용자 조회. 키워드가 없으면 모든 사용자 전체 조회")
	public ResponseEntity<?> userShelter(
		@ApiParam(value = "검색어") @RequestParam(value = "keyword", required = false) String keyword,
		HttpServletRequest request) {

		if (keyword == null || keyword.isEmpty()) {
			return ResponseEntity
				.ok(userService.getInfoAll());
		}

		return ResponseEntity
			.ok(userService.searchInfoByNickname(keyword));
	}

	@PostMapping
	@ApiOperation(value = "회원 가입")
	public ResponseEntity<?> signup(
		@RequestBody UserRegisterDto signupDto,
		HttpServletRequest request) {

		return ResponseEntity
			.ok(userService.register(signupDto));
	}

	@GetMapping("/{userId}")
	@ApiOperation(value = "사용자 정보 조회")
	public ResponseEntity<?> getInfoUser(
		@ApiParam(value = "사용자 식별 번호") @PathVariable(name = "userId") Long userId,
		HttpServletRequest request) {

		return ResponseEntity
			.ok(userService.getInfoById(userId, request));
	}

	@PutMapping("/{userId}")
	@ApiOperation(value = "사용자 정보 수정")
	public ResponseEntity<?> updateUser(
		@ApiParam(value = "사용자 식별 번호") @PathVariable(name = "userId") Long userId,
		@RequestBody UserUpdateDto updateDto,
		HttpServletRequest request) {

		return ResponseEntity
			.ok(userService.update(userId, updateDto, request));
	}

	@DeleteMapping("/{userId}")
	@ApiOperation(value = "사용자 정보 삭제")
	public ResponseEntity<?> deleteUser(
		@ApiParam(value = "사용자 식별 번호") @PathVariable(name = "userId") Long userId,
		HttpServletRequest request) {

		return ResponseEntity
			.ok(userService.updateExpire(userId, true, request));
	}

	//	@PostMapping
	//	@ApiOperation(value = "사용자 중복 아이디 조회")
	//	public ResponseEntity<?> userShelter(
	//		@RequestParam(value = "keyword", required = true) String keyword,
	//		HttpServletRequest request) {
	//
	//		return ResponseEntity
	//			.ok(userService.checkUser(keyword));
	//	}

	@PostMapping("/{userId}/password")
	@ApiOperation(value = "비밀번호 검사")
	public ResponseEntity<?> checkPassword(
		@ApiParam(value = "사용자 식별 번호") @PathVariable(name = "userId") Long userId,
		@RequestBody UserMatchPasswordDto matchPasswordDto,
		HttpServletRequest request) {

		return ResponseEntity
			.ok(userService.checkPassword(userId, matchPasswordDto, request));
	}

	@PutMapping("/{userId}/password")
	@ApiOperation(value = "비밀번호 수정")
	public ResponseEntity<?> updatePassword(
		@ApiParam(value = "사용자 식별 번호") @PathVariable(name = "userId") Long userId,
		@RequestBody UserUpdatePasswordDto updatePasswordDto,
		HttpServletRequest request) {

		return ResponseEntity
			.ok(userService.updatePassword(userId, updatePasswordDto, request));
	}

	//	// 서비스 기능 변경으로 인해 사용하지 않음
	//	@GetMapping("/{userId}/image")
	//	@ApiOperation(value = "사용자 이미지 조회")
	//	public ResponseEntity<?> getFilesByUser(
	//		@ApiParam(value = "사용자 식별 번호") @PathVariable("userId") Long userId,
	//		HttpServletRequest request) {
	//
	//		return ResponseEntity
	//			.ok(fileService.getFilesByUser(userId, request));
	//	}
	//
	//	@PostMapping("/{userId}/image")
	//	@ApiOperation(value = "사용자 이미지 등록")
	//	public ResponseEntity<?> uploadFilesByUser(
	//		@ApiParam(value = "사용자 식별 번호") @PathVariable("userId") Long userId,
	//		@RequestParam("file") MultipartFile image,
	//		HttpServletRequest request) {
	//
	//		return ResponseEntity
	//			.ok(fileService.uploadFile("user", userId, image, request));
	//	}

}
