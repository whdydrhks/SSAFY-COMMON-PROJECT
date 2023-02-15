package com.ssafy.backend.domain.live.model.response;

import java.time.LocalDateTime;

import com.ssafy.backend.domain.live.entity.LiveEntity;

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
public class LiveInfoDto {

	private Long liveId;
	private Long shelterId;
	private String shelterName;
	private String title;
	private String category;
	private String room;

	private String thumnailImage;

	private LocalDateTime createdDate;

	public static LiveInfoDto of(LiveEntity live) {
		return LiveInfoDto.builder()
			.liveId(live.getId())
			.shelterId(live.getShelter().getId())
			.shelterName((live.getShelter().getName()))
			.title(live.getTitle())
			.category(live.getCategory())
			.room(live.getRoom())
			.thumnailImage("null")
			.createdDate(live.getCreatedDate())
			.build();
	}

	public static LiveInfoDto of(LiveEntity live, String thumnailImage) {
		return LiveInfoDto.builder()
			.liveId(live.getId())
			.shelterId(live.getShelter().getId())
			.shelterName((live.getShelter().getName()))
			.title(live.getTitle())
			.category(live.getCategory())
			.room(live.getRoom())
			.thumnailImage(thumnailImage)
			.createdDate(live.getCreatedDate())
			.build();
	}

}
