package com.ssafy.backend.domain.reservation.timetable.controller;
import javax.servlet.http.HttpServletRequest;

import com.ssafy.backend.domain.animal.model.request.AnimalUpdateDto;
import com.ssafy.backend.domain.reservation.timetable.model.TimetableDto;
import com.ssafy.backend.domain.reservation.timetable.model.request.TimetableUpdateDto;
import com.ssafy.backend.global.common.model.ResponseSuccessDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.backend.domain.member.service.UserService;
import com.ssafy.backend.domain.reservation.timetable.entity.TimetableEntity;
import com.ssafy.backend.domain.reservation.timetable.exception.NotShelterId;
import com.ssafy.backend.domain.reservation.timetable.service.TimetableService;
import com.ssafy.backend.domain.shelter.service.ShelterService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@Api(tags = "TimetableController v1")
@RequestMapping("/v1/timetable")
public class TimetableControllerV1 {
	private final TimetableService timetableService;
	private final ShelterService shelterService;

	private final UserService userService;

	@GetMapping("/{shelterId}")
	@ApiOperation(value="보호소 시간검색")
	public ResponseEntity<?> getShelterInfo(
			@PathVariable(name="shelterId") Long shelterId,
			HttpServletRequest request) {

		return ResponseEntity
				.ok(timetableService.getDayInfoById(shelterId));
	}

	@PutMapping("/{shelterId}")
	@ApiOperation(value="보호소 시간수정")
	public ResponseEntity<?> updateTimetableInfo(
			@PathVariable(name="shelterId") Long shelterId,
			@RequestBody TimetableUpdateDto updateDto,
			HttpServletRequest request) {

		return ResponseEntity
				.ok(timetableService.update(shelterId, updateDto));
	}



}
