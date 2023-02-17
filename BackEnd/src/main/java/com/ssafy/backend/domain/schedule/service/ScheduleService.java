package com.ssafy.backend.domain.schedule.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.backend.domain.member.entity.UserEntity;
import com.ssafy.backend.domain.member.model.response.UserInfoDto;
import com.ssafy.backend.domain.member.repository.UserRepository;
import com.ssafy.backend.domain.schedule.entity.ScheduleEntity;
import com.ssafy.backend.domain.schedule.model.request.ScheduleRegisterDto;
import com.ssafy.backend.domain.schedule.model.response.ScheduleInfoDto;
import com.ssafy.backend.domain.schedule.repository.ScheduleRepository;
import com.ssafy.backend.domain.shelter.entity.ShelterEntity;
import com.ssafy.backend.domain.shelter.model.ShelterDto;
import com.ssafy.backend.domain.shelter.model.response.ShelterInfoDto;
import com.ssafy.backend.domain.shelter.repository.ShelterRepository;
import com.ssafy.backend.domain.timetable.repository.TimetableRepository;
import com.ssafy.backend.global.common.model.response.ResponseSuccessDto;
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
	private static Sort sort = Sort.by(
			Sort.Order.asc("day"),
			Sort.Order.asc("time")
	);

	@Transactional
	public ResponseSuccessDto<?> getScheduleByUser(Long userId, HttpServletRequest request) {

//		String token = Optional.ofNullable(request.getHeader(HttpHeaders.AUTHORIZATION))
//			.orElseThrow(() -> new ApiErrorException(ApiStatus.UNAUTHORIZED));
//
//		String tokenId = jwtUtil.getUserId(token);
//
//		UserEntity loginUser = userRepository.findByIdAndExpiredLike(Long.valueOf( tokenId), "F")
//			.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

		UserEntity findUser = userRepository.findByIdAndExpiredLike(userId, "F")
				.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

		List<ScheduleEntity> findSchedule = scheduleRepository.findByUser(findUser, sort);


		List<ScheduleInfoDto> scheduleInfos = findSchedule
			.stream()
			.map(ScheduleInfoDto::of)
			.collect(Collectors.toList());
		ResponseSuccessDto<List<ScheduleEntity>> resp = responseUtil
			.buildSuccessResponse(scheduleInfos);
		return resp;
	}

	@Transactional
	public ResponseSuccessDto<?> getScheduleByShelter(Long shelterId, HttpServletRequest request) {

//		String token = Optional.ofNullable(request.getHeader(HttpHeaders.AUTHORIZATION))
//			.orElseThrow(() -> new ApiErrorException(ApiStatus.UNAUTHORIZED));
//
//		String tokenId = jwtUtil.getUserId(token);
//
//		UserEntity loginUser = userRepository.findByIdAndExpiredLike(Long.valueOf( tokenId), "F")
//			.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));
//
//		ShelterEntity findShelter = shelterRepository.findByUser(loginUser)
//			.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

		ShelterEntity findShelter = shelterRepository.findByIdAndExpiredLike(shelterId, "F")
				.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

		List<ScheduleEntity> findSchedule = scheduleRepository.findByShelter(findShelter, sort);

		List<ScheduleInfoDto> scheduleInfos = findSchedule
			.stream()
			.map(ScheduleInfoDto::of)
			.collect(Collectors.toList());
		ResponseSuccessDto<List<ScheduleEntity>> resp = responseUtil
			.buildSuccessResponse(scheduleInfos);
		return resp;
	}

	@Transactional
	public ResponseSuccessDto<?> deleteSchedule(Long scheduleId, HttpServletRequest request) {

		String token = Optional.ofNullable(request.getHeader(HttpHeaders.AUTHORIZATION))
				.orElseThrow(() -> new ApiErrorException(ApiStatus.UNAUTHORIZED));

		String tokenId = jwtUtil.getUserId(token);

		UserEntity loginUser = userRepository.findByIdAndExpiredLike(Long.valueOf( tokenId), "F")
				.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

		ScheduleEntity findSchedule = scheduleRepository.findById(scheduleId)
				.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

		if(loginUser.getRole().equals("HOST")){
			ShelterEntity findShelter = shelterRepository.findByUser(loginUser)
				.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

			if(findSchedule.getShelter().getId() != findShelter.getId())
				throw new ApiErrorException(ApiStatus.BAD_REQUEST);

		}
		else if(loginUser.getRole().equals("USER")){

			if(findSchedule.getUser().getId() != loginUser.getId())
				throw new ApiErrorException(ApiStatus.BAD_REQUEST);
		}

		scheduleRepository.deleteById(findSchedule.getId());

		ResponseSuccessDto resp = responseUtil
				.buildSuccessResponse(null);

		return resp;
	}

	@Transactional
	public ResponseSuccessDto<?> registSchedule(ScheduleRegisterDto registerDto, HttpServletRequest request){

		String token = Optional.ofNullable(request.getHeader(HttpHeaders.AUTHORIZATION))
			.orElseThrow(() -> new ApiErrorException(ApiStatus.UNAUTHORIZED));

		String tokenId = jwtUtil.getUserId(token);

		UserEntity loginUser = userRepository.findByIdAndExpiredLike(Long.valueOf( tokenId), "F")
			.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

		ShelterEntity findShelter = shelterRepository.findByName(registerDto.getShelterNickname())
			.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

		String room = registerDto.getDay() + registerDto.getTime() + findShelter.getId() + loginUser.getId();

		ScheduleEntity schedule = registerDto.toEntity(loginUser, findShelter, room);

		Long scheduleId = scheduleRepository.save(schedule).getId();

		ResponseSuccessDto<Long> resp = responseUtil
				.buildSuccessResponse(scheduleId);
		return resp;
	}
}
