package com.ssafy.backend.domain.member.model;

import java.time.LocalDateTime;

import com.ssafy.backend.domain.member.entity.UserEntity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class UserDto {

	// user
	private Long userId;
	private String email;
	private String password;
	private String role;
	private String name;
	private String phoneNumber;
	private String nickname;
	private String expired;

	private LocalDateTime createdDate;
	private LocalDateTime updatedDate;

	public static UserDto of(UserEntity user) {

		return UserDto.builder()
			.role(user.getRole())
			.userId(user.getId())
			.email(user.getEmail())
			.password(user.getPassword())
			.name(user.getName())
			.phoneNumber(user.getPhoneNumber())
			.nickname(user.getNickname())
			.expired(user.getExpired())
			.createdDate(user.getCreatedDate())
			.updatedDate(user.getCreatedDate())
			.build();
	}

	public UserEntity toEntity() {

		return UserEntity.builder()
			.id(this.userId)
			.email(this.email)
			.password(this.password)
			.name(this.name)
			.phoneNumber(this.phoneNumber)
			.nickname(this.nickname)
			.expired(this.expired)
			.createdDate(this.createdDate)
			.updatedDate(this.createdDate)
			.build();
	}
}
