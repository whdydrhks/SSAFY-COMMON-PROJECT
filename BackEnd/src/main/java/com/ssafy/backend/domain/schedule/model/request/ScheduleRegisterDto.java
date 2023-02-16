package com.ssafy.backend.domain.schedule.model.request;

import com.ssafy.backend.domain.member.entity.UserEntity;
import com.ssafy.backend.domain.schedule.entity.ScheduleEntity;
import com.ssafy.backend.domain.shelter.entity.ShelterEntity;

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
public class ScheduleRegisterDto {

	@ApiParam(name = "보호소 이름")
	private String shelterNickname;
	@ApiParam(name = "예약 일자")
	@ApiModelProperty(example = "0215")
	private String day;
	@ApiParam(name = "예약 시간")
	@ApiModelProperty(example = "12")
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