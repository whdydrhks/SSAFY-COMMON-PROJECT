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
  background-color: grey;
`;
const STime = styled.div``;

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

  const { shelterId } = useRecoilValue(userAtom);
  const [twoWeeks, setTwoWeeks] = useRecoilState(twoWeeksAtom);
  const [scheduleHost, setScheduleHost] = useRecoilValue(scheduleHostAtom);
  const [isClickDate, setIsClickDate] = useState('');
  const [todaySchedule, setTodaySchedule] = useState([]);

  const handleDateClick = event => {
    setIsClickDate(event.target.value);
    const tmp = scheduleHost.filter(schedule => schedule.day === isClickDate);
    setTodaySchedule(tmp);
    console.log(scheduleHost);
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
    // console.log(twoWeeks);
    // 등록된 보호소 예약 다 갖고오기
    // axios.get(`${API_URL}/schedule/${shelterId}`).then((res) => )
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
        {/* {todaySchedule.map((item, index) => (
          <div>{item}</div>
        ))} */}
        제발떠라
      </STimeList>
    </>
  );
}

export default ScheduleListHost;
