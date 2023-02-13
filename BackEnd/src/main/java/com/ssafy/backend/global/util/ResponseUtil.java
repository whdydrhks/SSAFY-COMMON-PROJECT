package com.ssafy.backend.global.util;

import java.time.ZonedDateTime;
import java.util.TimeZone;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import com.ssafy.backend.global.common.model.response.ResponseErrorDto;
import com.ssafy.backend.global.common.model.response.ResponseSuccessDto;

@Component
public class ResponseUtil<T> {
	/**
	 * 성공적인 응답이 이루어 졌을 때 success response를 반환하는 메소드
	 *
	 * @param
	 * @return ResponseSuccessDto
	 */
	public ResponseSuccessDto<T> buildSuccessResponse(T data) {
		return ResponseSuccessDto
			.<T>builder()
			.timeStamp(ZonedDateTime.now(TimeZone.getTimeZone("UTC").toZoneId()))
			.httpStatus(HttpStatus.OK)
			.data(data)
			.build();
	}

	/**
	 * 잘못된 응답이 이루어 졌을 때 error response를 반환하는 메소드
	 *
	 * @param
	 * @return ResponseErrorDto
	 */
	public ResponseErrorDto<T> buildErrorResponse(HttpStatus httpStatus, T error, String path) {
		return ResponseErrorDto
			.<T>builder()
			.timeStamp(ZonedDateTime.now(TimeZone.getTimeZone("UTC").toZoneId()))
			.httpStatus(httpStatus)
			.error(error)
			.path(path)
			.build();
	}
}
