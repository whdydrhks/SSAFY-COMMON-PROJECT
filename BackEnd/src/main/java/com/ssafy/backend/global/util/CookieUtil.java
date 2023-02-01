package com.ssafy.backend.global.util;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class CookieUtil {

	@Value("${jwt.validity-second.access}")
	private long TOKEN_VALIDATION_SECOND;

	public Cookie createCookie(String cookieName, String value) {
		Cookie token = new Cookie(cookieName, value);
		token.setMaxAge((int)TOKEN_VALIDATION_SECOND);
		token.setPath("/");
		token.setSecure(true);
		token.setHttpOnly(true);
		return token;
	}

	public Cookie getCookie(HttpServletRequest req, String cookieName) {
		final Cookie[] cookies = req.getCookies();
		if (cookies == null) {
			return null;
		}
		for (Cookie cookie : cookies) {
			if (cookie.getName().equals(cookieName)) {
				return cookie;
			}
		}
		return null;
	}

}