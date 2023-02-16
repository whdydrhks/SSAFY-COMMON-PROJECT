package com.ssafy.backend.domain.member.repository;

import java.util.List;
import java.util.Optional;

import com.ssafy.backend.domain.shelter.entity.ShelterEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.backend.domain.member.entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

	@Override
	List<UserEntity> findAll();

	List<UserEntity> findAllByExpiredLike(String expired);

	List<UserEntity> findByEmailContaining(String email);

	List<UserEntity> findByEmailContainingAndExpiredLike(String email, String expired);

	List<UserEntity> findByNicknameContainingIgnoreCase(String nickname);

	List<UserEntity> findByNicknameContainingIgnoreCaseAndExpiredLike(String nickname, String expired);

	@Override
	Optional<UserEntity> findById(Long id);

	Optional<UserEntity> findByIdAndExpiredLike(Long Id, String expired);

	Optional<UserEntity> findByEmail(String email);

	Optional<UserEntity> findByEmailAndExpiredLike(String email, String expired);

	Optional<UserEntity> findByNickname(String nickname);

	Optional<UserEntity> findByNicknameAndExpiredLike(String nickname, String expired);

	Optional<UserEntity> findByShelter(ShelterEntity shelter);

	@Override
	void deleteById(Long id);

	Long deleteByEmail(String email);

	Long deleteByNickname(String nickname);

}
