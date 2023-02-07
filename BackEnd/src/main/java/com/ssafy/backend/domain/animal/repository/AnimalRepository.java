package com.ssafy.backend.domain.animal.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.backend.domain.animal.entity.AnimalEntity;
import com.ssafy.backend.domain.shelter.entity.ShelterEntity;

public interface AnimalRepository extends JpaRepository<AnimalEntity, Long> {

	List<AnimalEntity> findAllByExpiredLike(String expired);

	List<ShelterEntity> findByShelterAndExpiredLike(ShelterEntity shelter, String expired);

	Optional<AnimalEntity> findByManageCodeAndExpiredLike(String manageCode, String expired);

	Optional<AnimalEntity> findByIdAndExpiredLike(Long id, String expired);

}
