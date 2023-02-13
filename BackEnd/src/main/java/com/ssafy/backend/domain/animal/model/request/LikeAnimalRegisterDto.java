package com.ssafy.backend.domain.animal.model.request;

import com.ssafy.backend.domain.animal.entity.AnimalEntity;
import com.ssafy.backend.domain.animal.entity.LikeAnimalEntity;
import com.ssafy.backend.domain.member.entity.UserEntity;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class LikeAnimalRegisterDto {

    private Long userId;
    private Long animalId;
    private LocalDateTime expiredDate;

    public LikeAnimalEntity toEntity(UserEntity user, AnimalEntity animal){
        return LikeAnimalEntity.builder()
                .user(user)
                .animal(animal)
                .expiredDate(this.expiredDate)
                .build();
    }

}
