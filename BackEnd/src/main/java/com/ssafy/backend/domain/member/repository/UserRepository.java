package com.ssafy.backend.domain.member.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.backend.domain.member.entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

	Optional<UserEntity> findByEmail(String email);

	Optional<UserEntity> findByNickname(String nickname);

	Long deleteByEmail(String email);

	@Override
	Optional<UserEntity> findById(Long id);

}
