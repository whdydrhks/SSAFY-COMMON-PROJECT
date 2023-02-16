package com.ssafy.backend.global.common.model;

import java.time.LocalDateTime;

import io.swagger.annotations.ApiParam;
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
public class BaseTimeDto {

	@ApiParam(name = "생성일")
	private LocalDateTime createdDate;

	@ApiParam(name = "수정일")
	private LocalDateTime updatedDate;
}
