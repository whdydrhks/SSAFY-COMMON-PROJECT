package com.ssafy.backend.domain.alarm.model.request;

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
public class AlarmDeleteDto {

	@ApiParam(name = "알람 식별 번호")
	private Long alarmId;

}
