package com.ssafy.backend.domain.alarm.model.request;

import lombok.*;
import org.springframework.context.annotation.Bean;

@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class AlarmDeleteDto {

    private Long alarmId;

}
