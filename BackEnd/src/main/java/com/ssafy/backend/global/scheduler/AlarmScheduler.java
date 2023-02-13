package com.ssafy.backend.global.scheduler;

import com.ssafy.backend.domain.alarm.entity.AlarmEntity;
import com.ssafy.backend.domain.alarm.repository.AlarmRepository;
import com.ssafy.backend.domain.schedule.entity.ScheduleEntity;
import com.ssafy.backend.domain.schedule.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@EnableAsync
@RequiredArgsConstructor
public class AlarmScheduler {

    private final AlarmRepository alarmRepository;
    private final ScheduleRepository scheduleRepository;

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
                    .profileImage(schedule.getShelter().getUser().getProfileImage())
                    .build();

            alarmList.add(userAlarm);

            AlarmEntity shelterAlarm = AlarmEntity.builder()
                    .receiver(schedule.getShelter().getUser())
                    .alarmType(2)
                    .time(schedule.getTime())
                    .targetName(schedule.getUser().getName())
                    .profileImage(schedule.getUser().getProfileImage())
                    .build();

            alarmList.add(shelterAlarm);

        }

        alarmRepository.saveAll(alarmList);
    }

}
