package com.ssafy.backend.domain.animal.model.request;

import com.ssafy.backend.domain.animal.entity.AnimalEntity;
import com.ssafy.backend.domain.shelter.entity.ShelterEntity;

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
public class AnimalRegisterDto {

	@ApiParam(name = "기관에서 사용하는 관리 번호")
	private String manageCode;
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
	@ApiParam(name = "상세 정보 메모")
	private String note;

	public AnimalEntity toEntity(ShelterEntity shelter) {

		return AnimalEntity.builder()
			.shelter(shelter)
			.manageCode(this.manageCode)
			.name(this.name)
			.breed(this.breed)
			.age(this.age)
			.weight(this.weight)
			.gender(this.gender)
			.neuter(this.neuter)
			.note(this.note)
			.build();
	}
}
