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
public class UserLoginDto {

	private String email;
	private String password;

	public static UserLoginDto of(UserEntity user) {
		return UserLoginDto.builder()
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