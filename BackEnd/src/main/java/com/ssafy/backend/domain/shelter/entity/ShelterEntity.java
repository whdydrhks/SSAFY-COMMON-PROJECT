package com.ssafy.backend.domain.shelter.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import com.ssafy.backend.domain.animal.entity.AnimalEntity;
import com.ssafy.backend.global.common.entity.BaseTimeEntity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Entity
@DynamicInsert
@Table(name = "shelter")
@Getter
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class ShelterEntity extends BaseTimeEntity {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "shelter_id", columnDefinition = "INT UNSIGNED")
	private Long id;

	@Column(name = "name", nullable = false, unique = true, length = 50)
	private String name;

	@Column(name = "url", nullable = false)
	private String url;

	@Column(name = "introduce", nullable = false, length = 1000)
	@ColumnDefault("'보호소 소개 글'")
	private String introduce;

	@Column(name = "origin_image", nullable = false)
	@ColumnDefault("'default.png'")
	private String originImage;

	@Column(name = "stored_image", nullable = false)
	@ColumnDefault("'default.png'")
	private String storedImage;

	@Column(name = "tel_number", nullable = false, length = 20)
	private String telNumber;

	@Column(name = "post_code", nullable = false, length = 10)
	private String postCode;

	@Column(name = "address")
	private String address;

	@Column(name = "expired", nullable = false, length = 1)
	@ColumnDefault("'F'")
	private String expired;

	// Animal과 양방향 매핑
	@OneToMany(mappedBy = "shelter", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@Builder.Default
	private List<AnimalEntity> animals = new ArrayList<>();

}
