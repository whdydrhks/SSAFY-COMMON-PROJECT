package com.ssafy.backend.domain.animal.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.backend.domain.animal.entity.AnimalEntity;
import com.ssafy.backend.domain.animal.model.request.AnimalRegisterDto;
import com.ssafy.backend.domain.animal.model.response.AnimalInfoDto;
import com.ssafy.backend.domain.animal.repository.AnimalRepository;
import com.ssafy.backend.domain.shelter.entity.ShelterEntity;
import com.ssafy.backend.domain.shelter.model.request.ShelterUpdateDto;
import com.ssafy.backend.domain.shelter.model.response.ShelterInfoDto;
import com.ssafy.backend.domain.shelter.repository.ShelterRepository;
import com.ssafy.backend.global.common.model.ResponseSuccessDto;
import com.ssafy.backend.global.error.exception.ApiErrorException;
import com.ssafy.backend.global.util.ResponseUtil;
import com.ssafy.backend.global.util.enums.ApiStatus;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true) // 기본적으로 트랜잭션 안에서만 데이터 변경하게 설정(성능 향상)
@RequiredArgsConstructor // Lombok을 사용해 @Autowired 없이 의존성 주입. final 객제만 주입됨을 주의
public class AnimalService {

	private final ResponseUtil responseUtil;

	private final AnimalRepository animalRepository;
	private final ShelterRepository shelterRepository;

	/**
	 * 동물 정보를 등록하는 메소드
	 *
	 * @param
	 * @return animalId
	 */
	@Transactional
	public ResponseSuccessDto<?> register(Long shelterId, AnimalRegisterDto registerDto) {

		ShelterEntity shelter = shelterRepository.findByIdAndExpiredLike(shelterId, "F")
			.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

		AnimalEntity animal = registerDto.toEntity(shelter);

		// 중복검사
		validateDuplicate(animal);

		Long animalId = animalRepository.save(animal).getId();

		ResponseSuccessDto<Long> resp = responseUtil
			.buildSuccessResponse(animalId);

		return resp;
	}

	/**
	 * 동물 정보를 수정하는 메소드
	 *
	 * @param
	 * @return 업데이트 된 animalId
	 */
	@Transactional
	public ResponseSuccessDto<?> update(String shelterName, ShelterUpdateDto updateDto) {

		ShelterEntity findShelter = shelterRepository.findByName(shelterName)
			.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

		ShelterEntity updateShelter = ShelterEntity.builder()
			.id(findShelter.getId())
			.name(findShelter.getName())
			.url(updateDto.getUrl())
			.introduce(updateDto.getIntroduce())
			.originImage(findShelter.getOriginImage())
			.storedImage(findShelter.getStoredImage())
			.telNumber(updateDto.getTelNumber())
			.postCode(updateDto.getPostCode())
			.address(updateDto.getAddress())
			.expired(findShelter.getExpired())
			.createdDate(findShelter.getCreatedDate())
			.build();

		Long shelterId = shelterRepository.save(updateShelter).getId();

		ResponseSuccessDto<Long> resp = responseUtil
			.buildSuccessResponse(shelterId);

		return resp;
	}

	/**
	 * 동물 정보의 만료 여부를 갱신하는 메소드
	 *
	 * @param
	 * @return 만료 정보가 업데이트 된 animalId
	 */
	public ResponseSuccessDto<?> updateExpire(String shelterName, Boolean expiredFlag) {

		ShelterEntity findShelter = shelterRepository.findByName(shelterName)
			.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

		ShelterEntity updateShelter = ShelterEntity.builder()
			.id(findShelter.getId())
			.name(findShelter.getName())
			.url(findShelter.getUrl())
			.introduce(findShelter.getIntroduce())
			.originImage(findShelter.getOriginImage())
			.storedImage(findShelter.getStoredImage())
			.telNumber(findShelter.getTelNumber())
			.postCode(findShelter.getPostCode())
			.address(findShelter.getAddress())
			.expired(expiredFlag ? "T" : "F") // expiredFlag에 따라 변경 true:"T" / false:"F"
			.createdDate(findShelter.getCreatedDate())
			.build();

		Long shelterId = shelterRepository.save(updateShelter).getId();

		ResponseSuccessDto<Long> resp = responseUtil
			.buildSuccessResponse(shelterId);

		return resp;
	}

	/**
	 * 동물 정보를 삭제하는 메소드
	 *
	 * @param
	 * @return 삭제된 된 animalId
	 */
	@Transactional
	public ResponseSuccessDto<?> delete(String shelterName) {

		Long count = shelterRepository.deleteByName(shelterName);

		ResponseSuccessDto<Long> resp = responseUtil
			.buildSuccessResponse(count);

		return resp;
	}

	/**
	 * 동물 정보를 전부 가져오는 메소드
	 *
	 * @param
	 * @return List&ltanimalInfoDto&gt
	 */
	@Transactional
	public ResponseSuccessDto<?> getInfoAll() {
		List<AnimalEntity> findAnimals = animalRepository.findAllByExpiredLike("F");
		List<AnimalInfoDto> animalInfos = findAnimals
			.stream()
			.map(AnimalInfoDto::of)
			.collect(Collectors.toList());

		ResponseSuccessDto<List<ShelterEntity>> resp = responseUtil
			.buildSuccessResponse(animalInfos);

		return resp;
	}

	/**
	 * 보호소에 등록된 동물 정보를 전부 가져오는 메소드
	 *
	 * @param
	 * @return List&ltanimalInfoDto&gt
	 */
	@Transactional
	public ResponseSuccessDto<?> getInfoByShelter(Long shelterId) {
		ShelterEntity shelter = shelterRepository.findByIdAndExpiredLike(shelterId, "F")
			.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

		List<AnimalInfoDto> animalInfos = shelter.getAnimals()
			.stream()
			.map(AnimalInfoDto::of)
			.collect(Collectors.toList());

		ResponseSuccessDto<List<ShelterEntity>> resp = responseUtil
			.buildSuccessResponse(animalInfos);

		return resp;
	}

	/**
	 * name으로 사용자 정보를 가져오는 메소드
	 *
	 * @param
	 * @return AnimalInfoDto
	 */
	@Transactional
	public ResponseSuccessDto<?> getInfoById(Long shelterId, Long animalId) {
		AnimalEntity findAnimal = animalRepository.findByIdAndExpiredLike(animalId, "F")
			.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

		if (!findAnimal.getShelter().getId().equals(shelterId)) {
			throw new ApiErrorException(ApiStatus.BAD_REQUEST);
		}

		AnimalInfoDto infoDto = AnimalInfoDto.of(findAnimal);

		ResponseSuccessDto<AnimalInfoDto> resp = responseUtil
			.buildSuccessResponse(infoDto);

		return resp;
	}

	/**
	 * name으로 사용자 정보를 검색하는 메소드
	 *
	 * @param
	 * @return List&ltShelterInfoDto&gt
	 */
	@Transactional
	public ResponseSuccessDto<?> searchInfoByName(String shelterName) {
		List<ShelterEntity> findShelters = shelterRepository
			.findByNameContainingIgnoreCaseAndExpiredLike(shelterName, "F");
		List<ShelterInfoDto> shelterInfos = findShelters
			.stream()
			.map(ShelterInfoDto::of)
			.collect(Collectors.toList());

		ResponseSuccessDto<List<ShelterEntity>> resp = responseUtil
			.buildSuccessResponse(shelterInfos);

		return resp;
	}

	/**
	 * 동물의 등록 정보가 이미 있는지 확인하는 메소드
	 *
	 * @param
	 * @throws IllegalStateException
	 */
	private void validateDuplicate(AnimalEntity animal) {
		animalRepository.findByManageCodeAndExpiredLike(animal.getManageCode(), "F")
			.ifPresent(e -> {
				throw new ApiErrorException(ApiStatus.DUPLICATION);
			});
	}
}
