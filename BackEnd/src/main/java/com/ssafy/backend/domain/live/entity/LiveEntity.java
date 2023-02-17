package com.ssafy.backend.domain.live.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;

import com.ssafy.backend.domain.shelter.entity.ShelterEntity;
import com.ssafy.backend.global.common.entity.BaseTimeEntity;
import com.ssafy.backend.global.file.entity.FileEntity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Entity
@DynamicInsert
@Table(name = "live")
@Getter
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class LiveEntity extends BaseTimeEntity {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", columnDefinition = "INT UNSIGNED")
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "shelter_id")
	private ShelterEntity shelter;

	@Column(name = "title", nullable = false, length = 30)
	private String title;

	@Column(name = "category", nullable = false)
	private String category;

	@Column(name = "room", nullable = false)
	private String room;

	@OneToOne(mappedBy = "live", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private FileEntity file;
}
