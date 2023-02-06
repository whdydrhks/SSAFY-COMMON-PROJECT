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

	@GetMapping("/search")
	@ApiOperation(value = "보호소 검색")
	public ResponseEntity<?> searchShelter(
		@RequestParam(value = "keyword", defaultValue = "", required = false) String keyword,
		@RequestParam(value = "pageNo", defaultValue = "1", required = false) int page,
		HttpServletRequest request) {

		return ResponseEntity
			.ok(shelterService.searchInfoByName(keyword));
	}

	@GetMapping
	@ApiOperation(value = "보호소 전체 조회")
	public ResponseEntity<?> getShelterInfoAll(
		@RequestParam(value = "pageNo", defaultValue = "1", required = false) int page,
		HttpServletRequest request) {

		return ResponseEntity
			.ok(shelterService.getInfoAll());
	}

	@PostMapping
	@ApiOperation(value = "보호소 등록")
	public ResponseEntity<?> registerShelter(
		@RequestBody ShelterRegisterDto registerDto,
		HttpServletRequest request) {

		return ResponseEntity
			.ok(shelterService.register(registerDto));
	}

	@GetMapping("/{name}")
	@ApiOperation(value = "보호소 정보 조회")
	public ResponseEntity<?> getShelterInfo(
		@PathVariable(name = "name") String name,
		HttpServletRequest request) {

		return ResponseEntity
			.ok(shelterService.getInfoByName(name));
	}

	@PutMapping("/{name}")
	@ApiOperation(value = "보호소 정보 수정")
	public ResponseEntity<?> updateShelter(
		@PathVariable(name = "name") String name,
		@RequestBody ShelterUpdateDto updateDto,
		HttpServletRequest request) {

		return ResponseEntity
			.ok(shelterService.update(name, updateDto));
	}

	@DeleteMapping("/{name}")
	@ApiOperation(value = "보호소 정보 삭제")
	public ResponseEntity<?> deleteShelter(
		@PathVariable(name = "name") String name,
		HttpServletRequest request) {

		return ResponseEntity
			.ok(shelterService.delete(name));
	}
}
