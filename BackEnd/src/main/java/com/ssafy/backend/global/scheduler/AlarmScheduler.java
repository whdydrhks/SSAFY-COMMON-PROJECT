package com.ssafy.backend.global.scheduler;

import com.ssafy.backend.domain.alarm.entity.AlarmEntity;
import com.ssafy.backend.domain.alarm.repository.AlarmRepository;
import com.ssafy.backend.domain.animal.entity.LikeAnimalEntity;
import com.ssafy.backend.domain.animal.repository.AnimalRepository;
import com.ssafy.backend.domain.animal.repository.LikeAnimalRepository;
import com.ssafy.backend.domain.schedule.entity.ScheduleEntity;
import com.ssafy.backend.domain.schedule.repository.ScheduleRepository;
import com.ssafy.backend.global.file.entity.FileEntity;
import com.ssafy.backend.global.file.service.FileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Slf4j
@Service
@EnableAsync
@RequiredArgsConstructor
public class AlarmScheduler {

    private final AlarmRepository alarmRepository;
    private final ScheduleRepository scheduleRepository;
    private final LikeAnimalRepository likeAnimalRepository;
    private final FileService fileService;

    // 매일 새벽1시마다 당일 예약 알람 생성
    @Async
    @Scheduled(cron = "0 0 1 * * *", zone = "Asia/Seoul")
    @Transactional
    public void dailyScheduleAlarm(){

        LocalDate now = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMdd");
        String day = now.format(formatter);

        List<ScheduleEntity> todayScheduleList = scheduleRepository.findByDay(day, Sort.by(Sort.Order.asc("time")));
        List<AlarmEntity> alarmList = new ArrayList<>();

        for(ScheduleEntity schedule : todayScheduleList){

            AlarmEntity userAlarm = AlarmEntity.builder()
                    .receiver(schedule.getUser())
                    .alarmType(1)
                    .time(schedule.getTime())
                    .targetName(schedule.getShelter().getName())
                    .build();

            alarmList.add(userAlarm);

            AlarmEntity shelterAlarm = AlarmEntity.builder()
                    .receiver(schedule.getShelter().getUser())
                    .alarmType(2)
                    .time(schedule.getTime())
                    .targetName(schedule.getUser().getName())
                    .build();

            alarmList.add(shelterAlarm);
        }
        alarmRepository.saveAll(alarmList);
    }

    // 매 시간마다 동물 만료 알람 생성
    @Async
    @Transactional
    @Scheduled(cron = "0 0 0/1 * * *", zone = "Asia/Seoul")
    public void expiredLikeAnimalAlarm(){

        LocalDateTime now = LocalDateTime.now();

        List<LikeAnimalEntity> likeAnimalEntityList = likeAnimalRepository.findAll(Sort.by(Sort.Order.asc("expiredDate")));
        List<AlarmEntity> alarmList = new ArrayList<>();

        for(LikeAnimalEntity likeAnimal : likeAnimalEntityList){

            if(now.isAfter(likeAnimal.getExpiredDate())){

                AlarmEntity alarm = AlarmEntity.builder()
                        .receiver(likeAnimal.getUser())
                        .alarmType(5)
                        .targetName(likeAnimal.getAnimal().getName())
                        .build();

                alarmList.add(alarm);

                likeAnimalRepository.delete(likeAnimal);
            }
            else{
                break;
            }
        }
        alarmRepository.saveAll(alarmList);
    }
}
