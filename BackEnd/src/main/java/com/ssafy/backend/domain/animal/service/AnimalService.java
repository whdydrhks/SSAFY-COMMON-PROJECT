package com.ssafy.backend.domain.animal.service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.backend.domain.animal.entity.AnimalEntity;
import com.ssafy.backend.domain.animal.model.request.AnimalRegisterDto;
import com.ssafy.backend.domain.animal.model.request.AnimalUpdateDto;
import com.ssafy.backend.domain.animal.model.response.AnimalInfoDto;
import com.ssafy.backend.domain.animal.repository.AnimalRepository;
import com.ssafy.backend.domain.shelter.entity.ShelterEntity;
import com.ssafy.backend.domain.shelter.repository.ShelterRepository;
import com.ssafy.backend.global.common.model.response.ResponseSuccessDto;
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

		return responseUtil.buildSuccessResponse(animalId);
	}

	/**
	 * 동물 정보를 수정하는 메소드
	 *
	 * @param
	 * @return 업데이트 된 animalId
	 */
	@Transactional
	public ResponseSuccessDto<?> update(
		Long shelterId,
		Long animalId,
		AnimalUpdateDto updateDto) {

		AnimalEntity findAnimal = validateAnimal(shelterId, animalId);

		AnimalEntity updateAnimal = updateDto.updateEntity(findAnimal);

		Long updatedAnimalId = animalRepository.save(updateAnimal).getId();

		return responseUtil.buildSuccessResponse(updatedAnimalId);
	}

	/**
	 * 동물 정보의 만료 여부를 갱신하는 메소드
	 *
	 * @param
	 * @return 만료 정보가 업데이트 된 animalId
	 */
	@Transactional
	public ResponseSuccessDto<?> updateExpire(
		Long shelterId,
		Long animalId,
		Boolean expiredFlag) {

		AnimalEntity findAnimal = validateAnimal(shelterId, animalId);

		findAnimal.setExpired(expiredFlag ? "T" : "F");

		Long updatedAnimalId = animalRepository.save(findAnimal).getId();

		return responseUtil.buildSuccessResponse(updatedAnimalId);
	}

	/**
	 * 동물 정보를 삭제하는 메소드
	 *
	 * @param
	 * @return 삭제된 된 animalId
	 */
	@Transactional
	public ResponseSuccessDto<?> delete(
		Long shelterId,
		Long animalId) {

		validateAnimal(shelterId, animalId);

		shelterRepository.deleteById(animalId);

		return responseUtil.buildSuccessResponse(null);
	}

	/**
	 * 동물 정보를 전부 가져오는 메소드
	 *
	 * @param
	 * @return ResponseSuccessDto&ltList&ltanimalInfoDto&gt&gt
	 */
	@Transactional
	public ResponseSuccessDto<?> getInfoAll() {

		List<AnimalEntity> findAnimals = animalRepository.findAllByExpiredLike("F");

		List<AnimalInfoDto> animalInfos = findAnimals
			.stream()
			.map(AnimalInfoDto::of)
			.collect(Collectors.toList());

		return responseUtil.buildSuccessResponse(animalInfos);
	}

	/**
	 * 보호소에 등록된 동물 정보를 전부 가져오는 메소드
	 *
	 * @param
	 * @return ResponseSuccessDto&ltList&ltanimalInfoDto&gt&gt
	 */
	@Transactional
	public ResponseSuccessDto<?> getInfoByShelter(Long shelterId) {

		ShelterEntity findShelter = shelterRepository.findByIdAndExpiredLike(shelterId, "F")
			.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

		List<AnimalInfoDto> animalInfos = findShelter.getAnimals()
			.stream()
			.filter(animal -> animal.getExpired().equals("F"))
			.map(AnimalInfoDto::of)
			.sorted(Comparator.comparing(AnimalInfoDto::getAnimalId))
			.collect(Collectors.toList());

		return responseUtil.buildSuccessResponse(animalInfos);
	}

	/**
	 * id로 사용자 정보를 가져오는 메소드
	 *
	 * @param
	 * @return AnimalInfoDto
	 */
	@Transactional
	public ResponseSuccessDto<?> getInfoById(Long shelterId, Long animalId) {

		AnimalEntity findAnimal = validateAnimal(shelterId, animalId);

		AnimalInfoDto infoDto = AnimalInfoDto.of(findAnimal);

		return responseUtil.buildSuccessResponse(infoDto);
	}

	/**
	 * 관리번호로 동물 정보를 검색하는 메소드
	 *
	 * @param
	 * @return ResponseSuccessDto&ltList&ltAnimalInfoDto&gt&gt
	 */
	@Transactional
	public ResponseSuccessDto<?> searchInfoByManageCode(Long shelterId, String manageCode) {

		if (manageCode.isEmpty() || manageCode.length() <= 0) {
			throw new ApiErrorException(ApiStatus.KEYWORD_EMPTY);
		}

		ShelterEntity findShelter = shelterRepository.findByIdAndExpiredLike(shelterId, "F")
			.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

		List<AnimalEntity> findAnimals = animalRepository
			.findByShelterAndManageCodeContainingIgnoreCaseAndExpiredLike(findShelter, manageCode, "F");

		List<AnimalInfoDto> animalInfos = findAnimals
			.stream()
			.map(AnimalInfoDto::of)
			.collect(Collectors.toList());

		return responseUtil.buildSuccessResponse(animalInfos);
	}

	/**
	 * 이름으로 동물 정보를 검색하는 메소드
	 *
	 * @param
	 * @return ResponseSuccessDto&ltList&ltAnimalInfoDto&gt&gt
	 */
	@Transactional
	public ResponseSuccessDto<?> searchInfoByName(Long shelterId, String name) {

		if (name.isEmpty() || name.length() <= 0) {
			throw new ApiErrorException(ApiStatus.KEYWORD_EMPTY);
		}

		ShelterEntity findShelter = shelterRepository.findByIdAndExpiredLike(shelterId, "F")
			.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

		List<AnimalEntity> findAnimals = animalRepository
			.findByShelterAndNameContainingIgnoreCaseAndExpiredLike(findShelter, name, "F");

		List<AnimalInfoDto> animalInfos = findAnimals
			.stream()
			.map(AnimalInfoDto::of)
			.collect(Collectors.toList());

		return responseUtil.buildSuccessResponse(animalInfos);
	}

	/**
	 * 품종으로 동물 정보를 검색하는 메소드
	 *
	 * @param
	 * @return ResponseSuccessDto&ltList&ltAnimalInfoDto&gt&gt
	 */
	@Transactional
	public ResponseSuccessDto<?> searchInfoByBreed(Long shelterId, String breed) {

		if (breed.isEmpty() || breed.length() <= 0) {
			throw new ApiErrorException(ApiStatus.KEYWORD_EMPTY);
		}

		ShelterEntity findShelter = shelterRepository.findByIdAndExpiredLike(shelterId, "F")
			.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

		List<AnimalEntity> findAnimals = animalRepository
			.findByShelterAndBreedContainingIgnoreCaseAndExpiredLike(findShelter, breed, "F");

		List<AnimalInfoDto> animalInfos = findAnimals
			.stream()
			.map(AnimalInfoDto::of)
			.collect(Collectors.toList());

		return responseUtil.buildSuccessResponse(animalInfos);
	}

	/**
	 * 쉘터와 소속 동물 정보가 일치하는 지 검증하는 메소드
	 *
	 * @param
	 */
	@Transactional
	private AnimalEntity validateAnimal(Long shelterId, Long animalId) {

		AnimalEntity validateAnimal = animalRepository.findByIdAndExpiredLike(animalId, "F")
			.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

		if (!validateAnimal.getShelter().getId().equals(shelterId)) {
			throw new ApiErrorException(ApiStatus.BAD_REQUEST);
		}

		return validateAnimal;
	}

	/**
	 * 동물의 등록 정보가 이미 있는지 확인하는 메소드
	 *
	 * @param
	 */
	@Transactional
	private void validateDuplicate(AnimalEntity animal) {
		animalRepository.findByManageCodeAndExpiredLike(animal.getManageCode(), "F")
			.ifPresent(e -> {
				throw new ApiErrorException(ApiStatus.DUPLICATION);
			});
	}
}
