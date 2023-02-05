package com.ssafy.backend.global.auth.exception;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {
	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
		AuthenticationException authException) throws IOException, ServletException {

		//		String msg = new ObjectMapper().writeValueAsString("로그인 되지 않은 사용자");
		//
		//		log.info(msg);
		//		log.info("request URI : " + request.getRequestURL());
		//		response.getWriter().write(msg);
		//		response.sendError(HttpServletResponse.SC_UNAUTHORIZED, msg);

		// Security에서 처리하는 객체라 dispatcher servlet이 잡아내지 못한다
		//		throw new ApiErrorException(ApiStatus.UNAUTHORIZED);

		// rest api 에러를 컨트롤러 처리하는 곳을 만들어 리다이렉트로 념겨주는 것으로 해결
		response.sendRedirect("/error/401");
	}

}