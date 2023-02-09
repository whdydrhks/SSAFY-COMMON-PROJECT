package com.ssafy.backend.domain.reservation.timetable.service;

import java.util.List;
import java.util.stream.Collectors;

import com.ssafy.backend.domain.reservation.timetable.model.request.TimetableUpdateDto;
import lombok.ToString;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.backend.domain.reservation.timetable.entity.TimetableEntity;
import com.ssafy.backend.domain.reservation.timetable.model.response.TimetableInfoDto;
import com.ssafy.backend.domain.reservation.timetable.repository.TimetableRepository;
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
@ToString
public class TimetableService {
	private final ResponseUtil responseUtil;

	private final ShelterRepository shelterRepository;
	private final TimetableRepository timetableRepository;

	public ResponseSuccessDto<?> getDayInfoById(Long shelterId) {
		TimetableEntity findTimetable = timetableRepository.findById(shelterId)
				.orElseThrow(() -> new ApiErrorException(ApiStatus.BAD_REQUEST));


		TimetableInfoDto infoDto = TimetableInfoDto.of(findTimetable);
		ResponseSuccessDto<TimetableInfoDto> resp = responseUtil
				.buildSuccessResponse(infoDto);
		return resp;
	}

	@Transactional
	public ResponseSuccessDto<?> update(Long shelter_Id, TimetableUpdateDto updateDto) {

		TimetableEntity findTimetable = timetableRepository.findById(shelter_Id)
				.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

		TimetableEntity updateTimetable = TimetableEntity.builder()
				.id(findTimetable.getId())
				.shelter_id(findTimetable.getShelter_id())
				.sun(updateDto.getDays()[0] )
				.mon(updateDto.getDays()[1])
				.tue(updateDto.getDays()[2])
				.wed(updateDto.getDays()[3])
				.thr(updateDto.getDays()[4])
				.fri(updateDto.getDays()[5])
				.sat(updateDto.getDays()[6])
				.build();

		Long updateTimetableId = timetableRepository.save(updateTimetable).getId();

		ResponseSuccessDto<Long> resp = responseUtil
				.buildSuccessResponse(updateTimetableId);
		return resp;

//		String[] str = new String[7];
//		str[0] = updateTimetable.getSun();
//		str[1] = updateTimetable.getMon();
//		str[2] = updateTimetable.getTue();
//		str[3] = updateTimetable.getWed();
//		str[4] = updateTimetable.getThr();
//		str[5] = updateTimetable.getFri();
//		str[6] = updateTimetable.getSat();
//
//		return str;
	}

}
