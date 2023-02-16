package com.ssafy.backend.domain.schedule.model.request;

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
public class ScheduleUpdateDto {

	// private int state;
	@ApiParam(name = "예약 일자")
	@ApiModelProperty(example = "0215")
	private int time;
	@ApiParam(name = "예약 시간")
	@ApiModelProperty(example = "12")
	private String day;
	@ApiParam(name = "openvidu token 정보")
	private String room;

	//	public static ScheduleDto of(ScheduleEntity schedule) {
	//		return ScheduleDto.builder()
	//				.day(schedule.getDay())
	//				// .state(schedule.getState())
	//				.time(schedule.getTime())
	//				.room(schedule.getRoom())
	//				.build();
	//	}
	//
	//	public ScheduleEntity toEntity() {
	//		return ScheduleEntity.builder()
	//				.day(this.day)
	//				// .state(this.state)
	//				.time(this.time)
	//				.room(this.room)
	//				.build();
	//	}
}
