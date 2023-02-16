package com.ssafy.backend.domain.schedule.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.backend.domain.member.service.UserService;
import com.ssafy.backend.domain.schedule.model.request.ScheduleRegisterDto;
import com.ssafy.backend.domain.schedule.service.ScheduleService;
import com.ssafy.backend.domain.shelter.service.ShelterService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@Api(tags = "ScheduleController v1")
@RequestMapping("/v1/schedule")
public class ScheduleControllerV1 {
	private final ScheduleService scheduleService;
	private final ShelterService shelterService;
	private final UserService userService;

	@GetMapping("/users/{userId}")
	@ApiOperation(value = "유저 일정정보 조회")
	public ResponseEntity<?> getUserScheduleInfo(
		@ApiParam(value = "사용자 식별 번호") @PathVariable Long userId,
		HttpServletRequest request) {
		return ResponseEntity
			.ok(scheduleService.getScheduleByUser(userId, request));
	}

	@GetMapping("/shelters/{shelterId}")
	@ApiOperation(value = "보호소 일정정보 조회")
	public ResponseEntity<?> getShelterScheduleInfo(
		@ApiParam(value = "보호소 식별 번호") @PathVariable Long shelterId,
		HttpServletRequest request) {
		// 김싸피 0208 1 9
		return ResponseEntity
			.ok(scheduleService.getScheduleByShelter(shelterId, request));
	}

	@DeleteMapping("/{scheduleId}")
	@ApiOperation(value = "스케줄 삭제")
	public ResponseEntity<?> deleteHostSchedule(
		@ApiParam(value = "보호소 식별 번호") @PathVariable(name = "scheduleId") Long scheduleId,
		HttpServletRequest request) {

		return ResponseEntity
			.ok(scheduleService.deleteSchedule(scheduleId, request));
	}

	@PostMapping("/register")
	@ApiOperation("스케줄 등록")
	public ResponseEntity<?> registScheduleByUser(
		@RequestBody ScheduleRegisterDto registerDto,
		HttpServletRequest request) {

		return ResponseEntity
			.ok(scheduleService.registSchedule(registerDto, request));
	}

}
