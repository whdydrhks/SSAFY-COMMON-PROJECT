package com.ssafy.backend.domain.member.model.response;

import com.ssafy.backend.domain.member.entity.UserEntity;
import com.ssafy.backend.global.common.model.BaseTimeDto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class UserInfoDto extends BaseTimeDto {

	// user
	private Long userId;
	private String email;
	private String name;
	private String phoneNumber;
	private String nickname;

	//	private String thumnailImage;
	private int profileImage;

	public static UserInfoDto of(UserEntity user) {
		return UserInfoDto.builder()
			.userId(user.getId())
			.email(user.getEmail())
			.name(user.getName())
			.phoneNumber(user.getPhoneNumber())
			.nickname(user.getNickname())
			.profileImage(user.getProfileImage())
			.createdDate(user.getCreatedDate())
			.updatedDate(user.getUpdatedDate())
			.build();
	}

	//	public static UserInfoDto of(UserEntity user, String thumnailImage) {
	//		return UserInfoDto.builder()
	//			.userId(user.getId())
	//			.email(user.getEmail())
	//			.name(user.getName())
	//			.phoneNumber(user.getPhoneNumber())
	//			.nickname(user.getNickname())
	//			//.thumnailImage(thumnailImage)
	//			.profileImage(thumnailImage)
	//			.createdDate(user.getCreatedDate())
	//			.updatedDate(user.getUpdatedDate())
	//			.build();
	//	}
}
