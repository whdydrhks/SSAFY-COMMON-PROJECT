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
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.backend.domain.member.model.request.UserRegisterDto;
import com.ssafy.backend.domain.member.model.request.UserUpdateDto;
import com.ssafy.backend.domain.member.service.UserService;
import com.ssafy.backend.global.file.service.FileService;

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
	private final FileService fileService;

	@GetMapping
	@ApiOperation(value = "사용자 조회")
	public ResponseEntity<?> userShelter(
		@RequestParam(value = "keyword", required = true) String keyword,
		@RequestParam(value = "pageNo", defaultValue = "1", required = false) int page,
		@RequestParam(value = "sort", required = false) String sort,
		@RequestParam(value = "limit", required = false) String limit,
		HttpServletRequest request) {

		//		if (keyword == null || keyword.isEmpty()) {
		//			return ResponseEntity
		//				.ok(userService.getInfoAll());
		//		}

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
		@PathVariable(name = "userId") Long userId,
		HttpServletRequest request) {

		return ResponseEntity
			.ok(userService.getInfoById(userId, request));
	}

	@PutMapping("/{userId}")
	@ApiOperation(value = "사용자 정보 수정")
	public ResponseEntity<?> updateUser(
		@PathVariable(name = "userId") Long userId,
		@RequestBody UserUpdateDto updateDto,
		HttpServletRequest request) {

		return ResponseEntity
			.ok(userService.update(userId, updateDto, request));
	}

	@DeleteMapping("/{userId}")
	@ApiOperation(value = "사용자 정보 삭제")
	public ResponseEntity<?> deleteUser(
		@PathVariable(name = "userId") Long userId,
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
		@PathVariable(name = "userId") Long userId,
		@RequestParam(name = "password") String password,
		HttpServletRequest request) {

		return ResponseEntity
			.ok(userService.checkPassword(userId, password, request));
	}

	@PutMapping("/{userId}/password")
	@ApiOperation(value = "비밀번호 수정")
	public ResponseEntity<?> updatePassword(
		@PathVariable(name = "userId") Long userId,
		@RequestParam(name = "curPassword") String curPassword,
		@RequestParam(name = "newPassword") String newPassword,
		HttpServletRequest request) {

		return ResponseEntity
			.ok(userService.updatePassword(userId, curPassword, newPassword, request));
	}

	@GetMapping("/{userId}/image")
	@ApiOperation(value = "사용자 이미지 조회")
	public ResponseEntity<?> getFilesByUser(
		@PathVariable("userId") Long userId,
		HttpServletRequest request) {

		return ResponseEntity
			.ok(fileService.getFilesByUser(userId, request));
	}

	@PostMapping("/{userId}/image")
	@ApiOperation(value = "사용자 이미지 등록")
	public ResponseEntity<?> uploadFilesByUser(
		@PathVariable("userId") Long userId,
		@RequestParam(name = "file", required = false) MultipartFile image,
		HttpServletRequest request) {

		return ResponseEntity
			.ok(fileService.uploadUserFile(userId, image, request));
	}

}
