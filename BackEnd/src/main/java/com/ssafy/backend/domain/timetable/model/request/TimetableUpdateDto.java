package com.ssafy.backend.domain.timetable.model.request;

import com.ssafy.backend.domain.timetable.entity.TimetableEntity;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@ToString
public class TimetableUpdateDto {

	private String[] days;

	public TimetableEntity toEntity() {
		return TimetableEntity.builder()
				.sun(this.days[0])
				.mon(this.days[1])
				.tue(this.days[2])
				.wed(this.days[3])
				.thr(this.days[4])
				.fri(this.days[5])
				.sat(this.days[6])
				.build();
	}
}
