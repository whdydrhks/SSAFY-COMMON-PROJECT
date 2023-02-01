package com.ssafy.backend.domain.member.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import com.ssafy.backend.global.common.entity.BaseTimeEntity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Entity
@DynamicInsert
@Table(name = "user")
@Getter
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class UserEntity extends BaseTimeEntity {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "user_id", columnDefinition = "INT UNSIGNED")
	private Long id;

	@Column(name = "email", nullable = false, unique = true)
	private String email;

	@Column(name = "password")
	private String password;

	@Column(name = "role", nullable = false, length = 20)
	@ColumnDefault("'USER'")
	private String role;

	@Column(name = "name", nullable = false, length = 20)
	private String name;

	@Column(name = "phone_number", length = 20)
	private String phoneNumber;

	@Column(name = "nickname", nullable = false, unique = true, length = 20)
	private String nickname;

	@Column(name = "profile_img", nullable = false)
	@ColumnDefault("'default.png'")
	private String profileImage;

	@Column(name = "expired", nullable = false, length = 1)
	@ColumnDefault("'F'")
	private String expired;

}
