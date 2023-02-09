package com.ssafy.backend.domain.reservation.timetable.service;

import java.util.List;
import java.util.stream.Collectors;

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
public class TimetableService {
	private final ResponseUtil responseUtil;

	private final ShelterRepository shelterRepository;
	private final TimetableRepository timetableRepository;

	public String[] getDayInfoById(Long shelterId) {
		TimetableEntity findShelter = timetableRepository.findById(shelterId)
			.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));
		if(!findShelter.getShelterId().getId().equals(shelterId)) {
			throw new ApiErrorException(ApiStatus.BAD_REQUEST);
		}

		TimetableInfoDto infoDto = TimetableInfoDto.of(findShelter);

		String[] days = new String[7];
		days[0] = infoDto.getMon();
		days[1] = infoDto.getTue();
		days[2] = infoDto.getWed();
		days[3] = infoDto.getThr();
		days[4] = infoDto.getFri();
		days[5] = infoDto.getSat();
		days[6] = infoDto.getSun();

		return days;
	}

	@Transactional
	public String[] update(Long shelter_Id, String[] days) {

		TimetableEntity findShelter = timetableRepository.findById(shelter_Id)
			.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

		TimetableEntity updateTimetable = TimetableEntity.builder()
			.id(findShelter.getId())
			.sun(days[0])
			.mon(days[1])
			.tue(days[2])
			.wed(days[3])
			.thr(days[4])
			.fri(days[5])
			.sat(days[6])
			.build();

		Long shelterId = timetableRepository.save(updateTimetable).getId();

		String[] str = new String[7];
		str[0] = updateTimetable.getSun();
		str[1] = updateTimetable.getMon();
		str[2] = updateTimetable.getTue();
		str[3] = updateTimetable.getWed();
		str[4] = updateTimetable.getThr();
		str[5] = updateTimetable.getFri();
		str[6] = updateTimetable.getSat();

		return str;
	}

}
