package com.ssafy.backend.global.file.model.response;

import com.ssafy.backend.global.file.model.FileDto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FileReviewDto extends FileDto {

	private Long reviewId;
}
