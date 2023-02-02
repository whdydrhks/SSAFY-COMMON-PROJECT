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

import com.ssafy.backend.global.auth.CustomAccessDeniedHandler;
import com.ssafy.backend.global.auth.CustomAuthenticationEntryPoint;
import com.ssafy.backend.global.auth.JwtRequestFilter;

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
			.antMatchers("/api/v1/user/login").permitAll()
			.antMatchers("/api/v1/user").permitAll()
			.antMatchers("/test/user").hasRole("USER")
			.antMatchers("/test/admin").hasRole("ADMIN")
			.anyRequest().authenticated();

		http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}

	@Bean
	public WebSecurityCustomizer webSecurityCustomizer() {
		return (web) -> web.ignoring().antMatchers("/v2/api-docs", "/swagger-resources/**",
			"/swagger-ui.html", "/webjars/**", "/swagger/**");
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
