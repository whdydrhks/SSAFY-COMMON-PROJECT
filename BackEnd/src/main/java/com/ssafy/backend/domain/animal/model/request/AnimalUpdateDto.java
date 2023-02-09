package com.ssafy.backend.domain.animal.model.request;

import com.ssafy.backend.domain.animal.entity.AnimalEntity;

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
public class AnimalUpdateDto {

	// animal
	private String name;
	private String breed;
	private int age;
	private int weight;
	private String gender;
	private String neuter;
	private String adoption;
	private String note;

	public static AnimalUpdateDto of(AnimalEntity animal) {

		return AnimalUpdateDto.builder()
			.name(animal.getName())
			.breed(animal.getBreed())
			.age(animal.getAge())
			.weight(animal.getWeight())
			.gender(animal.getGender())
			.neuter(animal.getNeuter())
			.adoption(animal.getAdoption())
			.note(animal.getNote())
			.build();
	}

	public AnimalEntity toEntity() {

		return AnimalEntity.builder()
			.name(this.name)
			.breed(this.breed)
			.age(this.age)
			.weight(this.weight)
			.gender(this.gender)
			.neuter(this.neuter)
			.adoption(this.adoption)
			.note(this.note)
			.build();
	}
}
