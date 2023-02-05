package com.ssafy.backend.global.auth.exception;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

@Component
public class CustomAccessDeniedHandler implements AccessDeniedHandler {

	@Override
	public void handle(HttpServletRequest request, HttpServletResponse response,
		AccessDeniedException accessDeniedException) throws IOException, ServletException {

		//		String msg = new ObjectMapper().writeValueAsString("권한이 없는 사용자");
		//
		//		log.info(msg);
		//		log.info("request URI : " + request.getRequestURL());
		//		response.getWriter().write(msg);
		//		response.sendError(HttpServletResponse.SC_FORBIDDEN, msg);

		// Security에서 처리하는 객체라 dispatcher servlet이 잡아내지 못한다
		//		throw new ApiErrorException(ApiStatus.FORBIDDEN);

		// rest api 에러를 컨트롤러 처리하는 곳을 만들어 리다이렉트로 념겨주는 것으로 해결
		response.sendRedirect("/error/403");
	}

}
