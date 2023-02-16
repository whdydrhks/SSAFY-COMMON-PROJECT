package com.ssafy.backend.domain.sample.service;

import java.time.LocalDateTime;

import javax.transaction.Transactional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ssafy.backend.domain.animal.entity.AnimalEntity;
import com.ssafy.backend.domain.animal.entity.LikeAnimalEntity;
import com.ssafy.backend.domain.animal.repository.AnimalRepository;
import com.ssafy.backend.domain.animal.repository.LikeAnimalRepository;
import com.ssafy.backend.domain.live.entity.LiveEntity;
import com.ssafy.backend.domain.live.repository.LiveRepository;
import com.ssafy.backend.domain.member.entity.UserEntity;
import com.ssafy.backend.domain.member.repository.UserRepository;
import com.ssafy.backend.domain.schedule.entity.ScheduleEntity;
import com.ssafy.backend.domain.schedule.repository.ScheduleRepository;
import com.ssafy.backend.domain.shelter.entity.ShelterEntity;
import com.ssafy.backend.domain.shelter.repository.ShelterRepository;
import com.ssafy.backend.domain.timetable.entity.TimetableEntity;
import com.ssafy.backend.domain.timetable.repository.TimetableRepository;
import com.ssafy.backend.global.file.entity.FileEntity;
import com.ssafy.backend.global.file.repository.FileRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class dummyCreate {

	private final PasswordEncoder passwordEncoder;

	private final FileRepository fileRepository;

	private final UserRepository userRepository;
	private final AnimalRepository animalRepository;
	private final ShelterRepository shelterRepository;

	private final TimetableRepository timetableRepository;
	private final ScheduleRepository scheduleRepository;
	private final LiveRepository liveRepository;
	private final LikeAnimalRepository likeAnimalRepository;

	// 테스트용 더미 데이터 생성용
	@Transactional
	//	@PostConstruct
	public void testInitializing() {

		// 기본 유저 이미지 생성
		FileEntity file = FileEntity.builder()
			.originName("default_profile")
			.storeName("default_profile")
			.contentType("image/png")
			.extension("png")
			.build();

		fileRepository.save(file);

		// 기본 라이브 이미지 생성
		file = FileEntity.builder()
			.originName("default_live")
			.storeName("default_live")
			.contentType("image/png")
			.extension("png")
			.build();

		fileRepository.save(file);

		// 기본 동물 이미지 생성
		file = FileEntity.builder()
			.originName("default_animal")
			.storeName("default_animal")
			.contentType("image/png")
			.extension("png")
			.build();

		fileRepository.save(file);

		// 멤버 생성
		for (int i = 1; i <= 15; i++) {
			String name = "사용자_" + String.format("%03d", i);
			UserEntity user = UserEntity.builder()
				.email("user" + i + "@gmail.com")
				.password(passwordEncoder.encode("user" + i))
				.name(name)
				.phoneNumber("010-" + String.format("%04d", i) + "-1234")
				.nickname("닉네임" + i)
				.role(i == 1 ? "ADMIN" : (i <= 6 ? "HOST" : "USER")) // 1 번 어드민, 2 ~ 6번 호스트, 나머지 유저
				.build();
			userRepository.save(user);
		}

		for (int i = 1; i <= 5; i++) {
			// 보호소 생성
			String name = "보호소_" + String.format("%03d", i);
			ShelterEntity shelter = ShelterEntity.builder()
				.user(userRepository.findByIdAndExpiredLike(i + 1L, "F").get())
				.name(name)
				.url("https://www." + name + ".com")
				.introduce(name + "의 소개글 입니다.")
				.telNumber("010-1234-" + String.format("%04d", i))
				.postCode("111111")
				.address("00시 00구 00대로 " + i)
				.build();
			shelterRepository.save(shelter);

			// 타임테이블 생성
			TimetableEntity timetable = TimetableEntity.builder()
				.shelter(shelterRepository.findByIdAndExpiredLike(Long.valueOf(i), "F").get())
				.sun("0000000000000000000000000")
				.mon("0000000000000000000000001")
				.tue("0000000000000000000000002")
				.wed("0000000000000000000000003")
				.thr("0000000000000000000000004")
				.fri("0000000000000000000000005")
				.sat("0000000000000000000000006")
				.build();
			timetableRepository.save(timetable);
		}

		//		System.out.println(shelterRepository.findById(1L).get().toString());

		// 동물 생성
		for (int i = 1; i <= 20; i++) {
			String name = (i % 2 == 0 ? "멍멍이" : "뭉뭉이") + String.format("%03d", i);
			String gender = i % 2 == 0 ? "M" : "F";
			AnimalEntity animal = AnimalEntity.builder()
				.shelter(shelterRepository.findByIdAndExpiredLike(i % 3 + 1L, "F").get())
				.manageCode("23-02-" + gender + "-" + String.format("%04d", i))
				.name(name)
				.breed(i % 2 == 0 ? "골드 리트리버" : "포메라니안")
				.age(i % 10 + 1)
				.weight(i % 5 + 5)
				.gender(gender)
				.neuter("T")
				.build();
			animalRepository.save(animal);
		}

		//		System.out.println(shelterRepository.findById(1L).get().toString());

		ScheduleEntity schedule = ScheduleEntity.builder()
			.day("0214")
			.time(10)
			.room("1")
			.shelter(shelterRepository.findByIdAndExpiredLike(1L, "F").get())
			.user(userRepository.findByIdAndExpiredLike(10L, "F").get())
			.build();

		scheduleRepository.save(schedule);

		ScheduleEntity schedule1 = ScheduleEntity.builder()
			.day("0216")
			.time(11)
			.room("2")
			.shelter(shelterRepository.findByIdAndExpiredLike(1L, "F").get())
			.user(userRepository.findByIdAndExpiredLike(10L, "F").get())
			.build();
		scheduleRepository.save(schedule1);

		ScheduleEntity schedule2 = ScheduleEntity.builder()
			.day("0216")
			.time(1)
			.room("3")
			.shelter(shelterRepository.findByIdAndExpiredLike(1L, "F").get())
			.user(userRepository.findByIdAndExpiredLike(10L, "F").get())
			.build();
		scheduleRepository.save(schedule2);

		ScheduleEntity schedule3 = ScheduleEntity.builder()
			.day("0216")
			.time(2)
			.room("4")
			.shelter(shelterRepository.findByIdAndExpiredLike(1L, "F").get())
			.user(userRepository.findByIdAndExpiredLike(10L, "F").get())
			.build();
		scheduleRepository.save(schedule3);

		ScheduleEntity schedule4 = ScheduleEntity.builder()
			.day("0215")
			.time(17)
			.room("5")
			.shelter(shelterRepository.findByIdAndExpiredLike(1L, "F").get())
			.user(userRepository.findByIdAndExpiredLike(10L, "F").get())
			.build();
		scheduleRepository.save(schedule4);

		LiveEntity live = LiveEntity.builder()
			//			.id(1L)
			.category("개")
			.title("111")
			.room("1")
			.shelter(shelterRepository.findByIdAndExpiredLike(1L, "F").get())
			.build();
		liveRepository.save(live);

		LiveEntity live1 = LiveEntity.builder()
			//			.id(5L)
			.category("개")
			.title("555")
			.room("5")
			.shelter(shelterRepository.findByIdAndExpiredLike(1L, "F").get())
			.build();
		liveRepository.save(live1);

		LiveEntity live2 = LiveEntity.builder()
			//			.id(3L)
			.category("개")
			.title("333")
			.room("3")
			.shelter(shelterRepository.findByIdAndExpiredLike(1L, "F").get())
			.build();
		liveRepository.save(live2);

		LiveEntity live13 = LiveEntity.builder()
			//			.id(2L)
			.category("개")
			.title("222")
			.room("2")
			.shelter(shelterRepository.findByIdAndExpiredLike(1L, "F").get())
			.build();
		liveRepository.save(live13);

		LiveEntity live14 = LiveEntity.builder()
			//			.id(4L)
			.category("개")
			.title("441")
			.room("4")
			.shelter(shelterRepository.findByIdAndExpiredLike(1L, "F").get())
			.build();
		liveRepository.save(live14);

		LocalDateTime localDateTime = LocalDateTime.of(2023, 02, 14, 11, 24, 55);
		LikeAnimalEntity like = LikeAnimalEntity.builder()
			.user(userRepository.findByIdAndExpiredLike(10L, "F").get())
			.animal(animalRepository.findByIdAndExpiredLike(10L, "F").get())
			.expiredDate(localDateTime)
			.build();

		likeAnimalRepository.save(like);

		LocalDateTime localDateTime1 = LocalDateTime.of(2023, 02, 14, 11, 55, 55);
		LikeAnimalEntity like1 = LikeAnimalEntity.builder()
			.user(userRepository.findByIdAndExpiredLike(10L, "F").get())
			.animal(animalRepository.findByIdAndExpiredLike(1L, "F").get())
			.expiredDate(localDateTime1)
			.build();

		likeAnimalRepository.save(like1);

		LocalDateTime localDateTime2 = LocalDateTime.of(2023, 02, 14, 11, 36, 55);
		LikeAnimalEntity like2 = LikeAnimalEntity.builder()
			.user(userRepository.findByIdAndExpiredLike(10L, "F").get())
			.animal(animalRepository.findByIdAndExpiredLike(5L, "F").get())
			.expiredDate(localDateTime2)
			.build();

		likeAnimalRepository.save(like2);

		LocalDateTime localDateTime3 = LocalDateTime.of(2023, 02, 14, 11, 59, 59);
		LikeAnimalEntity like3 = LikeAnimalEntity.builder()
			.user(userRepository.findByIdAndExpiredLike(10L, "F").get())
			.animal(animalRepository.findByIdAndExpiredLike(6L, "F").get())
			.expiredDate(localDateTime3)
			.build();

		likeAnimalRepository.save(like3);

		LocalDateTime localDateTime4 = LocalDateTime.of(2023, 02, 14, 10, 36, 55);
		LikeAnimalEntity like4 = LikeAnimalEntity.builder()
			.user(userRepository.findByIdAndExpiredLike(10L, "F").get())
			.animal(animalRepository.findByIdAndExpiredLike(3L, "F").get())
			.expiredDate(localDateTime4)
			.build();

		likeAnimalRepository.save(like4);

		LocalDateTime localDateTime5 = LocalDateTime.of(2023, 02, 14, 12, 36, 55);
		LikeAnimalEntity like5 = LikeAnimalEntity.builder()
			.user(userRepository.findByIdAndExpiredLike(10L, "F").get())
			.animal(animalRepository.findByIdAndExpiredLike(2L, "F").get())
			.expiredDate(localDateTime5)
			.build();

		likeAnimalRepository.save(like5);

	}

}
