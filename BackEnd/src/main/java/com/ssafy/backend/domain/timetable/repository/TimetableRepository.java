package com.ssafy.backend.domain.timetable.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.backend.domain.shelter.entity.ShelterEntity;
import com.ssafy.backend.domain.timetable.entity.TimetableEntity;

public interface TimetableRepository extends JpaRepository<TimetableEntity, Long> {

	//	List<TimetableEntity> findByNameContainingIgnoreCase(String name);
	//
	//	List<TimetableEntity> findByNameContainingIgnoreCaseAndExpiredLike(String name);
	//
	//	Optional<TimetableEntity> findByShelterId(Long shelterId);
	//
	//	Optional<TimetableEntity> findByNameAndTelNumber(String name, String telNumber);
	//
	//	Optional<TimetableEntity> findByNameAndExpiredLike(String name, String expired);
	//
	//	Optional<TimetableEntity> findByIdAndExpiredLike(Long id, String expired);
	//
	//	Long deleteByName(String name);

	Optional<TimetableEntity> findByShelter(ShelterEntity shelter);

	Optional<TimetableEntity> findByShelterAndExpiredLike(ShelterEntity shelter, String expired);

}
