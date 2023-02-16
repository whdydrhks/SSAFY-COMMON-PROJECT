package com.ssafy.backend.domain.member.model.request;

import com.ssafy.backend.domain.member.entity.UserEntity;

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
public class UserRegisterDto {

	@ApiParam(name = "이메일")
	private String email;
	@ApiParam(name = "비밀번호")
	private String password;
	@ApiParam(name = "이름")
	private String name;
	@ApiParam(name = "전화번호")
	private String phoneNumber;
	@ApiParam(name = "닉네임")
	private String nickname;

	public UserEntity toEntity() {

		return UserEntity.builder()
			.email(this.email)
			.password(this.password)
			.name(this.name)
			.phoneNumber(this.phoneNumber)
			.nickname(this.nickname)
			.build();
	}
}
