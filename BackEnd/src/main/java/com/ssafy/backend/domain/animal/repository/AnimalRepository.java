package com.ssafy.backend.domain.animal.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.backend.domain.animal.entity.AnimalEntity;
import com.ssafy.backend.domain.shelter.entity.ShelterEntity;

public interface AnimalRepository extends JpaRepository<AnimalEntity, Long> {

	@Override
	List<AnimalEntity> findAll();

	List<AnimalEntity> findAllByExpiredLike(String expired);

	List<AnimalEntity> findByShelterAndExpiredLike(ShelterEntity shelter, String expired);

	List<AnimalEntity> findByShelterAndNameContainingIgnoreCase(ShelterEntity shelter, String name);

	List<AnimalEntity> findByShelterAndNameContainingIgnoreCaseAndExpiredLike(ShelterEntity shelter, String name,
		String expired);

	List<AnimalEntity> findByShelterAndManageCodeContainingIgnoreCase(ShelterEntity shelter, String manageCode);

	List<AnimalEntity> findByShelterAndManageCodeContainingIgnoreCaseAndExpiredLike(ShelterEntity shelter,
		String manageCode, String expired);

	List<AnimalEntity> findByShelterAndBreedContainingIgnoreCase(ShelterEntity shelter, String breed);

	List<AnimalEntity> findByShelterAndBreedContainingIgnoreCaseAndExpiredLike(ShelterEntity shelter, String breed,
		String expired);

	@Override
	Optional<AnimalEntity> findById(Long id);

	Optional<AnimalEntity> findByIdAndExpiredLike(Long id, String expired);

	Optional<AnimalEntity> findByManageCode(String manageCode);

	Optional<AnimalEntity> findByManageCodeAndExpiredLike(String manageCode, String expired);

	@Override
	void deleteById(Long id);

	Long deleteByManageCode(String manageCode);

}
