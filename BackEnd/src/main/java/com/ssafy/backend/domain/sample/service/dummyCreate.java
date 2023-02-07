package com.ssafy.backend.domain.sample.service;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.ssafy.backend.domain.animal.entity.AnimalEntity;
import com.ssafy.backend.domain.animal.repository.AnimalRepository;
import com.ssafy.backend.domain.shelter.entity.ShelterEntity;
import com.ssafy.backend.domain.shelter.repository.ShelterRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class dummyCreate {

	private final AnimalRepository animalRepository;
	private final ShelterRepository shelterRepository;

	// 테스트용 더미 데이터 생성용
	@Transactional
	@PostConstruct
	public void testInitializing() {

		// 보호소 생성
		for (int i = 1; i <= 10; i++) {
			String name = "보호소_" + String.format("%03d", i);
			ShelterEntity shelter = ShelterEntity.builder()
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
			String name = "동물" + String.format("%03d", i);
			String gender = i % 2 == 0 ? "M" : "F";
			AnimalEntity animal = AnimalEntity.builder()
				.shelter(shelterRepository.findByIdAndExpiredLike(i % 3 + 1L, "F").get())
				.manageCode("23-02-" + gender + "-" + String.format("%04d", i))
				.name(name)
				.breed("믹스")
				.age(i % 10 + 1)
				.weight(i % 5 + 5)
				.gender(gender)
				.neuter("T")
				.build();
			animalRepository.save(animal);
		}

		//		System.out.println(shelterRepository.findById(1L).get().toString());

	}
}
