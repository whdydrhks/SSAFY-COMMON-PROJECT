package com.ssafy.backend.global.common.model.response;

import java.time.ZonedDateTime;

import org.springframework.http.HttpStatus;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ResponseSuccessDto<T> extends ResponseDto {
	/*
	 * "timestamp": "2023-02-04T07:36:08.031+00:00",
	 * "status": 200,
	 * "message": "No message available",
	 * "data": {},
	 */

	private T data;

	@Builder
	public ResponseSuccessDto(ZonedDateTime timeStamp, HttpStatus httpStatus, T data) {
		super(timeStamp, httpStatus.value(), httpStatus.getReasonPhrase());
		this.data = data;
	}

}