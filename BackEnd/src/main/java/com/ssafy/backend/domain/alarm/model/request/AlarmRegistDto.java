package com.ssafy.backend.domain.alarm.model.request;

import com.ssafy.backend.domain.alarm.entity.AlarmEntity;
import com.ssafy.backend.domain.member.entity.UserEntity;

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
public class AlarmRegistDto {

	private Long receiverId;
	private String targetName;
	private int alarmType;
	private String day;
	private int time;
	private Long animalId;

	public AlarmEntity toEntityShelterToUser(UserEntity user) {
		return AlarmEntity.builder()
			.receiver(user)
			.targetName(this.targetName)
			.alarmType(this.alarmType)
			.day(this.day)
			.time(this.time)
			.build();
	}

	public AlarmEntity toEntityUserToShelter(UserEntity user) {
		return AlarmEntity.builder()
			.receiver(user)
			.targetName(this.targetName)
			.alarmType(this.alarmType)
			.day(this.day)
			.time(this.time)
			.build();
	}

	public AlarmEntity toEntityAnimalToUser(UserEntity user) {
		return AlarmEntity.builder()
			.receiver(user)
			.targetName(this.targetName)
			.alarmType(this.alarmType)
			.build();
	}
}
