package com.ssafy.backend.domain.member.model.response;

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
public class UserInfoDto {

	// user
	private String email;
	private String name;
	private String phoneNumber;
	private String nickname;
	private String profileImage;

	private LocalDateTime createdDate;
	private LocalDateTime updatedDate;

	public static UserInfoDto of(UserEntity user) {
		return UserInfoDto.builder()
			.email(user.getEmail())
			.name(user.getName())
			.phoneNumber(user.getPhoneNumber())
			.nickname(user.getNickname())
			.profileImage(user.getProfileImage())
			.createdDate(user.getCreatedDate())
			.updatedDate(user.getUpdatedDate())
			.build();
	}

	public UserEntity toEntity() {
		return UserEntity.builder()
			.email(this.email)
			.name(this.name)
			.phoneNumber(this.phoneNumber)
			.nickname(this.nickname)
			.profileImage(this.profileImage)
			.createdDate(this.createdDate)
			.updatedDate(this.updatedDate)
			.build();
	}
}
