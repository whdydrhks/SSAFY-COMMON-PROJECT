package com.ssafy.backend.domain.shelter.model;

import java.time.LocalDateTime;

import com.ssafy.backend.domain.shelter.entity.ShelterEntity;

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
public class ShelterDto {

	// shelter
	private Long shelterId;
	private String name;
	private String url;
	private String introduce;
	private String telNumber;
	private String postCode;
	private String address;
	private String expired;

	private LocalDateTime createdDate;
	private LocalDateTime updatedDate;

	public static ShelterDto of(ShelterEntity shelter) {

		return ShelterDto.builder()
			.shelterId(shelter.getId())
			.name(shelter.getName())
			.url(shelter.getUrl())
			.introduce(shelter.getIntroduce())
			.telNumber(shelter.getTelNumber())
			.postCode(shelter.getPostCode())
			.address(shelter.getAddress())
			.expired(shelter.getExpired())
			.createdDate(shelter.getCreatedDate())
			.updatedDate(shelter.getUpdatedDate())
			.build();
	}

	public ShelterEntity toEntity() {

		return ShelterEntity.builder()
			.id(this.shelterId)
			.name(this.name)
			.url(this.url)
			.introduce(this.introduce)
			.telNumber(this.telNumber)
			.postCode(this.postCode)
			.address(this.address)
			.expired(this.expired)
			.createdDate(this.createdDate)
			.updatedDate(this.updatedDate)
			.build();
	}
}
