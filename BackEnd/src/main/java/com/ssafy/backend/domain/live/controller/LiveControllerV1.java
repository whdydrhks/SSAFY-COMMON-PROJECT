package com.ssafy.backend.domain.live.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.backend.domain.live.model.request.LiveDeleteDto;
import com.ssafy.backend.domain.live.model.request.LiveRegistDto;
import com.ssafy.backend.domain.live.service.LiveService;
import com.ssafy.backend.global.file.service.FileService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@Api(tags = "LiveController v1")
@RequestMapping("/v1/live")
public class LiveControllerV1 {

	private final LiveService liveService;
	private final FileService fileService;

	@PostMapping
	@ApiOperation(value = "라이브방 등록")
	public ResponseEntity<?> registLive(
		@RequestBody LiveRegistDto registDto,
		HttpServletRequest request) {

		return ResponseEntity.ok(liveService.registLive(registDto, request));
	}

	@GetMapping("/all")
	@ApiOperation(value = "라이브 전체 조회")
	public ResponseEntity<?> getLiveList() {

		return ResponseEntity.ok(liveService.getLiveAll());
	}

	@GetMapping("/{liveId}")
	@ApiOperation(value = "라이브 하나 조회")
	public ResponseEntity<?> getLive(@PathVariable Long liveId) {

		return ResponseEntity.ok(liveService.getLive(liveId));
	}

	@DeleteMapping
	@ApiOperation(value = "라이브 방 삭제")
	public ResponseEntity<?> deleteLive(
		@RequestBody LiveDeleteDto deleteDto,
		HttpServletRequest request) {

		return ResponseEntity.ok(liveService.deleteLive(deleteDto, request));
	}

	@GetMapping("/{liveId}/image")
	@ApiOperation(value = "라이브 이미지 조회")
	public ResponseEntity<?> getFilesByUser(
		@ApiParam(value = "라이브 식별 번호") @PathVariable("liveId") Long liveId,
		HttpServletRequest request) {

		return ResponseEntity
			.ok(fileService.getFilesByLive(liveId, request));
	}

	@PostMapping("/{liveId}/image")
	@ApiOperation(value = "라이브 이미지 등록")
	public ResponseEntity<?> uploadFilesByUser(
		@ApiParam(value = "라이브 식별 번호") @PathVariable("liveId") Long liveId,
		@RequestParam("file") MultipartFile image,
		HttpServletRequest request) {

		return ResponseEntity
			.ok(fileService.uploadFile("live", liveId, image, request));
	}
}
