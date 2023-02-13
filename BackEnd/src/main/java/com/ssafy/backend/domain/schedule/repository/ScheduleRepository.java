package com.ssafy.backend.domain.schedule.repository;

import java.util.List;
import java.util.Optional;

import javax.swing.text.html.Option;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ssafy.backend.domain.member.entity.UserEntity;
import com.ssafy.backend.domain.schedule.entity.ScheduleEntity;
import com.ssafy.backend.domain.shelter.entity.ShelterEntity;
import com.ssafy.backend.domain.timetable.entity.TimetableEntity;

public interface ScheduleRepository extends JpaRepository<ScheduleEntity, Long> {

	List<ScheduleEntity> findByUser(UserEntity user, Sort sort);

	List<ScheduleEntity> findByShelter(ShelterEntity shelter, Sort sort);

	List<ScheduleEntity> findByDay(String day, Sort sort);

//	List<ScheduleEntity> findByNameContainingIgnoreCase(String name);
//
//	List<ScheduleEntity> findByNameContainingIgnoreCaseAndExpiredLike(String name);
//
//	List<ScheduleEntity> findByName(String name, Long scheduleId);
//
//	Optional<ScheduleEntity> findByNameOrderByDay(String name);
//
//	Optional<ScheduleEntity> findByNameOrderByShelterAsc(String name);
//
//	Optional<ScheduleEntity> findByNameAndTelNumber(String name, String telNumber);
//
//	Optional<ScheduleEntity> findByNameAndExpiredLike(String name, String expired);
//
//	Optional<ScheduleEntity> findByIdAndExpiredLike(Long id, String expired);
//
//	Long deleteByName(String name);


}
