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
import com.ssafy.backend.global.common.model.ResponseSuccessDto;
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

		// 중복검사
		validateDuplicate(shelter);

		Long shelterId = shelterRepository.save(shelter).getId();

		ResponseSuccessDto<Long> resp = responseUtil
			.buildSuccessResponse(shelterId);

		return resp;
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

		Long updatedShelterId = shelterRepository.save(updateShelter).getId();

		ResponseSuccessDto<Long> resp = responseUtil
			.buildSuccessResponse(updatedShelterId);

		return resp;
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

		Long updatedShelterId = shelterRepository.save(updateShelter).getId();

		ResponseSuccessDto<Long> resp = responseUtil
			.buildSuccessResponse(updatedShelterId);

		return resp;
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

		ResponseSuccessDto<Long> resp = responseUtil
			.buildSuccessResponse(null);

		return resp;
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

		ResponseSuccessDto<List<ShelterEntity>> resp = responseUtil
			.buildSuccessResponse(shelterInfos);

		return resp;
	}

	/**
	 * id로 보호소 정보를 가져오는 메소드
	 *
	 * @param
	 * @return UserInfoDto
	 */
	@Transactional
	public ResponseSuccessDto<?> getInfoById(Long shelterId) {

		ShelterEntity findShelter = shelterRepository.findByIdAndExpiredLike(shelterId, "F")
			.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

		ShelterInfoDto infoDto = ShelterInfoDto.of(findShelter);

		ResponseSuccessDto<ShelterInfoDto> resp = responseUtil
			.buildSuccessResponse(infoDto);

		return resp;
	}

	/**
	 * name으로 보호소 정보를 가져오는 메소드
	 *
	 * @param
	 * @return ShelterInfoDto
	 */
	@Transactional
	public ResponseSuccessDto<?> getInfoByName(
		String shelterName) {

		ShelterEntity findShelter = shelterRepository.findByNameAndExpiredLike(shelterName, "F")
			.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

		ShelterInfoDto infoDto = ShelterInfoDto.of(findShelter);

		ResponseSuccessDto<ShelterEntity> resp = responseUtil
			.buildSuccessResponse(infoDto);

		return resp;
	}

	/**
	 * name으로 보호소 정보를 검색하는 메소드
	 *
	 * @param
	 * @return ResponseSuccessDto&ltList&ltShelterInfoDto&gt&gt
	 */
	@Transactional
	public ResponseSuccessDto<?> searchInfoByName(
		String shelterName) {

		if (shelterName.isEmpty() || shelterName.length() < 2) {
			throw new ApiErrorException(ApiStatus.KEYWORD_LESS_THAN_TWO);
		}

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
	 * 같은 이름의 보호소의 등록 정보가 이미 있는지 확인하는 메소드
	 *
	 * @param
	 * @throws IllegalStateException
	 */
	private void validateDuplicate(ShelterEntity shelter) {
		shelterRepository.findByName(shelter.getName())
			.ifPresent(e -> {
				throw new ApiErrorException(ApiStatus.EMAIL_DUPLICATION);
			});
	}

	//	// 테스트용 더미 데이터 생성용
	//	@PostConstruct
	//	public void testInitializing() {
	//		for (int i = 1; i <= 50; i++) {
	//			String name = "보호소_" + String.format("%03d", i);
	//			ShelterEntity shelter = ShelterEntity.builder()
	//				.name(name)
	//				.url("https://www." + name + ".com")
	//				.introduce(name + "의 소개글 입니다.")
	//				.telNumber("010-1234-" + String.format("%04d", i))
	//				.postCode("111111")
	//				.address("00시 00구 00대로 " + i)
	//				.build();
	//			shelterRepository.save(shelter);
	//		}
	//	}
}
