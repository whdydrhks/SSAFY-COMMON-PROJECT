package com.ssafy.backend.domain.schedule.model.response;

import com.ssafy.backend.domain.member.entity.UserEntity;
import com.ssafy.backend.domain.schedule.entity.ScheduleEntity;
import com.ssafy.backend.domain.schedule.model.ScheduleDto;
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
public class ScheduleInfoDto {
	private Long scheduleId;
	private Long shelterId;
	private String shelterNickname;
	private Long userId;
	private String userNickname;
	private String day;
	// private int state;
	private int time;
	private int userProfileImage;
	private String room;

	public static ScheduleInfoDto of(ScheduleEntity schedule) {
		return ScheduleInfoDto.builder()
				.scheduleId(schedule.getId())
				.shelterId(schedule.getShelter().getId())
				.shelterNickname(schedule.getShelter().getName())
				.userId(schedule.getUser().getId())
				.userNickname(schedule.getUser().getNickname())
				.day(schedule.getDay())
				// .state(schedule.getState())
				.time(schedule.getTime())
				.room(schedule.getRoom())
				.userProfileImage(schedule.getUser().getProfileImage())
				.build();
	}

//	public ScheduleEntity toEntity() {
//		return ScheduleEntity.builder()
//				.id(this.scheduleId)
//				.shelter(this.toEntity().getShelter())
//				.user(this.toEntity().getUser())
//				.day(this.day)
//				// .state(this.state)
//				.time(this.time)
//				.room(this.room)
//				.build();
//	}
}