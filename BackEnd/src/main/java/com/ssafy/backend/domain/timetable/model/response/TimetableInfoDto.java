package com.ssafy.backend.domain.timetable.model.response;

import com.ssafy.backend.domain.timetable.entity.TimetableEntity;
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
public class TimetableInfoDto extends BaseTimeDto {

	private Long timetableId;
	private String mon;
	private String tue;
	private String wed;
	private String thr;
	private String fri;
	private String sat;
	private String sun;

	private Long shelterId;
	private String shelterName;

	public static TimetableInfoDto of(TimetableEntity timetable) {
		return TimetableInfoDto.builder()
			.timetableId(timetable.getId())
			.mon(timetable.getMon())
			.tue(timetable.getTue())
			.wed(timetable.getWed())
			.thr(timetable.getThr())
			.fri(timetable.getFri())
			.sat(timetable.getSat())
			.sun(timetable.getSun())
			.shelterId(timetable.getShelter().getId())
			.shelterName(timetable.getShelter().getName())
			.createdDate(timetable.getCreatedDate())
			.updatedDate(timetable.getUpdatedDate())
			.build();
	}
}
