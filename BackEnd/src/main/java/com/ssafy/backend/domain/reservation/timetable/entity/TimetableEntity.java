package com.ssafy.backend.domain.reservation.timetable.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;

import com.ssafy.backend.domain.shelter.entity.ShelterEntity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
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
public class TimetableEntity {
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "timetable_id", columnDefinition = "INT UNSIGNED")
	private Long id;

//	@OneToOne
//	@JoinColumn(name="shelter_id")
//	private ShelterEntity shelter;

	@Column(name = "shelter_id", nullable = false, unique = true)
	private Long shelter_id;

	@Column(name = "mon", nullable = false, unique = true, length = 25)
	private String mon;

	@Column(name = "tue", nullable = false, unique = true, length = 25)
	private String tue;

	@Column(name = "wed", nullable = false, unique = true, length = 25)
	private String wed;

	@Column(name = "thr", nullable = false, unique = true, length = 25)
	private String thr;

	@Column(name = "fri", nullable = false, unique = true, length = 25)
	private String fri;

	@Column(name = "sat", nullable = false, unique = true, length = 25)
	private String sat;

	@Column(name = "sun", nullable = false, unique = true, length = 25)
	private String sun;

}

