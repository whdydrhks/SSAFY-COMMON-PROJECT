package com.ssafy.backend.global.error.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.backend.global.error.exception.ApiErrorException;
import com.ssafy.backend.global.util.enums.ApiStatus;

import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@Api(tags = "ErrorController")
@RequestMapping("/error")
public class ErrorController {

	@GetMapping("/401")
	public void redirectUnauthorized(HttpServletRequest request) {
		throw new ApiErrorException(ApiStatus.UNAUTHORIZED);
	}

	@GetMapping("/403")
	public void redirectForbidden(HttpServletRequest request) {
		throw new ApiErrorException(ApiStatus.FORBIDDEN);
	}

}
