package com.ssafy.backend.domain.reservation.schedule.model.request;

import com.ssafy.backend.domain.member.entity.UserEntity;
import com.ssafy.backend.domain.reservation.schedule.entity.ScheduleEntity;
import com.ssafy.backend.domain.reservation.schedule.model.ScheduleDto;
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
public class ScheduleRegisterDto {
	private String shelterNickname;
	private String day;
	private int time;

	public ScheduleEntity toEntity(UserEntity user, ShelterEntity shelter, String room) {
		return ScheduleEntity.builder()
				.user(user)
				.shelter(shelter)
				.day(this.day)
				.time(this.time)
				.room(room)
				.build();
	}
}