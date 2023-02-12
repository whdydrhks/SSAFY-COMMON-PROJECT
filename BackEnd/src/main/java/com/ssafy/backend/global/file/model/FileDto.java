package com.ssafy.backend.global.file.model;

import com.ssafy.backend.domain.animal.entity.AnimalEntity;
import com.ssafy.backend.domain.member.entity.UserEntity;
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
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FileDto extends BaseTimeDto {

	private Long id;

	private UserEntity user;

	private AnimalEntity animal;

	private String originName;

	private String storeName;

	private String extension;

	private String contentType;

}
