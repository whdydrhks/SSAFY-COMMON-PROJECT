package com.ssafy.backend.domain.animal.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.backend.domain.animal.entity.AnimalEntity;
import com.ssafy.backend.domain.animal.entity.LikeAnimalEntity;
import com.ssafy.backend.domain.animal.model.response.LikeAnimalInfoDto;
import com.ssafy.backend.domain.animal.repository.AnimalRepository;
import com.ssafy.backend.domain.animal.repository.LikeAnimalRepository;
import com.ssafy.backend.domain.member.entity.UserEntity;
import com.ssafy.backend.domain.member.repository.UserRepository;
import com.ssafy.backend.domain.shelter.entity.ShelterEntity;
import com.ssafy.backend.domain.shelter.repository.ShelterRepository;
import com.ssafy.backend.global.common.model.response.ResponseSuccessDto;
import com.ssafy.backend.global.error.exception.ApiErrorException;
import com.ssafy.backend.global.util.JwtUtil;
import com.ssafy.backend.global.util.ResponseUtil;
import com.ssafy.backend.global.util.enums.ApiStatus;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class LikeAnimalService {

	private final ResponseUtil responseUtil;
	private final JwtUtil jwtUtil;

	private final ShelterRepository shelterRepository;
	private final UserRepository userRepository;
	private final AnimalRepository animalRepository;
	private final LikeAnimalRepository likeAnimalRepository;

	@Transactional
	public ResponseSuccessDto<?> registerLikeAnimal(
		Long userId,
		Long animalId,
		String expiredDateString,
		HttpServletRequest request) {

		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		LocalDateTime expiredDate = LocalDateTime.parse(expiredDateString, formatter);

		String token = Optional.ofNullable(request.getHeader(HttpHeaders.AUTHORIZATION))
			.orElseThrow(() -> new ApiErrorException(ApiStatus.UNAUTHORIZED));

		String tokenId = jwtUtil.getUserId(token);

		UserEntity loginUser = userRepository.findByIdAndExpiredLike(Long.valueOf(tokenId), "F")
			.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

		// 보호소 직원인지 아닌지 판별하는 메소드
		ShelterEntity findShelter = shelterRepository.findByUser(loginUser)
			.orElseThrow(() -> new ApiErrorException(ApiStatus.UNAUTHORIZED));

		AnimalEntity findAnimal = animalRepository.findByIdAndExpiredLike(animalId, "F")
			.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));


		// 보호소가 보호하고 있는 동물만 등록 가능
		if (findAnimal.getShelter().getId() != findShelter.getId()) {
			throw new ApiErrorException(ApiStatus.UNAUTHORIZED);
		}

		UserEntity findUser = userRepository.findByIdAndExpiredLike(userId, "F")
			.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

		// 이미 등록된 관심동물은 등록 하지않는다.
		if(likeAnimalRepository.findByUserAndAnimal(findUser, findAnimal) != null){
			throw new ApiErrorException(ApiStatus.DUPLICATION);
		}

		LikeAnimalEntity likeAnimal = LikeAnimalEntity.builder()
			.user(findUser)
			.animal(findAnimal)
			.expiredDate(expiredDate)
			.build();

		Long likeAnimalId = likeAnimalRepository.save(likeAnimal).getId();

		return responseUtil.buildSuccessResponse(likeAnimalId);
	}

	@Transactional
	public ResponseSuccessDto<?> deleteShelterLikeAnimal(
		Long shelterId,
		Long animalId,
		HttpServletRequest request) {

		String token = Optional.ofNullable(request.getHeader(HttpHeaders.AUTHORIZATION))
			.orElseThrow(() -> new ApiErrorException(ApiStatus.UNAUTHORIZED));

		String tokenId = jwtUtil.getUserId(token);

		UserEntity loginUser = userRepository.findByIdAndExpiredLike(Long.valueOf(tokenId), "F")
			.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

		// 보호소 직원인지 아닌지 판별하는 메소드
		ShelterEntity findShelter = shelterRepository.findByUser(loginUser)
			.orElseThrow(() -> new ApiErrorException(ApiStatus.UNAUTHORIZED));

		AnimalEntity findAnimal = animalRepository.findByIdAndExpiredLike(animalId, "F")
			.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

		// 보호소가 보호하고 있는 동물만 등록 가능
		if (findAnimal.getShelter().getId() != findShelter.getId()
			|| findShelter.getId() != shelterId) {
			throw new ApiErrorException(ApiStatus.UNAUTHORIZED);
		}

		List<LikeAnimalEntity> likeAnimalList = likeAnimalRepository.findByAnimal(findAnimal);

		likeAnimalRepository.deleteAll(likeAnimalList);

		return responseUtil.buildSuccessResponse(null);
	}

	@Transactional
	public ResponseSuccessDto<?> getLikeAnimal(
		Long userId,
		HttpServletRequest request) {

		UserEntity findUser = userRepository.findByIdAndExpiredLike(userId, "F")
			.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

		Set<LikeAnimalEntity> likeAnimals = findUser.getLikeAnimals();

		List<LikeAnimalInfoDto> animalInfos = likeAnimals
			.stream()
			.filter(likeAnimal -> likeAnimal.getAnimal().getExpired().equals("F"))
			.map(likeAnimal -> LikeAnimalInfoDto.of(likeAnimal))
			.sorted(Comparator.comparing(LikeAnimalInfoDto::getExpiredDate))
			.collect(Collectors.toList());

		return responseUtil.buildSuccessResponse(animalInfos);
	}

}
