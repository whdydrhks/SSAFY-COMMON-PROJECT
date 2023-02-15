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
public class UserUpdateDto {

	// user
	private String name;
	private String phoneNumber;
	private String nickname;

	private int profileImage;

	public UserEntity toEntity() {

		return UserEntity.builder()
			.name(this.name)
			.phoneNumber(this.phoneNumber)
			.nickname(this.nickname)
			.profileImage(this.profileImage)
			.build();
	}

	public UserEntity updateEntity(UserEntity entity) {

		return UserEntity.builder()
			.id(entity.getId())
			.email(entity.getEmail())
			.password(entity.getPassword())
			.role(entity.getRole())
			.name(this.getName())
			.phoneNumber(this.getPhoneNumber())
			.nickname(this.getNickname())
			.profileImage(this.getProfileImage())
			.expired(entity.getExpired())
			.createdDate(entity.getCreatedDate())
			.build();
	}
}
