package com.ssafy.backend.domain.member.model.request;

import com.ssafy.backend.domain.member.entity.UserEntity;

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

	private String email;
	private String password;
	private String name;
	private String phoneNumber;
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
