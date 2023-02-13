package com.ssafy.backend.domain.shelter.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.backend.domain.shelter.entity.ShelterEntity;
import com.ssafy.backend.domain.shelter.model.request.ShelterRegisterDto;
import com.ssafy.backend.domain.shelter.model.request.ShelterUpdateDto;
import com.ssafy.backend.domain.shelter.model.response.ShelterInfoDto;
import com.ssafy.backend.domain.shelter.repository.ShelterRepository;
import com.ssafy.backend.global.common.model.response.ResponseSuccessDto;
import com.ssafy.backend.global.error.exception.ApiErrorException;
import com.ssafy.backend.global.util.ResponseUtil;
import com.ssafy.backend.global.util.enums.ApiStatus;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true) // 기본적으로 트랜잭션 안에서만 데이터 변경하게 설정(성능 향상)
@RequiredArgsConstructor // Lombok을 사용해 @Autowired 없이 의존성 주입. final 객제만 주입됨을 주의
public class ShelterService {

	private final ResponseUtil responseUtil;

	private final ShelterRepository shelterRepository;

	/**
	 * 보호소 정보를 등록하는 메소드
	 *
	 * @param
	 * @return shelterId
	 */
	@Transactional
	public ResponseSuccessDto<?> register(ShelterRegisterDto registerDto) {

		ShelterEntity shelter = registerDto.toEntity();

		validateDuplicateName(shelter); // 보호소 이름 중복검사

		Long shelterId = shelterRepository.save(shelter).getId();

		return responseUtil.buildSuccessResponse(shelterId);
	}

	/**
	 * 보호소 정보를 수정하는 메소드
	 *
	 * @param
	 * @return 업데이트 된 shelterId
	 */
	@Transactional
	public ResponseSuccessDto<?> update(
		Long shelterId,
		ShelterUpdateDto updateDto) {

		ShelterEntity findShelter = shelterRepository.findById(shelterId)
			.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

		ShelterEntity updateShelter = updateDto.updateEntity(findShelter);

		Long updatedShelterId = shelterRepository.save(updateShelter).getId();

		return responseUtil.buildSuccessResponse(updatedShelterId);
	}

	/**
	 * 보호소의 만료 여부를 갱신하는 메소드
	 *
	 * @param
	 * @return 만료 정보가 업데이트 된 shelterId
	 */
	public ResponseSuccessDto<?> updateExpire(
		Long shelterId,
		Boolean expiredFlag) {

		ShelterEntity findShelter = shelterRepository.findById(shelterId)
			.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

		findShelter.setExpired(expiredFlag ? "T" : "F");

		Long updatedShelterId = shelterRepository.save(findShelter).getId();

		return responseUtil.buildSuccessResponse(updatedShelterId);
	}

	/**
	 * 보호소의 정보를 삭제하는 메소드
	 *
	 * @param
	 * @return 삭제된 된 shelterId
	 */
	@Transactional
	public ResponseSuccessDto<?> delete(Long shelterId) {

		shelterRepository.deleteById(shelterId);

		return responseUtil.buildSuccessResponse(null);
	}

	/**
	 * 보호소 정보를 전부 가져오는 메소드
	 *
	 * @param
	 * @return List&ltShelterInfoDto&gt
	 */
	@Transactional
	public ResponseSuccessDto<?> getInfoAll() {

		List<ShelterEntity> findShelters = shelterRepository.findAllByExpiredLike("F");

		List<ShelterInfoDto> shelterInfos = findShelters
			.stream()
			.map(ShelterInfoDto::of)
			.collect(Collectors.toList());

		return responseUtil.buildSuccessResponse(shelterInfos);
	}

	/**
	 * id로 보호소 정보를 가져오는 메소드
	 *
	 * @param
	 * @return ShelterInfoDto
	 */
	@Transactional
	public ResponseSuccessDto<?> getInfoById(Long shelterId) {

		ShelterEntity findShelter = shelterRepository.findByIdAndExpiredLike(shelterId, "F")
			.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

		ShelterInfoDto infoDto = ShelterInfoDto.of(findShelter);

		return responseUtil.buildSuccessResponse(infoDto);
	}

	/**
	 * name으로 보호소 정보를 가져오는 메소드
	 *
	 * @param
	 * @return ShelterInfoDto
	 */
	@Transactional
	public ResponseSuccessDto<?> getInfoByName(String shelterName) {

		ShelterEntity findShelter = shelterRepository.findByNameAndExpiredLike(shelterName, "F")
			.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

		ShelterInfoDto infoDto = ShelterInfoDto.of(findShelter);

		return responseUtil.buildSuccessResponse(infoDto);
	}

	/**
	 * name으로 보호소 정보를 검색하는 메소드
	 *
	 * @param
	 * @return ResponseSuccessDto&ltList&ltShelterInfoDto&gt&gt
	 */
	@Transactional
	public ResponseSuccessDto<?> searchInfoByName(String shelterName) {

		if (shelterName.isEmpty() || shelterName.length() < 2) {
			throw new ApiErrorException(ApiStatus.KEYWORD_LESS_THAN_TWO);
		}

		List<ShelterEntity> findShelters = shelterRepository
			.findByNameContainingIgnoreCaseAndExpiredLike(shelterName, "F");

		List<ShelterInfoDto> shelterInfos = findShelters
			.stream()
			.map(ShelterInfoDto::of)
			.collect(Collectors.toList());

		return responseUtil.buildSuccessResponse(shelterInfos);
	}

	/**
	 * 같은 이름의 보호소의 등록 정보가 이미 있는지 확인하는 메소드
	 *
	 * @param
	 * @throws ApiErrorException
	 */
	private void validateDuplicateName(ShelterEntity shelter) {
		shelterRepository.findByName(shelter.getName())
			.ifPresent(e -> {
				throw new ApiErrorException(ApiStatus.EMAIL_DUPLICATION);
			});
	}

}
