package com.ssafy.backend.global.util;

import java.util.Arrays;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;

@Service
public class CookieUtil {

	@Value("${jwt.validity-second.refresh}")
	private long TOKEN_VALIDATION_SECOND;

	// 쿠키를 생성하는 메소드
	public Cookie createCookie(String cookieName, String value) {

		Cookie cookie = new Cookie(cookieName, value);
		cookie.setMaxAge((int)TOKEN_VALIDATION_SECOND);
		cookie.setPath("/");
		cookie.setSecure(true);
		cookie.setHttpOnly(false);

		return cookie;
	}

	// 쿠키를 제거하는 메소드. MaxAge를 10으로 만들어서 쿠키를 만료시킨다.
	public Cookie deleteCookie(Cookie cookie) {
		cookie.setMaxAge(10);

		return cookie;
	}

	// 쿠키를 가져오는 메소드
	public Cookie getCookie(HttpServletRequest request, String cookieName) {

		final Cookie[] cookies = request.getCookies();

		if (cookies == null) {
			return null;
		}

		return Arrays.asList(request.getCookies())
			.stream()
			.filter(cookie -> cookie.getName().equals(cookieName))
			.findAny()
			.orElse(null);
	}

	// Cookie to ResponseCookie
	public ResponseCookie toResponseCookie(Cookie cookie) {
		return ResponseCookie.from(cookie.getName(), cookie.getValue())
			.maxAge(cookie.getMaxAge())
			.path(cookie.getPath())
			.secure(cookie.getSecure())
			.httpOnly(cookie.isHttpOnly())
			.sameSite("none")
			.build();
	}

	// ResponseCookie to Cookie
	public Cookie toCookie(ResponseCookie rcookie) {

		Cookie cookie = new Cookie(rcookie.getName(), rcookie.getValue());
		cookie.setMaxAge((int)rcookie.getMaxAge().getSeconds());
		cookie.setPath(rcookie.getPath());
		cookie.setSecure(rcookie.isSecure());
		cookie.setHttpOnly(rcookie.isHttpOnly());

		return cookie;
	}

}