package com.ssafy.backend.domain.reservation.timetable.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.backend.domain.reservation.timetable.entity.TimetableEntity;

public interface TimetableRepository extends JpaRepository<TimetableEntity, Long> {

	List<TimetableEntity> findByNameContainingIgnoreCase(String name);

	List<TimetableEntity> findByNameContainingIgnoreCaseAndExpiredLike(String name);

	Optional<TimetableEntity> findByName(String name);

	Optional<TimetableEntity> findByNameAndTelNumber(String name, String telNumber);

	Optional<TimetableEntity> findByNameAndExpiredLike(String name, String expired);

	Optional<TimetableEntity> findByIdAndExpiredLike(Long id, String expired);

	Long deleteByName(String name);

}
