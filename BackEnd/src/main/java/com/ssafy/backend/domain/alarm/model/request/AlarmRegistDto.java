package com.ssafy.backend.domain.alarm.model.request;

import com.ssafy.backend.domain.alarm.entity.AlarmEntity;
import com.ssafy.backend.domain.member.entity.UserEntity;

import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiParam;
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

	@ApiParam(name = "사용자(수신자) 식별 번호")
	private Long receiverId;
	@ApiParam(name = "발신자 이름")
	private String targetName;
	@ApiParam(name = "알람 타입")
	private int alarmType;
	@ApiParam(name = "알람 일자")
	@ApiModelProperty(example = "0215")
	private String day;
	@ApiParam(name = "알람 시간")
	@ApiModelProperty(example = "12")
	private int time;
	@ApiParam(name = "동물 식별 번호")
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
