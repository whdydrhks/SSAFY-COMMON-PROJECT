package com.ssafy.backend.global.error.handler;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.ssafy.backend.global.error.exception.ApiErrorException;
import com.ssafy.backend.global.error.exception.FileErrorException;
import com.ssafy.backend.global.util.ResponseUtil;
import com.ssafy.backend.global.util.enums.ApiStatus;

import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
@RequiredArgsConstructor
public class ErrorExceptionHandler {

	private final ResponseUtil<String> responseUtil;

	/**
	 * Rest Api 에러를 핸들링 하기 위한 핸들러 메소드
	 *
	 * @param
	 * @return ResponseEntity&ltResponseErrorDto&gt
	 */
	@ExceptionHandler({ApiErrorException.class})
	private ResponseEntity<?> handle(HttpServletRequest request, final ApiErrorException e) {
		log.info("\nApi Error Log :" + request.getContextPath() + "\n" + e);

		return ResponseEntity
			.status(e.getException().getStatus())
			.body(responseUtil.buildErrorResponse(e.getException().getStatus(), e.getMessage(),
				request.getRequestURI()));
	}

	/**
	 * File 에러를 핸들링 하기 위한 핸들러 메소드
	 *
	 * @param
	 * @return ResponseEntity&ltResponseErrorDto&gt
	 */
	@ExceptionHandler({FileErrorException.class})
	private ResponseEntity<?> handle(HttpServletRequest request, final FileErrorException e) {
		log.info("\nFile Error Log :" + request.getContextPath() + "\n" + e);

		return ResponseEntity
			.status(e.getException().getStatus())
			.body(responseUtil.buildErrorResponse(e.getException().getStatus(), e.getMessage(),
				request.getRequestURI()));
	}

	//	/**
	//	 * Jwt 에러를 핸들링 하기 위한 핸들러 메소드
	//	 *
	//	 * @param
	//	 * @return ResponseEntity&ltResponseErrorDto&gt
	//	 */
	//	@ExceptionHandler({JwtErrorException.class})
	//	private ResponseEntity<?> handle(HttpServletRequest request, final JwtErrorException e) {
	//		log.info("\nJwt Error Log :" + request.getContextPath() + "\n" + e);
	//
	//		return ResponseEntity
	//			.status(e.getException().getStatus())
	//			.body(responseUtil.buildErrorResponse(e.getException().getStatus(), e.getMessage(),
	//				request.getRequestURI()));
	//	}

	/**
	 * Expired Jwt 에러를 핸들링 하기 위한 핸들러 메소드
	 *
	 * @param
	 * @return ResponseEntity&ltResponseErrorDto&gt
	 */
	@ExceptionHandler({ExpiredJwtException.class})
	private ResponseEntity<?> handle(HttpServletRequest request, final ExpiredJwtException e) {
		log.info("\nExpired Jwt Error Log :" + request.getContextPath() + "\n" + e);

		return ResponseEntity
			.status(ApiStatus.INVALID_TOKEN.getStatus())
			.body(responseUtil.buildErrorResponse(ApiStatus.INVALID_TOKEN.getStatus(), e.getMessage(),
				request.getRequestURI()));
	}

	/**
	 * 서버 에러 (HttpStatus 5XX) 대응하기 위한 핸들러 메소드
	 *
	 * @param
	 * @return  ResponseEntity&ltResponseErrorDto&gt
	 */
	@ExceptionHandler({Exception.class})
	protected ResponseEntity<?> handleServerException(HttpServletRequest request, Exception e) {
		log.info("\nServer Error Log :" + request.getContextPath() + "\n" + e);

		return ResponseEntity
			.status(HttpStatus.INTERNAL_SERVER_ERROR)
			.body(responseUtil.buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "알 수 없는 에러입니다.",
				request.getRequestURI()));
	}
}
