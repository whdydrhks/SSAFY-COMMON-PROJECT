package com.ssafy.backend.domain.sample.service;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ssafy.backend.domain.animal.entity.AnimalEntity;
import com.ssafy.backend.domain.animal.repository.AnimalRepository;
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

	// 테스트용 더미 데이터 생성용
	@Transactional
	@PostConstruct
	public void testInitializing() {

		// 기본 유저 이미지 생성
		FileEntity file = FileEntity.builder()
			.originName("default_profile")
			.storeName("default_profile")
			.contentType("image/png")
			.extension("png")
			.build();

		fileRepository.save(file);

		// 기본 동물 이미지 생성
		file = FileEntity.builder()
			.originName("animal_profile")
			.storeName("animal_profile")
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

		// 보호소 생성
		for (int i = 1; i <= 5; i++) {
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

		TimetableEntity timetable2 = TimetableEntity.builder()
			.id(2L)
			.shelterId(2L)
			.mon("0000000000000000000000001")
			.tue("0000000000000000000000002")
			.wed("0000000000000000000000003")
			.thr("0000000000000000000000004")
			.fri("0000000000000000000000005")
			.sat("0000000000000000000000006")
			.sun("0000000000000000000000000")
			.build();
		timetableRepository.save(timetable2);

		ScheduleEntity schedule = ScheduleEntity.builder()
			.day("0210")
			.time(10)
			.room("1")
			.shelter(shelterRepository.findByIdAndExpiredLike(1L, "F").get())
			.user(userRepository.findByIdAndExpiredLike(10L, "F").get())
			.build();

		scheduleRepository.save(schedule);

		ScheduleEntity schedule1 = ScheduleEntity.builder()
			.day("0209")
			.time(11)
			.room("2")
			.shelter(shelterRepository.findByIdAndExpiredLike(1L, "F").get())
			.user(userRepository.findByIdAndExpiredLike(10L, "F").get())
			.build();
		scheduleRepository.save(schedule1);

		ScheduleEntity schedule2 = ScheduleEntity.builder()
			.day("0209")
			.time(8)
			.room("3")
			.shelter(shelterRepository.findByIdAndExpiredLike(1L, "F").get())
			.user(userRepository.findByIdAndExpiredLike(10L, "F").get())
			.build();
		scheduleRepository.save(schedule2);

		ScheduleEntity schedule3 = ScheduleEntity.builder()
			.day("0214")
			.time(5)
			.room("4")
			.shelter(shelterRepository.findByIdAndExpiredLike(1L, "F").get())
			.user(userRepository.findByIdAndExpiredLike(10L, "F").get())
			.build();
		scheduleRepository.save(schedule3);

		ScheduleEntity schedule4 = ScheduleEntity.builder()
			.day("0204")
			.time(17)
			.room("5")
			.shelter(shelterRepository.findByIdAndExpiredLike(1L, "F").get())
			.user(userRepository.findByIdAndExpiredLike(10L, "F").get())
			.build();
		scheduleRepository.save(schedule4);

		LiveEntity live = LiveEntity.builder()
			.image("string")
			.category("개")
			.title("111")
			.shelter(shelterRepository.findByIdAndExpiredLike(1L, "F").get())
			.build();
		liveRepository.save(live);

		LiveEntity live1 = LiveEntity.builder()
			.image("string")
			.category("개")
			.title("555")
			.shelter(shelterRepository.findByIdAndExpiredLike(1L, "F").get())
			.build();
		liveRepository.save(live1);

		LiveEntity live2 = LiveEntity.builder()
			.image("string")
			.category("개")
			.title("333")
			.shelter(shelterRepository.findByIdAndExpiredLike(1L, "F").get())
			.build();
		liveRepository.save(live2);

		LiveEntity live13 = LiveEntity.builder()
			.image("string")
			.category("개")
			.title("222")
			.shelter(shelterRepository.findByIdAndExpiredLike(1L, "F").get())
			.build();
		liveRepository.save(live13);

		LiveEntity live14 = LiveEntity.builder()
			.image("string")
			.category("개")
			.title("441")
			.shelter(shelterRepository.findByIdAndExpiredLike(1L, "F").get())
			.build();
		liveRepository.save(live14);

	}

}
