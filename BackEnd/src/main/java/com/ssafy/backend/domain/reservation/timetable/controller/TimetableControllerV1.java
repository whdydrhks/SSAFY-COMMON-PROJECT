package com.ssafy.backend.domain.reservation.timetable.controller;
import javax.servlet.http.HttpServletRequest;

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

	@GetMapping("/{shelter_id}")
	@ApiOperation(value="보호소 시간검색")
	public String[] getShelterInfo(
		@PathVariable(name="shelterId") Long shelterId,
		HttpServletRequest request) {

	 	String[] str = timetableService.getDayInfoById(shelterId);

		return str;
	}

	@PutMapping("/{shelter_id}")
	@ApiOperation(value="보호소 시간수정")
	public String[] updateTimetableInfo(
		@PathVariable(name="shelterId") Long shelterId,
		@RequestBody String[] days,
		HttpServletRequest request) {

		String[] str = timetableService.update(shelterId, days);
		return str;
	}



}
