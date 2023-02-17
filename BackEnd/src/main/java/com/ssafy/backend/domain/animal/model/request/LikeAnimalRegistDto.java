package com.ssafy.backend.domain.animal.model.request;

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
public class LikeAnimalRegistDto {

	@ApiParam(name = "관심 동물 공고 만료일")
	String expiredDate;

}
