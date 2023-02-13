package com.ssafy.backend.domain.timetable.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;

import com.ssafy.backend.domain.shelter.entity.ShelterEntity;
import com.ssafy.backend.global.common.entity.BaseTimeEntity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Entity
@DynamicInsert
@Table(name = "timetable")
@Getter
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class TimetableEntity extends BaseTimeEntity {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", columnDefinition = "INT UNSIGNED")
	private Long id;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "shelter_id")
	private ShelterEntity shelter;

	//	@Column(name = "shelter_id", nullable = false, unique = true)
	//	private Long shelterId;

	@Column(name = "mon", nullable = false, length = 25)
	private String mon;

	@Column(name = "tue", nullable = false, length = 25)
	private String tue;

	@Column(name = "wed", nullable = false, length = 25)
	private String wed;

	@Column(name = "thr", nullable = false, length = 25)
	private String thr;

	@Column(name = "fri", nullable = false, length = 25)
	private String fri;

	@Column(name = "sat", nullable = false, length = 25)
	private String sat;

	@Column(name = "sun", nullable = false, length = 25)
	private String sun;

}
