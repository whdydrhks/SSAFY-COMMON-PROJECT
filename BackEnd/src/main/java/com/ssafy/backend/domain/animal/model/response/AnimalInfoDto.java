package com.ssafy.backend.domain.animal.model.response;

import java.time.LocalDateTime;

import com.ssafy.backend.domain.animal.entity.AnimalEntity;
import com.ssafy.backend.domain.shelter.entity.ShelterEntity;

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
public class AnimalInfoDto {

	// animal
	private Long animalId;
	private String manageCode;
	private String name;
	private String thumbnail;
	private String breed;
	private int age;
	private int weight;
	private String gender;
	private String neuter;
	private String note;

	// shelter
	private Long shelterId;
	private String shelterName;

	private LocalDateTime createdDate;
	private LocalDateTime updatedDate;

	public static AnimalInfoDto of(AnimalEntity animal) {

		return AnimalInfoDto.builder()
			.shelterId(animal.getShelter().getId())
			.shelterName(animal.getShelter().getName())
			.animalId(animal.getId())
			.manageCode(animal.getManageCode())
			.name(animal.getName())
			.thumbnail(animal.getThumbnail())
			.breed(animal.getBreed())
			.age(animal.getAge())
			.weight(animal.getWeight())
			.gender(animal.getGender())
			.neuter(animal.getNeuter())
			.note(animal.getNote())
			.createdDate(animal.getCreatedDate())
			.updatedDate(animal.getUpdatedDate())
			.build();
	}

	public AnimalEntity toEntity(ShelterEntity shelter) {

		return AnimalEntity.builder()
			.shelter(shelter)
			.id(this.animalId)
			.manageCode(this.manageCode)
			.name(this.name)
			.thumbnail(this.thumbnail)
			.breed(this.breed)
			.age(this.age)
			.weight(this.weight)
			.gender(this.gender)
			.neuter(this.neuter)
			.note(this.note)
			.createdDate(this.createdDate)
			.updatedDate(this.updatedDate)
			.build();
	}
}
