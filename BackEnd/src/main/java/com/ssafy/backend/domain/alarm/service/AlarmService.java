package com.ssafy.backend.domain.alarm.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.backend.domain.alarm.entity.AlarmEntity;
import com.ssafy.backend.domain.alarm.model.request.AlarmDeleteDto;
import com.ssafy.backend.domain.alarm.model.request.AlarmRegistDto;
import com.ssafy.backend.domain.alarm.model.response.AlarmInfoDto;
import com.ssafy.backend.domain.alarm.repository.AlarmRepository;
import com.ssafy.backend.domain.animal.entity.AnimalEntity;
import com.ssafy.backend.domain.animal.repository.AnimalRepository;
import com.ssafy.backend.domain.member.entity.UserEntity;
import com.ssafy.backend.domain.member.repository.UserRepository;
import com.ssafy.backend.domain.shelter.entity.ShelterEntity;
import com.ssafy.backend.domain.shelter.repository.ShelterRepository;
import com.ssafy.backend.global.common.model.response.ResponseSuccessDto;
import com.ssafy.backend.global.error.exception.ApiErrorException;
import com.ssafy.backend.global.file.service.FileService;
import com.ssafy.backend.global.util.JwtUtil;
import com.ssafy.backend.global.util.ResponseUtil;
import com.ssafy.backend.global.util.enums.ApiStatus;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class AlarmService {

	private final JwtUtil jwtUtil;
	private final ResponseUtil responseUtil;

	private final FileService fileService;

	private final AnimalRepository animalRepository;
	private final ShelterRepository shelterRepository;
	private final UserRepository userRepository;
	private final AlarmRepository alarmRepository;

	@Transactional
	public ResponseSuccessDto<?> regist(AlarmRegistDto registDto, HttpServletRequest request) {
		AlarmEntity alarm;
		UserEntity findUser;
		ShelterEntity findShelter;
		Long alarmId = 0L;
		switch (registDto.getAlarmType()) {
			case 1: //유저의 당일 예약알람(receiver : user, sender : host)
				break;
			case 2: // 호스트의 당일 예약알람(receiver : host, sender : user)
				break;
			case 3: // 호스트가 예약 취소(receiver : user, sender : host)

				findUser = userRepository.findByIdAndExpiredLike(registDto.getReceiverId(), "F")
					.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

				alarm = registDto.toEntityShelterToUser(findUser);

				alarmId = alarmRepository.save(alarm).getId();
				break;
			case 4: // 유저가 예약 취소(receiver : host, sender : user)

				findShelter = shelterRepository.findByIdAndExpiredLike(registDto.getReceiverId(), "F")
					.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

				alarm = registDto.toEntityUserToShelter(findShelter.getUser());

				alarmId = alarmRepository.save(alarm).getId();
				break;
			case 5: // 입양 모집 종료 (receiver : user, sender : animal)
				findUser = userRepository.findByIdAndExpiredLike(registDto.getReceiverId(), "F")
					.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

				alarm = registDto.toEntityAnimalToUser(findUser);

				alarmId = alarmRepository.save(alarm).getId();
				break;
			default:
				throw new ApiErrorException(ApiStatus.BAD_REQUEST);
		}
		ResponseSuccessDto<Long> resp = responseUtil
			.buildSuccessResponse(alarmId);

		return resp;
	}

	@Transactional
	public ResponseSuccessDto<?> getAll(HttpServletRequest request) {

		String token = Optional.ofNullable(request.getHeader(HttpHeaders.AUTHORIZATION))
			.orElseThrow(() -> new ApiErrorException(ApiStatus.UNAUTHORIZED));

		String tokenId = jwtUtil.getUserId(token);

		UserEntity loginUser = userRepository.findByIdAndExpiredLike(Long.valueOf(tokenId), "F")
			.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

		List<AlarmEntity> alarmList = alarmRepository.findAllByReceiver(loginUser, Sort.by(Sort.Order.desc("createdDate")));

		List<AlarmInfoDto> alarmInfos = alarmList
			.stream()
			.map(AlarmInfoDto::of)
			.collect(Collectors.toList());

		ResponseSuccessDto<List<AlarmInfoDto>> resp = responseUtil
			.buildSuccessResponse(alarmInfos);

		return resp;
	}

	@Transactional
	public ResponseSuccessDto<?> delete(AlarmDeleteDto deleteDto, HttpServletRequest request) {

		String token = Optional.ofNullable(request.getHeader(HttpHeaders.AUTHORIZATION))
			.orElseThrow(() -> new ApiErrorException(ApiStatus.UNAUTHORIZED));

		String tokenId = jwtUtil.getUserId(token);

		UserEntity loginUser = userRepository.findByIdAndExpiredLike(Long.valueOf(tokenId), "F")
			.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

		AlarmEntity alarm = alarmRepository.findById(deleteDto.getAlarmId())
			.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

		if (loginUser.getId() != alarm.getReceiver().getId()) {
			throw new ApiErrorException(ApiStatus.BAD_REQUEST);
		}

		alarmRepository.delete(alarm);

		ResponseSuccessDto resp = responseUtil
			.buildSuccessResponse(null);

		return resp;
	}

	@Transactional
	public ResponseSuccessDto<?> deleteAll(HttpServletRequest request) {

		String token = Optional.ofNullable(request.getHeader(HttpHeaders.AUTHORIZATION))
			.orElseThrow(() -> new ApiErrorException(ApiStatus.UNAUTHORIZED));

		String tokenId = jwtUtil.getUserId(token);

		UserEntity loginUser = userRepository.findByIdAndExpiredLike(Long.valueOf(tokenId), "F")
			.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

		List<AlarmEntity> alarmList = alarmRepository.findAllByReceiver(loginUser, Sort.by(Sort.Order.desc("createdDate")));

		alarmRepository.deleteAll(alarmList);

		ResponseSuccessDto resp = responseUtil
			.buildSuccessResponse(null);

		return resp;
	}
}
