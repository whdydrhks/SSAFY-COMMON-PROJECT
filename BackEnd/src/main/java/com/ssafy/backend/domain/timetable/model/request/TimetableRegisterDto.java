package com.ssafy.backend.domain.timetable.model.request;

import com.ssafy.backend.domain.shelter.entity.ShelterEntity;
import com.ssafy.backend.domain.timetable.entity.TimetableEntity;

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

	private String[] dayString;

	public TimetableEntity toEntity(ShelterEntity shelter) {
		return TimetableEntity.builder()
			.shelter(shelter)
			.sun(this.dayString[0])
			.mon(this.dayString[1])
			.tue(this.dayString[2])
			.wed(this.dayString[3])
			.thr(this.dayString[4])
			.fri(this.dayString[5])
			.sat(this.dayString[6])
			.build();
	}
}
