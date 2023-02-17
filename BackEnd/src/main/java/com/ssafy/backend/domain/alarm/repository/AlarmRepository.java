package com.ssafy.backend.domain.alarm.repository;

import com.ssafy.backend.domain.alarm.entity.AlarmEntity;
import com.ssafy.backend.domain.member.entity.UserEntity;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface AlarmRepository extends JpaRepository<AlarmEntity, Long> {

    List<AlarmEntity> findAllByReceiver(UserEntity receiver, Sort sort);

}
