package com.ssafy.backend.domain.shelter.model.response;

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
public class ShelterInfoDto {

	private Long shelterId;
	private String name;
	private String url;
	private String introduce;
	private String originImage;
	private String storedImage;
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
			.introduce(shelter.getOriginImage())
			.originImage(shelter.getOriginImage())
			.storedImage(shelter.getStoredImage())
			.telNumber(shelter.getTelNumber())
			.postCode(shelter.getPostCode())
			.address(shelter.getAddress())
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
			.originImage(this.originImage)
			.storedImage(this.storedImage)
			.telNumber(this.telNumber)
			.postCode(this.postCode)
			.address(this.address)
			.createdDate(this.createdDate)
			.updatedDate(this.updatedDate)
			.build();
	}
}
