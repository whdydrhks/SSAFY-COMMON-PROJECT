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

	public AnimalEntity updateEntity(AnimalEntity entity) {

		return AnimalEntity.builder()
			.shelter(entity.getShelter())
			.id(entity.getId())
			.manageCode(entity.getManageCode())
			.name(this.getName())
			// .thumbnail(this.getThumbnail())
			.breed(this.getBreed())
			.age(this.getAge())
			.weight(this.getWeight())
			.gender(this.getGender())
			.neuter(this.getNeuter())
			.adoption(this.getAdoption())
			.note(this.getNote())
			.expired(entity.getExpired())
			.createdDate(entity.getCreatedDate())
			.build();
	}
}
