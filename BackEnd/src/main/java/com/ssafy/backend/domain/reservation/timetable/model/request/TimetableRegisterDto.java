package com.ssafy.backend.domain.reservation.timetable.model.request;

import com.ssafy.backend.domain.reservation.timetable.entity.TimetableEntity;
import com.ssafy.backend.domain.reservation.timetable.model.TimetableDto;
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
public class TimetableRegisterDto {
	private Long timetableId;
	private ShelterEntity shelterId;
	private String mon;
	private String tue;
	private String wed;
	private String thr;
	private String fri;
	private String sat;
	private String sun;

	public static TimetableDto of(TimetableEntity timetable) {
		return TimetableDto.builder()
			.timetableId(timetable.getId())
			.shelterId(timetable.getShelterId())
			.mon(timetable.getMon())
			.tue(timetable.getTue())
			.wed(timetable.getWed())
			.thr(timetable.getThr())
			.fri(timetable.getFri())
			.sat(timetable.getSat())
			.sun(timetable.getSun())
			.build();
	}

	public TimetableEntity toEntity() {
		return TimetableEntity.builder()
			.id(this.timetableId)
			.shelterId(this.shelterId)
			.mon(this.mon)
			.tue(this.tue)
			.wed(this.wed)
			.thr(this.thr)
			.fri(this.fri)
			.sat(this.sat)
			.sun(this.sun)
			.build();
	}
}
