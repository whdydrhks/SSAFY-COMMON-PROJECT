package com.ssafy.backend.global.file.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.backend.domain.animal.entity.AnimalEntity;
import com.ssafy.backend.domain.live.entity.LiveEntity;
import com.ssafy.backend.domain.member.entity.UserEntity;
import com.ssafy.backend.global.file.entity.FileEntity;

public interface FileRepository extends JpaRepository<FileEntity, Long> {

	// User는 프로필 사진 단 하나만 저장함
	Optional<FileEntity> findByUser(UserEntity user);

	Optional<FileEntity> findByUserAndExpiredLike(UserEntity user, String expired);

	Optional<FileEntity> findByLive(LiveEntity live);

	Optional<FileEntity> findByLiveAndExpiredLike(LiveEntity live, String expired);

	List<FileEntity> findByAnimal(AnimalEntity animal);

	List<FileEntity> findByAnimalAndExpiredLike(AnimalEntity animal, String expired);

	//	List<FileEntity> findByReview(ReviewEntity review);
	//
	//	List<FileEntity> findByReviewAndExpiredLike(ReviewEntity review, String expired);

	@Override
	Optional<FileEntity> findById(Long id);

	Optional<FileEntity> findByIdAndExpiredLike(Long id, String expired);

	Optional<FileEntity> findByStoreName(String storeName);

	Optional<FileEntity> findByStoreNameAndExpiredLike(String storeName, String expired);

	@Override
	void deleteById(Long id);

	Long deleteByUser(UserEntity user);

	Long deleteByLive(LiveEntity live);

	Long deleteByAnimal(AnimalEntity animal);

	//	Long deleteByReview(ReviewEntity animal);
}
