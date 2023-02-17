package com.ssafy.backend.domain.shelter.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.backend.domain.member.entity.UserEntity;
import com.ssafy.backend.domain.shelter.entity.ShelterEntity;

public interface ShelterRepository extends JpaRepository<ShelterEntity, Long> {

	List<ShelterEntity> findAllByExpiredLike(String expired);

	List<ShelterEntity> findByUserAndExpiredLike(UserEntity user, String expired);

	List<ShelterEntity> findByNameContainingIgnoreCase(String name);

	List<ShelterEntity> findByNameContainingIgnoreCaseAndExpiredLike(String name, String expired);

	Optional<ShelterEntity> findByName(String name);

	Optional<ShelterEntity> findByNameAndTelNumber(String name, String telNumber);

	Optional<ShelterEntity> findByNameAndExpiredLike(String name, String expired);

	Optional<ShelterEntity> findByIdAndExpiredLike(Long id, String expired);

	Optional<ShelterEntity> findByUser(UserEntity user);

	Long deleteByName(String name);


}
