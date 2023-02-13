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
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.backend.domain.animal.model.request.AnimalRegisterDto;
import com.ssafy.backend.domain.animal.model.request.AnimalUpdateDto;
import com.ssafy.backend.domain.animal.service.AnimalService;
import com.ssafy.backend.domain.shelter.service.ShelterService;
import com.ssafy.backend.global.file.service.FileService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@Api(tags = "AniamlController v1")
@RequestMapping("/v1/shelter/{shelterId}")
public class AnimalControllerV1 {

	private final AnimalService animalService;
	private final ShelterService shelterService;
	private final FileService fileService;

	@GetMapping("/animal")
	@ApiOperation(value = "보호소내 동물 전체 조회")
	public ResponseEntity<?> getAnimalInfoByShelter(
		@PathVariable(name = "shelterId") Long shelterId,
		@RequestParam(value = "pageNo", defaultValue = "1", required = false) int page,
		HttpServletRequest request) {

		return ResponseEntity
			.ok(animalService.getInfoByShelter(shelterId));
	}

	@PostMapping("/animal/{animalId}")
	@ApiOperation(value = "동물 등록")
	public ResponseEntity<?> registerShelter(
		@PathVariable(name = "shelterId") Long shelterId,
		@RequestBody AnimalRegisterDto registerDto,
		HttpServletRequest request) {

		return ResponseEntity
			.ok(animalService.register(shelterId, registerDto));
	}

	@GetMapping("/animal/{animalId}")
	@ApiOperation(value = "동물 정보 조회")
	public ResponseEntity<?> getShelterInfo(
		@PathVariable(name = "shelterId") Long shelterId,
		@PathVariable(name = "animalId") Long animalId,
		HttpServletRequest request) {

		return ResponseEntity
			.ok(animalService.getInfoById(shelterId, animalId));
	}

	@PutMapping("/animal/{animalId}")
	@ApiOperation(value = "동물 정보 수정")
	public ResponseEntity<?> updateShelter(
		@PathVariable(name = "shelterId") Long shelterId,
		@PathVariable(name = "animalId") Long animalId,
		@RequestBody AnimalUpdateDto updateDto,
		HttpServletRequest request) {

		return ResponseEntity
			.ok(animalService.update(shelterId, animalId, updateDto));
	}

	@DeleteMapping("/animal/{animalId}")
	@ApiOperation(value = "동물 정보 삭제")
	public ResponseEntity<?> deleteShelter(
		@PathVariable(name = "shelterId") Long shelterId,
		@PathVariable(name = "animalId") Long animalId,
		HttpServletRequest request) {

		return ResponseEntity
			.ok(animalService.updateExpire(shelterId, animalId, true));
	}

	@GetMapping("/animal/{animalId}/image")
	@ApiOperation(value = "동물 이미지 조회")
	public ResponseEntity<?> getFilesByUser(
		@PathVariable("shelterId") Long shelterId,
		@PathVariable("animalId") Long animalId,
		HttpServletRequest request) {

		return ResponseEntity
			.ok(fileService.getFilesByAnimal(animalId, request));
	}

	@PostMapping("/animal/{animalId}/image")
	@ApiOperation(value = "동물 이미지 등록")
	public ResponseEntity<?> uploadFilesByUser(
		@PathVariable("shelterId") Long shelterId,
		@PathVariable("animalId") Long animalId,
		@RequestParam(name = "file", required = false) MultipartFile[] images,
		HttpServletRequest request) {

		return ResponseEntity
			.ok(fileService.uploadMultipleFiles("animal", animalId, images, request));
	}

	@GetMapping("/search/manage-code")
	@ApiOperation(value = "관리 번호로 동물 검색")
	public ResponseEntity<?> searchByManageCode(
		@PathVariable(name = "shelterId") Long shelterId,
		@RequestParam(value = "keyword", required = true) String keyword,
		@RequestParam(value = "pageNo", defaultValue = "1", required = false) int page,
		@RequestParam(value = "sort", required = false) String sort,
		@RequestParam(value = "limit", required = false) String limit,
		HttpServletRequest request) {

		return ResponseEntity
			.ok(animalService.searchInfoByManageCode(shelterId, keyword));
	}

	@GetMapping("/search/name")
	@ApiOperation(value = "이름으로 동물 검색")
	public ResponseEntity<?> searchByName(
		@PathVariable(name = "shelterId") Long shelterId,
		@RequestParam(value = "keyword", required = true) String keyword,
		@RequestParam(value = "pageNo", defaultValue = "1", required = false) int page,
		@RequestParam(value = "sort", required = false) String sort,
		@RequestParam(value = "limit", required = false) String limit,
		HttpServletRequest request) {

		return ResponseEntity
			.ok(animalService.searchInfoByName(shelterId, keyword));
	}

	@GetMapping("/search/breed")
	@ApiOperation(value = "품종으로 동물 검색")
	public ResponseEntity<?> searchByBreed(
		@PathVariable(name = "shelterId") Long shelterId,
		@RequestParam(value = "keyword", required = true) String keyword,
		@RequestParam(value = "pageNo", defaultValue = "1", required = false) int page,
		@RequestParam(value = "sort", required = false) String sort,
		@RequestParam(value = "limit", required = false) String limit,
		HttpServletRequest request) {

		return ResponseEntity
			.ok(animalService.searchInfoByBreed(shelterId, keyword));
	}
}
