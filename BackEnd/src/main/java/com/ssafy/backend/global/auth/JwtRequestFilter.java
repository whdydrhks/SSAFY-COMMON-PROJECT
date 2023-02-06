package com.ssafy.backend.global.auth;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.ssafy.backend.global.auth.model.PrincipalDetails;
import com.ssafy.backend.global.auth.service.CustomUserDetailsService;
import com.ssafy.backend.global.util.CookieUtil;
import com.ssafy.backend.global.util.JwtUtil;
import com.ssafy.backend.global.util.RedisUtil;

import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtRequestFilter extends OncePerRequestFilter {

	private final JwtUtil jwtUtil;
	private final CookieUtil cookieUtil;
	private final RedisUtil redisUtil;

	private final CustomUserDetailsService customUserDetailsService;

	@Override
	protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
		FilterChain filterChain) throws ServletException, IOException {

		String accessJwt = null;
		String accessEmail = null;
		String refreshJwt = null;
		String refreshEmail = null;

		//		Cookie accessToken = cookieUtil.getCookie(httpServletRequest, jwtUtil.ACCESS_TOKEN);

		String accessToken = httpServletRequest.getHeader(HttpHeaders.AUTHORIZATION);

		try {
			if (accessToken != null) {
				accessJwt = accessToken;

				//accessJwt = accessToken.getValue();
				accessEmail = jwtUtil.getValue(accessJwt, jwtUtil.USER_EMAIL);
			}
			if (accessEmail != null) {
				PrincipalDetails userDetails = (PrincipalDetails)customUserDetailsService
					.loadUserByUsername(accessEmail);

				if (jwtUtil.validateToken(accessJwt, userDetails)) {
					UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
						userDetails, null, userDetails.getAuthorities());

					usernamePasswordAuthenticationToken
						.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpServletRequest));
					SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
				}
			}
		} catch (ExpiredJwtException e) {
			Cookie refreshToken = cookieUtil.getCookie(httpServletRequest, jwtUtil.REFRESH_TOKEN);
			if (refreshToken != null) {
				refreshJwt = refreshToken.getValue();
			}
		} catch (Exception e) {

		}

		try {
			if (refreshJwt != null) {
				refreshEmail = jwtUtil.getValue(refreshJwt, jwtUtil.USER_EMAIL);
				String serverJwt = redisUtil.getData(refreshEmail);

				if (refreshEmail.equals(jwtUtil.getValue(serverJwt, jwtUtil.REFRESH_TOKEN))) {
					PrincipalDetails userDetails = (PrincipalDetails)customUserDetailsService
						.loadUserByUsername(refreshEmail);

					UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
						userDetails, null, userDetails.getAuthorities());

					usernamePasswordAuthenticationToken
						.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpServletRequest));
					SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);

					String newToken = jwtUtil.createAccessToken(userDetails.getUser());

					//	Cookie newAccessToken = cookieUtil.createCookie(jwtUtil.ACCESS_TOKEN, newToken);
					//	httpServletResponse.addCookie(newAccessToken);
					httpServletResponse.setHeader(HttpHeaders.AUTHORIZATION, newToken);
				}
			}
		} catch (ExpiredJwtException e) {

		}

		filterChain.doFilter(httpServletRequest, httpServletResponse);
	}
}