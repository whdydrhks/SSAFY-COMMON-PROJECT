package com.ssafy.backend.domain.reservation.schedule.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.backend.domain.member.service.UserService;
import com.ssafy.backend.domain.reservation.schedule.service.ScheduleService;
import com.ssafy.backend.domain.shelter.service.ShelterService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

//@Slf4j
//@RestController
//@RequiredArgsConstructor
//@Api(tags = "ScheduleController v1")
//@RequestMapping("/v1/schedule")
public class ScheduleControllerV1 {
//	private final ScheduleService scheduleService;
//	private final ShelterService shelterService;
//	private final UserService userService;

	// @GetMapping("/users/{userNickname}")
	// @ApiOperation(value="유저 일정정보 조회")
	// public ResponseEntity<?> getUserScheduleInfo(
	// 	@PathVariable(name="userNickname") String userNickname,
	// 	HttpRequest request) {
	// 	return ResponseEntity
	// 		.ok(scheduleService.getUserInfoByNickname(userNickname));
	// }
	//
	// @GetMapping("/shelters/{shelterName}")
	// @ApiOperation(value="보호소 일정정보 조회")
	// public ResponseEntity<?> getShelterScheduleInfo(
	// 	@PathVariable(name="shelterName") String shelterName,
	// 	HttpRequest request) {
	// 	// 김싸피 0208 1 9
	// 	return ResponseEntity
	// 		.ok(scheduleService.getShelterInfoByName(shelterName));
	// }

//	@DeleteMapping("/{scheduleId}")
//	@ApiOperation(value="보호소 기준 삭제")
//	public ResponseEntity<?> deleteHostSchedule(
//		@PathVariable(name="scheduleId") Long scheduleId,
//		HttpServletRequest request) {
//
//		return ResponseEntity
//			.ok(scheduleService.deleteSchedule(scheduleId, request));
//	}


}
