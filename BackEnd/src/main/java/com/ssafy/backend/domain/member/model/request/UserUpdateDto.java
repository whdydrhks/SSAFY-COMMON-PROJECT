package com.ssafy.backend.domain.member.model.request;

import java.time.LocalDateTime;

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
public class UserUpdateDto {

	// user
	private String password;
	private String name;
	private String phoneNumber;
	private String nickname;

	private LocalDateTime createdDate;
	private LocalDateTime updatedDate;

	public static UserUpdateDto of(UserEntity user) {
		return UserUpdateDto.builder()
			.password(user.getPassword())
			.name(user.getName())
			.phoneNumber(user.getPhoneNumber())
			.nickname(user.getNickname())
			.createdDate(user.getCreatedDate())
			.updatedDate(user.getCreatedDate())
			.build();
	}

	public UserEntity toEntity() {
		return UserEntity.builder()
			.password(this.password)
			.name(this.name)
			.phoneNumber(this.phoneNumber)
			.nickname(this.nickname)
			.createdDate(this.createdDate)
			.updatedDate(this.createdDate)
			.build();
	}
}
