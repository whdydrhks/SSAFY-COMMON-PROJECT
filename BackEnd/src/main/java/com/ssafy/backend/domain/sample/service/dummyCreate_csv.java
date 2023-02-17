package com.ssafy.backend.domain.sample.service;

import java.util.List;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;

import org.apache.commons.csv.CSVRecord;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ssafy.backend.domain.animal.entity.AnimalEntity;
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
import com.ssafy.backend.global.util.CSVUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class dummyCreate_csv {

	// csv 포맷을 사용하 더미를 생성하는 기능은 경로 설정 문제로 서버에서 작동하지 않음!
	@Value("${file.initDummy}")
	private String DUMMY_DIR;

	private final PasswordEncoder passwordEncoder;

	private final CSVUtil csvUtil;

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
	@PostConstruct // 이거 주석 풀면 더미 생성이 동작할 것
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
		List<CSVRecord> userRecords = csvUtil.readClasspathCSV(DUMMY_DIR, "user.csv");
		for (int i = 0; i < userRecords.size(); i++) {
			CSVRecord rec = userRecords.get(i);
			UserEntity user = UserEntity.builder()
				.id(Long.valueOf(rec.get(0)))
				.email(rec.get(1))
				.password(passwordEncoder.encode(rec.get(2)))
				.role(rec.get(3))
				.name(rec.get(4))
				.phoneNumber(rec.get(5))
				.nickname(rec.get(6))
				.profileImage(Integer.valueOf(rec.get(7)))
				.build();
			userRepository.save(user);
		}

		// 보호소 생성
		List<CSVRecord> shelterRecords = csvUtil.readClasspathCSV(DUMMY_DIR, "shelter.csv");
		for (int i = 0; i < shelterRecords.size(); i++) {
			CSVRecord rec = shelterRecords.get(i);
			ShelterEntity shelter = ShelterEntity.builder()
				.id(Long.valueOf(rec.get(0)))
				.user(userRepository.findByIdAndExpiredLike(Long.valueOf(rec.get(1)), "F").get())
				.name(rec.get(2))
				.url(rec.get(3))
				.introduce(rec.get(4))
				.telNumber(rec.get(5))
				.postCode(rec.get(6))
				.address(rec.get(7))
				.build();
			shelterRepository.save(shelter);

			// 타임테이블 생성
			// .week("000000000:padding/000000000:9to17/000000:padding/0:week")
			TimetableEntity timetable = TimetableEntity.builder()
				.shelter(shelterRepository.findByIdAndExpiredLike(Long.valueOf(rec.get(0)), "F").get())
				.sun("0000000011111111100000000")
				.mon("0000000000000000000000001")
				.tue("0000000000001111100000002")
				.wed("0000000011111110000000003")
				.thr("0000000011111111000000004")
				.fri("0000000011001111100000005")
				.sat("0000000011111111100000006")
				.build();
			timetableRepository.save(timetable);
		}

		// 동물 생성
		List<CSVRecord> animalRecords = csvUtil.readClasspathCSV(DUMMY_DIR, "animal.csv");
		for (int i = 0; i < animalRecords.size(); i++) {
			CSVRecord rec = animalRecords.get(i);
			AnimalEntity animal = AnimalEntity.builder()
				.id(Long.valueOf(rec.get(0)))
				.shelter(shelterRepository.findByIdAndExpiredLike(Long.valueOf(rec.get(1)), "F").get())
				.manageCode(rec.get(2))
				.name(rec.get(3))
				.breed(rec.get(4))
				.age(Integer.valueOf(rec.get(5)))
				.weight(Integer.valueOf(rec.get(6)))
				.gender(rec.get(7))
				.neuter(rec.get(8))
				.adoption(rec.get(9))
				.note(rec.get(10))
				.build();
			animalRepository.save(animal);
		}

		// 스케줄 생성
		List<CSVRecord> scheduleRecords = csvUtil.readClasspathCSV(DUMMY_DIR, "schedule.csv");
		for (int i = 0; i < scheduleRecords.size(); i++) {
			CSVRecord rec = scheduleRecords.get(i);
			ScheduleEntity schedule = ScheduleEntity.builder()
				.id(Long.valueOf(rec.get(0)))
				.shelter(shelterRepository.findByIdAndExpiredLike(Long.valueOf(rec.get(1)), "F").get())
				.user(userRepository.findByIdAndExpiredLike(Long.valueOf(rec.get(2)), "F").get())
				.day(rec.get(3))
				.time(Integer.valueOf(rec.get(4)))
				.room(rec.get(5))
				.build();
			scheduleRepository.save(schedule);
		}

		// 라이브 생성
		List<CSVRecord> liveRecords = csvUtil.readClasspathCSV(DUMMY_DIR, "live.csv");
		for (int i = 0; i < liveRecords.size(); i++) {
			CSVRecord rec = liveRecords.get(i);
			LiveEntity live = LiveEntity.builder()
				.id(Long.valueOf(rec.get(0)))
				.shelter(shelterRepository.findByIdAndExpiredLike(Long.valueOf(rec.get(1)), "F").get())
				.title(rec.get(2))
				.category(rec.get(3))
				.room(rec.get(4))
				.build();
			liveRepository.save(live);
		}
	}

}
