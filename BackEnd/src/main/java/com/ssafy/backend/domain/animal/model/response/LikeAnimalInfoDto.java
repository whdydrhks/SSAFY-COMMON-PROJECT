package com.ssafy.backend.domain.animal.model.response;

import java.time.LocalDateTime;

import com.ssafy.backend.domain.animal.entity.LikeAnimalEntity;
import com.ssafy.backend.global.common.model.BaseTimeDto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class LikeAnimalInfoDto extends BaseTimeDto {

	private Long likeAnimalId;
	private Long animalId;
	private String name;
	private String breed;
	private int age;
	private int weight;
	private String gender;
	private String neuter;
	private String adoption;
	private String note;

	private LocalDateTime expiredDate;

	public static LikeAnimalInfoDto of(LikeAnimalEntity likeAnimal) {

		return LikeAnimalInfoDto.builder()
			.likeAnimalId(likeAnimal.getId())
			.animalId(likeAnimal.getAnimal().getId())
			.name(likeAnimal.getAnimal().getName())
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
