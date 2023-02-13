package com.ssafy.backend.domain.animal.model;

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
public class AnimalDto {

	// shelter
	private ShelterEntity shelter;

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
	private String expired;

	private LocalDateTime createdDate;
	private LocalDateTime updatedDate;

	public static AnimalDto of(AnimalEntity animal) {

		return AnimalDto.builder()
			.shelter(animal.getShelter())
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
			.expired(animal.getExpired())
			.createdDate(animal.getCreatedDate())
			.updatedDate(animal.getUpdatedDate())
			.build();
	}

	public AnimalEntity toEntity() {

		return AnimalEntity.builder()
			.shelter(this.shelter)
			.id(this.animalId)
			.manageCode(this.manageCode)
			.name(this.name)
			// .thumbnail(this.thumbnail)
			.breed(this.breed)
			.age(this.age)
			.weight(this.weight)
			.gender(this.gender)
			.neuter(this.neuter)
			.adoption(this.adoption)
			.note(this.note)
			.expired(this.expired)
			.createdDate(this.createdDate)
			.updatedDate(this.updatedDate)
			.build();
	}
}
