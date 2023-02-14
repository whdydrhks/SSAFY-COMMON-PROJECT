package com.ssafy.backend.domain.alarm.model.response;

import com.ssafy.backend.domain.alarm.entity.AlarmEntity;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class AlarmInfoDto {

    private Long alarmId;
    private int alarmType;
    private String targetName;
    private String day;
    private int time;
    private LocalDateTime createdDate;

    public static AlarmInfoDto of(AlarmEntity alarm){
        return AlarmInfoDto.builder()
                .alarmId(alarm.getId())
                .alarmType(alarm.getAlarmType())
                .targetName(alarm.getTargetName())
                .day(alarm.getDay())
                .time(alarm.getTime())
                .createdDate(alarm.getCreatedDate())
                .build();
    }



}
