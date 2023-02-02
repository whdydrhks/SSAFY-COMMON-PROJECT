package com.ssafy.backend.global.auth;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.backend.global.common.model.ResponseDto;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

	@Override
	public void commence(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
		AuthenticationException e) throws IOException, ServletException {
		ObjectMapper objectMapper = new ObjectMapper();

		httpServletResponse.setStatus(200);
		httpServletResponse.setContentType("application/json;charset=utf-8");
		ResponseDto response = new ResponseDto("Authentication Error", "로그인이 되지 않은 사용자입니다.", null);
		String jsonResponse = objectMapper.writeValueAsString(response);
		log.info(jsonResponse);
	}

}