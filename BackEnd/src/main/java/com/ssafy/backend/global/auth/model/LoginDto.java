package com.ssafy.backend.global.auth.model;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

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
public class LoginDto {

	@Email
	private String email;

	@NotNull
	private String password;

	public static LoginDto of(UserEntity user) {
		return LoginDto.builder()
			.email(user.getEmail())
			.password(user.getPassword())
			.build();
	}

	public UserEntity toEntity() {
		return UserEntity.builder()
			.email(this.email)
			.password(this.password)
			.build();
	}
}