package com.ssafy.backend.domain.animal.repository;

import com.ssafy.backend.domain.animal.entity.AnimalEntity;
import com.ssafy.backend.domain.animal.entity.LikeAnimalEntity;
import com.ssafy.backend.domain.member.entity.UserEntity;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LikeAnimalRepository extends JpaRepository<LikeAnimalEntity, Long> {

    List<LikeAnimalEntity> findByAnimal(AnimalEntity animal);

    List<LikeAnimalEntity> findAllByUser(UserEntity user);

    List<LikeAnimalEntity> findAll(Sort sort);

    Optional<LikeAnimalEntity> findByUser(UserEntity user);

    LikeAnimalEntity findByUserAndAnimal(UserEntity user, AnimalEntity animal);

}
