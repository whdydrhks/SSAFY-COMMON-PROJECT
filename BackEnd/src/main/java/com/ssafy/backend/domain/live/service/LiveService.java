package com.ssafy.backend.domain.live.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.backend.domain.live.entity.LiveEntity;
import com.ssafy.backend.domain.live.model.request.LiveDeleteDto;
import com.ssafy.backend.domain.live.model.request.LiveRegistDto;
import com.ssafy.backend.domain.live.model.response.LiveInfoDto;
import com.ssafy.backend.domain.live.repository.LiveRepository;
import com.ssafy.backend.domain.member.entity.UserEntity;
import com.ssafy.backend.domain.member.repository.UserRepository;
import com.ssafy.backend.domain.shelter.entity.ShelterEntity;
import com.ssafy.backend.domain.shelter.repository.ShelterRepository;
import com.ssafy.backend.global.common.entity.BaseTimeEntity;
import com.ssafy.backend.global.common.model.response.ResponseSuccessDto;
import com.ssafy.backend.global.error.exception.ApiErrorException;
import com.ssafy.backend.global.file.service.FileService;
import com.ssafy.backend.global.util.JwtUtil;
import com.ssafy.backend.global.util.ResponseUtil;
import com.ssafy.backend.global.util.enums.ApiStatus;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class LiveService extends BaseTimeEntity {

	private final FileService fileService;

	private final ResponseUtil responseUtil;
	private final JwtUtil jwtUtil;
	private final ShelterRepository shelterRepository;
	private final LiveRepository liveRepository;
	private final UserRepository userRepository;

	@Transactional
	public ResponseSuccessDto<?> registLive(LiveRegistDto registDto, HttpServletRequest request) {

		String token = Optional.ofNullable(request.getHeader(HttpHeaders.AUTHORIZATION))
			.orElseThrow(() -> new ApiErrorException(ApiStatus.UNAUTHORIZED));

		String tokenId = jwtUtil.getUserId(token);

		UserEntity loginUser = userRepository.findByIdAndExpiredLike(Long.valueOf(tokenId), "F")
			.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

		ShelterEntity findShelter = shelterRepository.findByUser(loginUser)
			.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

		LiveEntity live = registDto.toEntity(findShelter);

		Long liveId = liveRepository.save(live).getId();

		ResponseSuccessDto<Long> resp = responseUtil
			.buildSuccessResponse(liveId);

		return resp;
	}

	@Transactional
	public ResponseSuccessDto<?> getLiveAll() {
		Sort sortDate = Sort.by(
			Sort.Order.desc("createdDate"));

		List<LiveEntity> findLives = liveRepository.findAll(sortDate);

		List<LiveInfoDto> liveInfos = findLives
			.stream()
			.map(findLive -> {
				return LiveInfoDto.of(findLive, fileService.createDownloadUri("live", findLive.getFile()));
			})
			.collect(Collectors.toList());

		ResponseSuccessDto<List<LiveInfoDto>> resp = responseUtil
			.buildSuccessResponse(liveInfos);

		return resp;
	}

	@Transactional
	public ResponseSuccessDto<?> getLive(Long liveId) {
		LiveEntity findLive = liveRepository.findById(liveId)
			.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

		LiveInfoDto liveInfo = LiveInfoDto.of(findLive, fileService.createDownloadUri("live", findLive.getFile()));

		ResponseSuccessDto<LiveInfoDto> resp = responseUtil
			.buildSuccessResponse(liveInfo);

		return resp;

	}

	@Transactional
	public ResponseSuccessDto<?> deleteLive(LiveDeleteDto deleteDto, HttpServletRequest request) {

		String token = Optional.ofNullable(request.getHeader(HttpHeaders.AUTHORIZATION))
			.orElseThrow(() -> new ApiErrorException(ApiStatus.UNAUTHORIZED));

		String tokenId = jwtUtil.getUserId(token);

		UserEntity loginUser = userRepository.findByIdAndExpiredLike(Long.valueOf(tokenId), "F")
			.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

		ShelterEntity findShelter = shelterRepository.findByUser(loginUser)
			.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

		LiveEntity findLive = liveRepository.findById(deleteDto.getLiveId())
			.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

		if (findLive.getShelter().getId() != findShelter.getId()) {
			throw new ApiErrorException(ApiStatus.BAD_REQUEST);
		}

		liveRepository.deleteById(findLive.getId());

		ResponseSuccessDto resp = responseUtil
			.buildSuccessResponse(null);

		return resp;
	}

}
