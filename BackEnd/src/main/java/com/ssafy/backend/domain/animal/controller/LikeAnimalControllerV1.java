package com.ssafy.backend.domain.animal.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.backend.domain.animal.model.request.LikeAnimalRegistDto;
import com.ssafy.backend.domain.animal.service.LikeAnimalService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@Api(tags = "AniamlController v1")
@RequestMapping("/v1")
public class LikeAnimalControllerV1 {

	private final LikeAnimalService likeAnimalService;

	@GetMapping("/user/{userId}/like/animal")
	@ApiOperation(value = "관심동물 조회")
	public ResponseEntity<?> getLikeAnimal(
		@PathVariable(value = "userId") Long userId,
		HttpServletRequest request) {

		return ResponseEntity
			.ok(likeAnimalService.getLikeAnimal(userId, request));
	}

	@PostMapping("/user/{userId}/like/animal/{animalId}")
	@ApiOperation(value = "관심동물 등록(보호소 -> 유저)")
	public ResponseEntity<?> registerLikeAnimal(
		@PathVariable(value = "userId") Long userId,
		@PathVariable(value = "animalId") Long animalId,
		//		@RequestParam(value = "expiredDate") String expiredDate,
		@RequestBody LikeAnimalRegistDto registDto,
		HttpServletRequest request) {

		return ResponseEntity
			.ok(likeAnimalService.registerLikeAnimal(userId, animalId, registDto.getExpiredDate(), request));
	}

	//	@DeleteMapping("/user/{userId}/like/animal/{animalId}")
	//	@ApiOperation(value = "관심동물 제거(유저 -> 보호소)")
	//	public ResponseEntity<?> deleteUserLikeAnimal(
	//		@PathVariable(name = "userId") Long userId,
	//		@PathVariable(name = "animalId") Long animalId,
	//		HttpServletRequest request) {
	//
	//		return ResponseEntity
	//			.ok(likeAnimalService.deleteUserLikeAnimal(userId, animalId, request));
	//	}

	@DeleteMapping("/shelter/{shelterId}/like/animal/{animalId}")
	@ApiOperation(value = "관심동물 모두 제거(보호소 -> 유저)")
	public ResponseEntity<?> deleteShelterLikeAnimal(
		@PathVariable(value = "shelterId") Long shelterId,
		@PathVariable(value = "animalId") Long animalId,
		HttpServletRequest request) {

		return ResponseEntity
			.ok(likeAnimalService.deleteShelterLikeAnimal(shelterId, animalId, request));
	}
}
