package com.ssafy.backend.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.ssafy.backend.global.auth.JwtRequestFilter;
import com.ssafy.backend.global.auth.exception.CustomAccessDeniedHandler;
import com.ssafy.backend.global.auth.exception.CustomAuthenticationEntryPoint;
import com.ssafy.backend.global.util.enums.Role;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

	private final JwtRequestFilter jwtRequestFilter;

	private final CustomAccessDeniedHandler customAccessDeniedHandler;
	private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.csrf().disable();
		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			.and()
			.httpBasic()
			.and()
			.exceptionHandling()
			.accessDeniedHandler(customAccessDeniedHandler)
			.authenticationEntryPoint(customAuthenticationEntryPoint)
			.and()
			.authorizeRequests()
			.antMatchers(HttpMethod.OPTIONS, "/**/*").permitAll()
			.antMatchers("/").permitAll() // swagger csrf 엔드포인트 오류를 지우기 위함 1
			.antMatchers("/csrf").permitAll() // swagger csrf 엔드포인트 오류를 지우기 위함 2
			.antMatchers("/error/*").permitAll()
			.antMatchers("/*/auth/**").permitAll()
			.antMatchers("/*/user", "/*/user/**").permitAll() // 추후 유저 권한 이상으로 향상 시켜야 할 것
			.antMatchers("/*/shelter", "/*/shelter/**").permitAll() // 추후 유저 권한 이상으로 향상 시켜야 할 것
			.antMatchers("/*/live", "/*/live/**").permitAll()
			.antMatchers("/*/alarm", "/*/alarm/**").permitAll()
			.antMatchers("/*/like/**").permitAll()
			.antMatchers("/*/file/**").permitAll()
			.antMatchers("/*/timetable/**").permitAll()
			.antMatchers("/*/schedule/**").permitAll()
			.antMatchers("/*/openvidu/**").permitAll()
			.antMatchers("/test/user").hasAnyRole(Role.USER.getHighRoles())
			.antMatchers("/test/admin").hasAnyRole(Role.ADMIN.getHighRoles())
			.anyRequest().authenticated();

		http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}

	@Bean
	public WebSecurityCustomizer webSecurityCustomizer() {
		return (web) -> web.ignoring().antMatchers(
			"/v2/api-docs",
			"/swagger-resources/**",
			"/swagger-ui.html",
			"/webjars/**",
			"/swagger/**");
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
		throws Exception {
		return authenticationConfiguration.getAuthenticationManager();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return PasswordEncoderFactories.createDelegatingPasswordEncoder();
	}

}