package com.ssafy.backend.global.util;

import java.util.Arrays;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum StatusCode {

	// Successful 2xx
	OK(200, "Ok", "요청이 성공적으로 되었습니다.", true),
	CREATED(201, "Created", "리소스 생성 요청이 성공적으로 되었습니다.", true),
	ACCEPTED(202, "Accepted", "요청을 수신했지만 그에 일지하는 응답을 할 수 없습니다.", true),
	NO_CONTENT(204, "No Content", "요청을 성공적으로 완료했지만 제공하는 컨텐츠가 없습니다.", true),

	// Redirection 3xx

	// Client Error 4xx
	INVALID_PARAMS(400, "InvalidParams", "필수데이터 누락, 또는 형식과 다른 데이터를 요청하셨습니다.", false),
	UNAUTORIZED(401, "Unauthorized", "토큰 정보가 유효하지 않습니다.", false),
	UNAVAILABLE(401, "Unavailable", "회원가입이 완료되지 않은 사용자입니다.", false),
	NOT_FOUND(404, "NotFound", "존재하지 않는 데이터입니다.", false),
	CONFLICT(409, "Conflict", "데이터가 충돌되었습니다.", false);

	// Server Error 5xx

	private int code;
	private String status;
	private String message;
	private boolean boolType;

	public static StatusCode valueOfCode(String statusCode) {
		return Arrays.stream(values())
			.filter(value -> value.status.equals(statusCode))
			.findAny()
			.orElse(null);
	}
}
