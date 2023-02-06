package com.ssafy.backend.global.config;

import java.util.Arrays;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.google.common.base.Predicate;
import com.google.common.base.Predicates;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.ApiKey;
import springfox.documentation.service.AuthorizationScope;
import springfox.documentation.service.SecurityReference;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

	private static final String API_NAME = "B209 Project API";
	private static final String API_VERSION = "0.0.1";
	private static final String API_DESCRIPTION = "B209팀 공통 프로젝트 API 명세서";

	@Bean
	public Docket allApi() {
		return buildDocket("_전체_", Predicates.or(
			PathSelectors.regex("/*.*")));
	}

	@Bean
	public Docket AuthApi() {
		String version = "v1";
		return buildDocket("인증 " + version, Predicates.or(
			PathSelectors.regex("/api/" + version + "/auth.*")));
	}

	@Bean
	public Docket UserApi() {
		String version = "v1";
		return buildDocket("사용자 " + version, Predicates.or(
			PathSelectors.regex("/api/" + version + "/user.*")));
	}

	@Bean
	public Docket shelterApi() {
		String version = "v1";
		return buildDocket("보호소 " + version, Predicates.or(
			PathSelectors.regex("/" + version + "/shelter.*")));
	}

	public Docket buildDocket(String groupName, Predicate<String> predicates) {
		return new Docket(DocumentationType.SWAGGER_2)
			.apiInfo(apiInfo()) // API 문서에 대한 설명
			.securityContexts(Arrays.asList(securityContext())) // swagger에서 jwt 토큰값 넣기위한 설정 1
			.securitySchemes(Arrays.asList(apiKey())) // swagger에서 jwt 토큰값 넣기위한 설정 2
			.groupName(groupName)
			.select()
			.paths(predicates)
			.apis(RequestHandlerSelectors.any())
			.paths(PathSelectors.any())
			.build();
	}

	public ApiInfo apiInfo() {
		return new ApiInfoBuilder()
			.title(API_NAME)
			.version(API_VERSION)
			.description(API_DESCRIPTION)
			//.license("license")
			//.licenseUrl("license URL")
			.build();
	}

	// swagger에서 jwt 토큰값 넣기위한 설정
	private ApiKey apiKey() {
		return new ApiKey("JWT", "Authorization", "header"); // <type> : JWT
		// return new ApiKey("Bearer", "Authorization", "header"); // <type> : Bearer
	}

	private SecurityContext securityContext() {
		return SecurityContext.builder().securityReferences(defaultAuth()).build();
	}

	private List<SecurityReference> defaultAuth() {
		AuthorizationScope authorizationScope = new AuthorizationScope("global", "accessEverything");
		AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
		authorizationScopes[0] = authorizationScope;
		return Arrays.asList(new SecurityReference("JWT", authorizationScopes));
	}
}
