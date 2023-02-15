package com.ssafy.backend.domain.member.model.response;

import com.ssafy.backend.domain.member.entity.UserEntity;

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
public class UserHostInfoDto extends UserInfoDto {

	// shelter
	private Long shelterId;
	private String shelterName;

	public static UserHostInfoDto of(UserEntity user) {
		return UserHostInfoDto.builder()
			.shelterId(user.getShelter().getId())
			.shelterName(user.getShelter().getName())
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

	//	public static UserHostInfoDto of(UserEntity user, String thumnailImage) {
	//		return UserHostInfoDto.builder()
	//			.shelterId(user.getShelter().getId())
	//			.shelterName(user.getShelter().getName())
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
