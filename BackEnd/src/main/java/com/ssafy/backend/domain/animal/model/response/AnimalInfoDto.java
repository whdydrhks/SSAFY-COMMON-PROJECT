package com.ssafy.backend.domain.animal.model.response;

import com.ssafy.backend.domain.animal.entity.AnimalEntity;
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
public class AnimalInfoDto extends BaseTimeDto {

	// animal
	private Long animalId;
	private String manageCode;
	private String name;
	// private String thumbnail;
	private String breed;
	private int age;
	private int weight;
	private String gender;
	private String neuter;
	private String adoption;
	private String note;

	// shelter
	private Long shelterId;
	private String shelterName;

	public static AnimalInfoDto of(AnimalEntity animal) {

		return AnimalInfoDto.builder()
			.animalId(animal.getId())
			.manageCode(animal.getManageCode())
			.name(animal.getName())
			// .thumbnail(animal.getThumbnail())
			.breed(animal.getBreed())
			.age(animal.getAge())
			.weight(animal.getWeight())
			.gender(animal.getGender())
			.neuter(animal.getNeuter())
			.adoption(animal.getAdoption())
			.note(animal.getNote())
			.createdDate(animal.getCreatedDate())
			.updatedDate(animal.getUpdatedDate())
			.shelterId(animal.getShelter().getId())
			.shelterName(animal.getShelter().getName())
			.build();
	}
}
