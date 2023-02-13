package com.ssafy.backend.domain.alarm.model.request;

import com.ssafy.backend.domain.alarm.entity.AlarmEntity;
import com.ssafy.backend.domain.animal.entity.AnimalEntity;
import com.ssafy.backend.domain.member.entity.UserEntity;
import com.ssafy.backend.domain.reservation.schedule.entity.ScheduleEntity;
import com.ssafy.backend.domain.shelter.entity.ShelterEntity;
import lombok.*;

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


    public AlarmEntity toEntityShelterToUser(UserEntity user, String profileImage){
        return AlarmEntity.builder()
                .receiver(user)
                .targetName(this.targetName)
                .alarmType(this.alarmType)
                .time(this.time)
                .profileImage(profileImage)
                .build();
    }

    public AlarmEntity toEntityUserToShelter(UserEntity user, String profileImage){
        return AlarmEntity.builder()
                .receiver(user)
                .targetName(this.targetName)
                .alarmType(this.alarmType)
                .time(this.time)
                .profileImage(profileImage)
                .build();
    }

    public AlarmEntity toEntityAnimalToUser(UserEntity user, String profileImage){
        return AlarmEntity.builder()
                .receiver(user)
                .targetName(this.targetName)
                .alarmType(this.alarmType)
                .profileImage(profileImage)
                .build();
    }
}
