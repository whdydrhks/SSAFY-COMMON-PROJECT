package com.ssafy.backend.domain.alarm.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.backend.domain.alarm.model.request.AlarmDeleteDto;
import com.ssafy.backend.domain.alarm.model.request.AlarmRegistDto;
import com.ssafy.backend.domain.alarm.service.AlarmService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@Api(tags = "AlarmController v1")
@RequestMapping("/v1/alarm")
public class AlarmControllerV1 {

	private final AlarmService alarmService;

	@GetMapping
	@ApiOperation(value = "알람 전체 조회")
	public ResponseEntity<?> getAllAlarm(HttpServletRequest request) {

		return ResponseEntity.ok(alarmService.getAll(request));
	}

	@PostMapping
	@ApiOperation(value = "알람 등록")
	public ResponseEntity<?> registAlarm(
		@RequestBody AlarmRegistDto registDto,
		HttpServletRequest request) {

		return ResponseEntity.ok(alarmService.regist(registDto, request));
	}

	@DeleteMapping
	@ApiOperation(value = "알람 삭제")
	public ResponseEntity<?> deleteAlarm(@RequestBody AlarmDeleteDto deleteDto, HttpServletRequest request) {

		return ResponseEntity.ok(alarmService.delete(deleteDto, request));
	}

	@DeleteMapping("/all")
	@ApiOperation(value = "알람 전체 삭제")
	public ResponseEntity<?> deleteAllAlarm(HttpServletRequest request) {

		return ResponseEntity.ok(alarmService.deleteAll(request));
	}

}
