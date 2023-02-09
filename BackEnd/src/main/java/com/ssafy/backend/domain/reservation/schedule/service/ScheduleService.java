package com.ssafy.backend.domain.reservation.schedule.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.backend.domain.member.entity.UserEntity;
import com.ssafy.backend.domain.member.model.response.UserInfoDto;
import com.ssafy.backend.domain.member.repository.UserRepository;
import com.ssafy.backend.domain.reservation.schedule.entity.ScheduleEntity;
import com.ssafy.backend.domain.reservation.schedule.model.response.ScheduleInfoDto;
import com.ssafy.backend.domain.reservation.schedule.repository.ScheduleRepository;
import com.ssafy.backend.domain.reservation.timetable.repository.TimetableRepository;
import com.ssafy.backend.domain.shelter.entity.ShelterEntity;
import com.ssafy.backend.domain.shelter.model.ShelterDto;
import com.ssafy.backend.domain.shelter.model.response.ShelterInfoDto;
import com.ssafy.backend.domain.shelter.repository.ShelterRepository;
import com.ssafy.backend.global.common.model.ResponseSuccessDto;
import com.ssafy.backend.global.error.exception.ApiErrorException;
import com.ssafy.backend.global.util.JwtUtil;
import com.ssafy.backend.global.util.ResponseUtil;
import com.ssafy.backend.global.util.enums.ApiStatus;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true) // 기본적으로 트랜잭션 안에서만 데이터 변경하게 설정(성능 향상)
@RequiredArgsConstructor // Lombok을 사용해 @Autowired 없이 의존성 주입. final 객제만 주입됨을 주의
public class ScheduleService {
	private final ResponseUtil responseUtil;
	private final JwtUtil jwtUtil;
	private final ShelterRepository shelterRepository;
	private final ScheduleRepository scheduleRepository;
	private final UserRepository userRepository;

	// @Transactional
	// public ResponseSuccessDto<?> getUserInfoByNickname(String userNickname) {
	// 	ScheduleEntity findUser = scheduleRepository.findByName(userNickname)
	// 		.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));
	//
	// 	if (!findUser.getUser().getName().equals(userNickname)) { // 불일치
	// 		throw new ApiErrorException(ApiStatus.BAD_REQUEST);
	// 	}
	// 	List<ScheduleEntity> findUsers = scheduleRepository.findBy();
	// 	List<ScheduleInfoDto> userInfos = findUsers
	// 		.stream()
	// 		.map(ScheduleInfoDto::of)
	// 		.collect(Collectors.toList());
	// 	ResponseSuccessDto<List<ScheduleEntity>> resp = responseUtil
	// 		.buildSuccessResponse(userInfos);
	// 	return resp;
	// }
	//
	// @Transactional
	// public ResponseSuccessDto<?> getShelterInfoById(Long shelterId) {
	// 	ScheduleEntity findId = scheduleRepository.findById(shelterId)
	// 		.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));
	//
	// 	if(!findId.getId().equals(shelterId)) { // 불일치
	// 		throw new ApiErrorException(ApiStatus.BAD_REQUEST);
	// 	}
	// 	List<ScheduleEntity> findShelters = scheduleRepository.findAll();
	// 	List<ScheduleInfoDto> shelterInfos = findShelters
	// 		.stream()
	// 		.map(ScheduleInfoDto::of)
	// 		.collect(Collectors.toList());
	// 	ResponseSuccessDto<List<ScheduleEntity>> resp = responseUtil
	// 		.buildSuccessResponse(shelterInfos);
	// 	return resp;
	// }

	@Transactional
	public ResponseSuccessDto<?> deleteSchedule(Long scheduleId, HttpServletRequest request) {

		String token = Optional.ofNullable(request.getHeader(HttpHeaders.AUTHORIZATION))
				.orElseThrow(() -> new ApiErrorException(ApiStatus.UNAUTHORIZED));

		String tokenId = jwtUtil.getUserId(token);

		UserEntity findUser = userRepository.findByIdAndExpiredLike(Long.valueOf( tokenId), "F")
			.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

		ScheduleEntity findSchedule = scheduleRepository.findById(scheduleId)
			.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

		//비ry
		if(!findSchedule.getUser().getId().equals(findUser.getId())) {
			if(!findSchedule.getShelter().getId().equals(findSchedule.getShelter().getId())) {
				throw new ApiErrorException(ApiStatus.BAD_REQUEST);
			}
		}

		scheduleRepository.deleteById(findSchedule.getId());

		ResponseSuccessDto resp = responseUtil
			.buildSuccessResponse(null);

		return resp;
	}
}
