package com.ssafy.backend.domain.shelter.controller;

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

import com.ssafy.backend.domain.shelter.model.request.ShelterRegisterDto;
import com.ssafy.backend.domain.shelter.model.request.ShelterUpdateDto;
import com.ssafy.backend.domain.shelter.service.ShelterService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@Api(tags = "ShelterController v1")
@RequestMapping("/v1/shelter")
public class ShelterControllerV1 {

	private final ShelterService shelterService;

	@GetMapping
	@ApiOperation(value = "보호소 조회")
	public ResponseEntity<?> searchShelter(
		@RequestParam(value = "keyword", required = true) String keyword,
		@RequestParam(value = "pageNo", defaultValue = "1", required = false) int page,
		@RequestParam(value = "sort", required = false) String sort,
		@RequestParam(value = "limit", required = false) String limit,
		HttpServletRequest request) {

		//		if (keyword == null || keyword.isEmpty()) {
		//			return ResponseEntity
		//				.ok(shelterService.getInfoAll());
		//		}

		return ResponseEntity
			.ok(shelterService.searchInfoByName(keyword));
	}

	@PostMapping
	@ApiOperation(value = "보호소 등록")
	public ResponseEntity<?> registerShelter(
		@RequestBody ShelterRegisterDto registerDto,
		HttpServletRequest request) {

		return ResponseEntity
			.ok(shelterService.register(registerDto));
	}

	@GetMapping("/{shelterId}")
	@ApiOperation(value = "보호소 정보 조회")
	public ResponseEntity<?> getShelterInfo(
		@PathVariable(name = "shelterId") Long shelterId,
		HttpServletRequest request) {

		return ResponseEntity
			.ok(shelterService.getInfoById(shelterId));
	}

	@PutMapping("/{shelterId}")
	@ApiOperation(value = "보호소 정보 수정")
	public ResponseEntity<?> updateShelter(
		@PathVariable(name = "shelterId") Long shelterId,
		@RequestBody ShelterUpdateDto updateDto,
		HttpServletRequest request) {

		return ResponseEntity
			.ok(shelterService.update(shelterId, updateDto));
	}

	@DeleteMapping("/{shelterId}")
	@ApiOperation(value = "보호소 정보 삭제")
	public ResponseEntity<?> deleteShelter(
		@PathVariable(name = "shelterId") Long shelterId,
		HttpServletRequest request) {

		return ResponseEntity
			.ok(shelterService.updateExpire(shelterId, true));
	}
}
