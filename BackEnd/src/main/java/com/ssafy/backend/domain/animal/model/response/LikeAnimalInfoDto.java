package com.ssafy.backend.domain.animal.model.response;

import com.ssafy.backend.domain.animal.entity.AnimalEntity;
import com.ssafy.backend.domain.animal.entity.LikeAnimalEntity;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class LikeAnimalInfoDto {

    private Long likeAnimalId;
    private Long animalId;
    private String name;
    private String thumbnail;
    private String breed;
    private int age;
    private int weight;
    private String gender;
    private String neuter;
    private String adoption;
    private String note;

    private LocalDateTime expiredDate;

    public static LikeAnimalInfoDto of(LikeAnimalEntity likeAnimal){

        return LikeAnimalInfoDto.builder()
                .likeAnimalId(likeAnimal.getId())
                .animalId(likeAnimal.getAnimal().getId())
                .name(likeAnimal.getAnimal().getName())
                .thumbnail(likeAnimal.getAnimal().getThumbnail())
                .breed(likeAnimal.getAnimal().getBreed())
                .age(likeAnimal.getAnimal().getAge())
                .weight(likeAnimal.getAnimal().getWeight())
                .gender(likeAnimal.getAnimal().getGender())
                .neuter(likeAnimal.getAnimal().getNeuter())
                .adoption(likeAnimal.getAnimal().getAdoption())
                .note(likeAnimal.getAnimal().getNote())
                .build();
    }
}
