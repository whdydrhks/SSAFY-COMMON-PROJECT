package com.ssafy.backend.domain.alarm.model.request;

import com.ssafy.backend.domain.alarm.entity.AlarmEntity;
import com.ssafy.backend.domain.member.entity.UserEntity;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class AlarmRegistDto {

    private Long receiverId;
    private Long senderId;
    private int alarmType;

//    public AlarmEntity toEntityUser(UserEntity user, UserEntity sender){
//        return AlarmEntity.builder()
//                .user(user)
//                .sender(sender)
//                .
//    }
//
//    public AlarmEntity toEntityAnimal(){
//
//
//    }
}
