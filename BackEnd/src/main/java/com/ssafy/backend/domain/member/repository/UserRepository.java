package com.ssafy.backend.domain.member.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.backend.domain.member.entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

	List<UserEntity> findByExpiredLike(String expired);

	Optional<UserEntity> findByEmail(String email);

	Optional<UserEntity> findByEmailAndExpiredLike(String email, String expired);

	Optional<UserEntity> findByNickname(String nickname);

	Optional<UserEntity> findByNicknameAndExpiredLike(String nickname, String expired);

	Long deleteByEmail(String email);

	@Override
	Optional<UserEntity> findById(Long id);

}
