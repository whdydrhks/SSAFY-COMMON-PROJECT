package com.ssafy.backend.domain.member.entity;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import com.ssafy.backend.domain.animal.entity.LikeAnimalEntity;
import com.ssafy.backend.domain.shelter.entity.ShelterEntity;
import com.ssafy.backend.global.common.entity.BaseTimeEntity;
import com.ssafy.backend.global.file.entity.FileEntity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
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
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", columnDefinition = "INT UNSIGNED")
	private Long id;

	@Column(name = "email", nullable = false, unique = true)
	private String email;

	@Setter
	@Column(name = "password")
	private String password;

	@Setter
	@Column(name = "role", nullable = false, length = 20)
	@ColumnDefault("'USER'")
	private String role;

	@Column(name = "name", nullable = false, length = 20)
	private String name;

	@Column(name = "phone_number", length = 20)
	private String phoneNumber;

	@Column(name = "nickname", nullable = false, unique = true, length = 20)
	private String nickname;

	// 프로필 이미지를 숫자 아바타로 받을 것
	@Column(name = "profileImage", nullable = false)
	@ColumnDefault("'0'")
	private int profileImage;

	@OneToOne(mappedBy = "user", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private ShelterEntity shelter;

	@OneToOne(mappedBy = "user", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private FileEntity file;

	@OneToMany(mappedBy = "user", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private Set<LikeAnimalEntity> likeAnimals;

}
