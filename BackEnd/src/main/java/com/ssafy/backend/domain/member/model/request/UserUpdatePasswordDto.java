package com.ssafy.backend.domain.member.model.request;

import io.swagger.annotations.ApiParam;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class UserUpdatePasswordDto {

	@ApiParam(name = "현재 비밀번호")
	private String curPassword;
	@ApiParam(name = "새로운 비밀번호")
	private String newPassword;

}
