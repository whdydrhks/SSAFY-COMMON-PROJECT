package com.ssafy.backend.global.file.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.backend.global.file.service.FileService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@Api(tags = "FileController v1")
@RequestMapping("/v1/file")
public class FileControllerV1 {

	private final FileService fileService;

	@PostMapping("/upload/{category}/{id}")
	@ApiOperation(value = "파일 업로드", notes = "카테고리(user, animal, etc...)에 맞는 id와 링크된 파일을 업로드한다.")
	public ResponseEntity<?> uploadFile(
		@ApiParam(value = "타겟 카테고리") @PathVariable("category") String category,
		@ApiParam(value = "타겟 식별 번호") @PathVariable("id") Long id,
		@RequestParam(name = "file") MultipartFile file,
		HttpServletRequest request) {

		log.info("uploadFile - " + category);

		return ResponseEntity
			.ok(fileService.uploadFile(category, id, file, request));
	}

	@PostMapping("/uploadMultiple/{category}/{id}")
	@ApiOperation(value = "다중 파일 업로드", notes = "카테고리(user, animal, etc...)에 맞는 id와 링크된 파일들을 업로드한다.")
	public ResponseEntity<?> uploadMultipleFiles(
		@ApiParam(value = "타겟 카테고리") @PathVariable("category") String category,
		@ApiParam(value = "타겟 식별 번호") @PathVariable("id") Long id,
		@RequestParam("files") List<MultipartFile> files,
		HttpServletRequest request) {

		return ResponseEntity
			.ok(fileService.uploadMultipleFiles(category, id, files, request));
	}

	@GetMapping("/download/{category}/{file:.+}")
	@ApiOperation(value = "파일 다운로드", notes = "알맞은 카테고리(user, animal, etc...)에 분류된 파일을 다운로드한다.")
	public ResponseEntity<?> downloadFile(
		@ApiParam(value = "타겟 카테고리") @PathVariable("category") String category,
		@ApiParam(value = "파일 이름") @PathVariable("file") String file,
		HttpServletRequest request) {

		return fileService.loadFile(category, file, request);
	}

	@DeleteMapping("/download/{category}/{file:.+}")
	@ApiOperation(value = "파일 삭제", notes = "알맞은 카테고리(user, animal, etc...)에 분류된 파일을 삭제한다.")
	public ResponseEntity<?> deleteFile(
		@ApiParam(value = "타겟 카테고리") @PathVariable("category") String category,
		@ApiParam(value = "파일 이름") @PathVariable("file") String file,
		HttpServletRequest request) {

		log.info("deleteFile - " + category);

		return ResponseEntity
			.ok(fileService.updateExpire(category, file, true, request));
	}

}
