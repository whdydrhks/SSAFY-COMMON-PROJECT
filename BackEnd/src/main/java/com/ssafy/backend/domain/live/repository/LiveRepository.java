package com.ssafy.backend.domain.live.repository;

import com.ssafy.backend.domain.live.entity.LiveEntity;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LiveRepository extends JpaRepository<LiveEntity, Long> {

    Optional<LiveEntity> findById(Long id);

    List<LiveEntity> findAll(Sort sort);
}
