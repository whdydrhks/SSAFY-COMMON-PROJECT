package com.ssafy.backend.domain.schedule.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;

import com.ssafy.backend.domain.member.entity.UserEntity;
import com.ssafy.backend.domain.shelter.entity.ShelterEntity;
import com.ssafy.backend.global.common.entity.BaseTimeEntity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Entity
@DynamicInsert
@Table(name = "schedule")
@Getter
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class ScheduleEntity extends BaseTimeEntity {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", columnDefinition = "INT UNSIGNED")
	private Long id;

	@ManyToOne
	@JoinColumn(name = "shelter_id")
	private ShelterEntity shelter;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private UserEntity user;

	@Column(name = "day", nullable = false, length = 10)
	private String day;

	// @Column(name="state", nullable = false)
	// private int state;

	@Column(name = "time", nullable = false)
	private int time;

	@Column(name = "room", nullable = false, unique = true, length = 50)
	private String room;

	// @Column(name = "expired", nullable = false, length = 1)
	// @ColumnDefault("'F'")
	// private String expired;
}
