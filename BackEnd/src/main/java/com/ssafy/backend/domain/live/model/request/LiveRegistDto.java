package com.ssafy.backend.domain.live.model.request;

import com.ssafy.backend.domain.live.entity.LiveEntity;
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
public class LiveRegistDto {

	@ApiParam(name = "방 제목")
	private String title;
	@ApiParam(name = "방 분류")
	private String category;
	@ApiParam(name = "openvidu token 정보")
	private String room;

	public LiveEntity toEntity(ShelterEntity shelter) {
		return LiveEntity.builder()
			.shelter(shelter)
			.title(this.title)
			.category(this.category)
			.room(this.room)
			.build();
	}
}