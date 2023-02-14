package com.ssafy.backend.global.file.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;

import com.ssafy.backend.domain.animal.entity.AnimalEntity;
import com.ssafy.backend.domain.live.entity.LiveEntity;
import com.ssafy.backend.domain.member.entity.UserEntity;
import com.ssafy.backend.global.common.entity.BaseTimeEntity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@DynamicInsert
@Table(name = "file")
@Getter
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FileEntity extends BaseTimeEntity {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "file_id", columnDefinition = "INT UNSIGNED")
	private Long id;

	@OneToOne(fetch = FetchType.LAZY, optional = true)
	private UserEntity user;

	@OneToOne(fetch = FetchType.LAZY, optional = true)
	private LiveEntity live;

	@ManyToOne(fetch = FetchType.LAZY, optional = true)
	private AnimalEntity animal;

	//	@ManyToOne(fetch = FetchType.LAZY)
	//	private ReviewEntity review;

	@Column(name = "origin_name", nullable = false)
	private String originName;

	@Column(name = "store_name", nullable = false, unique = true)
	private String storeName;

	//	@Column(name = "thumbnail_url", nullable = false)
	//	private String thumbnailUrl;

	@Column(name = "extension", nullable = false)
	private String extension;

	@Column(name = "content_type", nullable = false)
	private String contentType;

	//	@Column(name = "size", nullable = false)
	//	private int size;
}
