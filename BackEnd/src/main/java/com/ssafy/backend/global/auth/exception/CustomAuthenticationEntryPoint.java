package com.ssafy.backend.global.auth.exception;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {
	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
		AuthenticationException authException) throws IOException, ServletException {

		String msg = new ObjectMapper().writeValueAsString("로그인 되지 않은 사용자");

		log.info(msg);
		log.info("request URI : " + request.getRequestURL());
		response.getWriter().write(msg);
		response.sendError(HttpServletResponse.SC_UNAUTHORIZED, msg);

	}

}