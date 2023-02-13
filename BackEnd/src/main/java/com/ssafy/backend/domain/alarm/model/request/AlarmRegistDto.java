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
	private int time;
	private Long animalId;

	public AlarmEntity toEntityShelterToUser(UserEntity user, String profileImage) {
		return AlarmEntity.builder()
			.receiver(user)
			.targetName(this.targetName)
			.alarmType(this.alarmType)
			.time(this.time)
			.profileImage(profileImage)
			.build();
	}

	public AlarmEntity toEntityUserToShelter(UserEntity user, String profileImage) {
		return AlarmEntity.builder()
			.receiver(user)
			.targetName(this.targetName)
			.alarmType(this.alarmType)
			.time(this.time)
			.profileImage(profileImage)
			.build();
	}

	public AlarmEntity toEntityAnimalToUser(UserEntity user, String profileImage) {
		return AlarmEntity.builder()
			.receiver(user)
			.targetName(this.targetName)
			.alarmType(this.alarmType)
			.profileImage(profileImage)
			.build();
	}
}
