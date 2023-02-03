package com.ssafy.backend.global.auth.exception;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class CustomAccessDeniedHandler implements AccessDeniedHandler {

	@Override
	public void handle(HttpServletRequest request, HttpServletResponse response,
		AccessDeniedException accessDeniedException) throws IOException, ServletException {

		String msg = new ObjectMapper().writeValueAsString("권한이 없는 사용자");

		log.info(msg);
		log.info("request URI : " + request.getRequestURL());
		response.getWriter().write(msg);
		response.sendError(HttpServletResponse.SC_FORBIDDEN, msg);
	}

}
