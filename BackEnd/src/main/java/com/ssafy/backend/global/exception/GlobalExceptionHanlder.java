package com.ssafy.backend.global.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHanlder {

	@ExceptionHandler()
	public ResponseEntity<?> handle(Exception e) {
		return null;
	}
}
