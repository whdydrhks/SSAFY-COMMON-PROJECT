package com.ssafy.backend.domain.timetable.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.backend.domain.shelter.entity.ShelterEntity;
import com.ssafy.backend.domain.shelter.repository.ShelterRepository;
import com.ssafy.backend.domain.timetable.entity.TimetableEntity;
import com.ssafy.backend.domain.timetable.model.request.TimetableUpdateDto;
import com.ssafy.backend.domain.timetable.model.response.TimetableInfoDto;
import com.ssafy.backend.domain.timetable.repository.TimetableRepository;
import com.ssafy.backend.global.common.model.response.ResponseSuccessDto;
import com.ssafy.backend.global.error.exception.ApiErrorException;
import com.ssafy.backend.global.util.ResponseUtil;
import com.ssafy.backend.global.util.enums.ApiStatus;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true) // 기본적으로 트랜잭션 안에서만 데이터 변경하게 설정(성능 향상)
@RequiredArgsConstructor // Lombok을 사용해 @Autowired 없이 의존성 주입. final 객제만 주입됨을 주의
public class TimetableService {

	private final ResponseUtil responseUtil;

	private final ShelterRepository shelterRepository;
	private final TimetableRepository timetableRepository;

	public ResponseSuccessDto<?> getDayInfoByShelter(Long shelterId) {

		ShelterEntity findShelter = shelterRepository.findByIdAndExpiredLike(shelterId, "F")
			.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

		TimetableEntity findTimetable = timetableRepository.findByShelterAndExpiredLike(findShelter, "F")
			.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

		TimetableInfoDto infoDto = TimetableInfoDto.of(findTimetable);

		return responseUtil.buildSuccessResponse(infoDto);
	}

	@Transactional
	public ResponseSuccessDto<?> update(Long shelterId, TimetableUpdateDto updateDto) {

		ShelterEntity findShelter = shelterRepository.findByIdAndExpiredLike(shelterId, "F")
			.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

		TimetableEntity findTimetable = timetableRepository.findByShelterAndExpiredLike(findShelter, "F")
			.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

		TimetableEntity updateTimetable = updateDto.updateEntity(findTimetable);

		Long updateTimetableId = timetableRepository.save(updateTimetable).getId();

		return responseUtil.buildSuccessResponse(updateTimetableId);
	}

}
