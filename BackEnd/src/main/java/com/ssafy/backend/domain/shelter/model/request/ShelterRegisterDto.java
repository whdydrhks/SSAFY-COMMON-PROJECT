package com.ssafy.backend.domain.shelter.model.request;

import com.ssafy.backend.domain.shelter.entity.ShelterEntity;

import io.swagger.annotations.ApiParam;
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
public class ShelterRegisterDto {

	@ApiParam(name = "보호소 이름")
	private String name;
	@ApiParam(name = "홈페이지 주소")
	private String url;
	@ApiParam(name = "소개")
	private String introduce;
	@ApiParam(name = "전화번호")
	private String telNumber;
	@ApiParam(name = "우편번호")
	private String postCode;
	@ApiParam(name = "지명주소")
	private String address;

	public ShelterEntity toEntity() {

		return ShelterEntity.builder()
			.name(this.name)
			.url(this.url)
			.introduce(this.introduce)
			.telNumber(this.telNumber)
			.postCode(this.postCode)
			.address(this.address)
			.build();
	}
}
