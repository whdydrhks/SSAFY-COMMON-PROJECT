package com.ssafy.backend.domain.shelter.model.response;

import java.time.LocalDateTime;

import com.ssafy.backend.domain.shelter.entity.ShelterEntity;
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
public class ShelterInfoDto extends BaseTimeDto {

	private Long shelterId;
	private String name;
	private String url;
	private String introduce;
	private String telNumber;
	private String postCode;
	private String address;

	private LocalDateTime createdDate;
	private LocalDateTime updatedDate;

	public static ShelterInfoDto of(ShelterEntity shelter) {

		return ShelterInfoDto.builder()
			.shelterId(shelter.getId())
			.name(shelter.getName())
			.url(shelter.getUrl())
			.introduce(shelter.getIntroduce())
			.telNumber(shelter.getTelNumber())
			.postCode(shelter.getPostCode())
			.address(shelter.getAddress())
			.createdDate(shelter.getCreatedDate())
			.updatedDate(shelter.getUpdatedDate())
			.build();
	}
}
