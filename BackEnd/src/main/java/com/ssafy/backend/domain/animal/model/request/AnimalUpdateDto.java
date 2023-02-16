package com.ssafy.backend.domain.animal.model.request;

import com.ssafy.backend.domain.animal.entity.AnimalEntity;

import io.swagger.annotations.ApiParam;
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
	@ApiParam(name = "이름")
	private String name;
	@ApiParam(name = "품종")
	private String breed;
	@ApiParam(name = "나이")
	private int age;
	@ApiParam(name = "체중")
	private int weight;
	@ApiParam(name = "성별 [F/M]")
	private String gender;
	@ApiParam(name = "중성화 여부 [Y/N]")
	private String neuter;
	@ApiParam(name = "입양 완료 여부")
	private String adoption;
	@ApiParam(name = "상세 정보 메모")
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
