package com.ssafy.backend.domain.animal.controller;

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

import com.ssafy.backend.domain.animal.model.request.AnimalRegisterDto;
import com.ssafy.backend.domain.animal.service.AnimalService;
import com.ssafy.backend.domain.shelter.model.request.ShelterUpdateDto;
import com.ssafy.backend.domain.shelter.service.ShelterService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@Api(tags = "AniamlController v1")
@RequestMapping("/v1/shelter/{shelterId}/animal")
public class AnimalControllerV1 {

	private final AnimalService animalService;
	private final ShelterService shelterService;

	@GetMapping("/search")
	@ApiOperation(value = "동물 검색")
	public ResponseEntity<?> searchShelter(
		@PathVariable(name = "shelterId") Long shelterId,
		@RequestParam(value = "keyword", defaultValue = "", required = false) String keyword,
		@RequestParam(value = "pageNo", defaultValue = "1", required = false) int page,
		HttpServletRequest request) {

		return null;
	}

	@GetMapping
	@ApiOperation(value = "보호소내 동물 전체 조회")
	public ResponseEntity<?> getAnimalInfoByShelter(
		@PathVariable(name = "shelterId") Long shelterId,
		@RequestParam(value = "pageNo", defaultValue = "1", required = false) int page,
		HttpServletRequest request) {

		return ResponseEntity
			.ok(animalService.getInfoByShelter(shelterId));
	}

	@PostMapping
	@ApiOperation(value = "동물 등록")
	public ResponseEntity<?> registerShelter(
		@PathVariable(name = "shelterId") Long shelterId,
		@RequestBody AnimalRegisterDto registerDto,
		HttpServletRequest request) {

		return ResponseEntity
			.ok(animalService.register(shelterId, registerDto));
	}

	@GetMapping("/{animalId}")
	@ApiOperation(value = "동물 정보 조회")
	public ResponseEntity<?> getShelterInfo(
		@PathVariable(name = "shelterId") Long shelterId,
		@PathVariable(name = "animalId") Long animalId,
		HttpServletRequest request) {

		return ResponseEntity
			.ok(animalService.getInfoById(shelterId, animalId));
	}

	@PutMapping("/{animalId}")
	@ApiOperation(value = "동물 정보 수정")
	public ResponseEntity<?> updateShelter(
		@PathVariable(name = "shelterId") Long shelterId,
		@PathVariable(name = "name") String name,
		@RequestBody ShelterUpdateDto updateDto,
		HttpServletRequest request) {

		return null;
	}

	@DeleteMapping("/{animalId}")
	@ApiOperation(value = "동물 정보 삭제")
	public ResponseEntity<?> deleteShelter(
		@PathVariable(name = "shelterId") Long shelterId,
		@PathVariable(name = "name") String name,
		HttpServletRequest request) {

		return null;
	}
}
