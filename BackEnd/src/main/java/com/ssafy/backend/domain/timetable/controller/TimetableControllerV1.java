package com.ssafy.backend.domain.timetable.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.backend.domain.timetable.model.request.TimetableUpdateDto;
import com.ssafy.backend.domain.timetable.service.TimetableService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@Api(tags = "TimetableController v1")
@RequestMapping("/v1/shelter/{shelterId}")
public class TimetableControllerV1 {

	private final TimetableService timetableService;

	@GetMapping("/timetable")
	@ApiOperation(value = "보호소 시간 검색")
	public ResponseEntity<?> getShelterInfo(
		@ApiParam(value = "보호소 식별 번호") @PathVariable(name = "shelterId") Long shelterId,
		HttpServletRequest request) {

		return ResponseEntity
			.ok(timetableService.getDayInfoByShelter(shelterId));
	}

	@PutMapping("/timetable")
	@ApiOperation(value = "보호소 시간 수정")
	public ResponseEntity<?> updateTimetableInfo(
		@ApiParam(value = "보호소 식별 번호") @PathVariable(name = "shelterId") Long shelterId,
		@RequestBody TimetableUpdateDto updateDto,
		HttpServletRequest request) {

		return ResponseEntity
			.ok(timetableService.update(shelterId, updateDto));
	}

}
