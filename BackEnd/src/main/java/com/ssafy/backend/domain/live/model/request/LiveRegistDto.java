package com.ssafy.backend.domain.live.model.request;

import com.ssafy.backend.domain.live.entity.LiveEntity;
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
public class LiveRegistDto {

	private String title;
	private String category;
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