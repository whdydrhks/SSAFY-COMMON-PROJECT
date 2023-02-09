/* eslint-disable no-shadow */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable prefer-template */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import '../../styles/slick-theme.css';
import '../../styles/slick.css';
import '../../styles/cafe24.css';
import Slider from 'react-slick';
import { Button, Switch } from '@mui/material';
import { useRecoilValue, useRecoilState } from 'recoil';
import { scheduleHostAtom, twoWeeksAtom, userAtom } from '../../recoilState';
import API_URL from '../../api/api';

const SButtonDiv = styled.div`
  text-align: center;
  margin: 10%;
`;

const SButton = styled.button`
  width: 90%;
  height: 5vh;
  background-color: beige;
  border: none;
  font-size: 1rem;
  &.active {
    background-color: lightblue;
  }
`;

const STimeList = styled.div``;
const STimeBox = styled.div`
  display: flex;
  font-size: 2rem;
  justify-content: space-between;
  background-color: white;
`;
const STime = styled.div``;
const SNickName = styled.div``;

const SLiveButton = styled(Button)`
  color: green;
`;
const SCancleButton = styled(Button)`
  color: red;
`;

const today = new Date();
const date =
  (today.getMonth() + 1).toString().padStart(2, '0') +
  today.getDate().toString().padStart(2, '0');

function ScheduleListHost() {
  const settings = {
    arrows: false,
    autoplay: false,
    centerPadding: '10px',
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  const shelterId = useRecoilValue(userAtom);
  const [twoWeeks, setTwoWeeks] = useRecoilState(twoWeeksAtom);
  const scheduleHost = useRecoilValue(scheduleHostAtom);
  const [todaySchedule, setTodaySchedule] = useState([]);
  const [isClickDate, setIsClickDate] = useState(date);

  const handleDateClick = event => {
    setIsClickDate(event.target.value);
    setTodaySchedule(
      scheduleHost.filter(schedule => schedule.day === event.target.value),
    );
  };

  useEffect(() => {
    const weeks = [];
    for (let i = 0; i < 14; i += 1) {
      const today = new Date();
      const nxtDay = new Date(today.setDate(today.getDate() + i));
      const todayMonth = (nxtDay.getMonth() + 1).toString();
      const todayDate = nxtDay.getDate().toString();
      weeks.push({ month: todayMonth, date: todayDate });
    }
    setTwoWeeks(weeks);

    setTodaySchedule(
      scheduleHost.filter(schedule => schedule.day === isClickDate),
    );
    // 등록된 보호소 예약 다 갖고오기
    // axios.get(`${API_URL}/schedule/shelters/${shelterId}`).then((res) => )
    // 취소
    // axios.delete(`${API_URL}/schedule/${userNickname}/${scheduleId}`).then((res) => )
  }, []);

  return (
    <>
      <Slider {...settings}>
        {twoWeeks.map((item, index) => (
          <SButtonDiv key={index}>
            <SButton
              type="button"
              value={item.month.padStart(2, '0') + item.date.padStart(2, '0')}
              // className={'btn' + (index === btnActive ? ' active' : '')
              onClick={handleDateClick}
            >
              {item.month}월 {item.date}일
            </SButton>
          </SButtonDiv>
        ))}
      </Slider>
      <STimeList>
        {todaySchedule.map((item, index) => (
          <STimeBox key={index}>
            <div>
              <STime>
                {item.time.padStart(2, '0')}:00 ~
                {(Number(item.time) + 1).toString().padStart(2, '0')}:00
              </STime>
              <SNickName>{item.userId}</SNickName>
            </div>
            {today.getHours() > item.time ? (
              <Button disabled>완료</Button>
            ) : null}
            {today.getHours().toString().padStart(2, '0') ===
            item.time.padStart(2, '0') ? (
              <SLiveButton>화상채팅</SLiveButton>
            ) : null}
            {today.getHours() < item.time ? (
              <SCancleButton
                onClick={() => {
                  // axios.delete(`${API_URL}/schedule/cancle/${item.scheduleId}`);
                }}
              >
                취소
              </SCancleButton>
            ) : null}
          </STimeBox>
        ))}
      </STimeList>
    </>
  );
}

export default ScheduleListHost;
