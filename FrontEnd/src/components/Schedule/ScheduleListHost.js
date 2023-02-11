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
  margin-bottom: 1.5rem;
`;

const SButton = styled.button`
  width: 80%;
  height: 5vh;
  background-color: rgba(180, 210, 210, 0.8);
  border: none;
  font-size: 1.2rem;
  border-radius: 10px;
  font-family: 'cafe24';
  color: grey;
  &:active,
  &:hover {
    color: black;
    background-color: rgba(180, 230, 230);
  }
`;
const SContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
`;
const STimeList = styled.div``;
const STimeBox = styled.div`
  display: flex;
  font-size: 2rem;
  justify-content: space-between;
  background-color: white;
`;
const STime = styled.div`
  font-size: 2.5rem;
  font-family: 'cafe24';
`;
const SNickName = styled.div`
  font-size: 1.5rem;
  font-family: 'cafe24';
`;

const SClickButton = styled.button`
  width: 5.5rem;
  height: 3.5vh;
  border: none;
  font-size: 1.2rem;
  border-radius: 10px;
  font-family: 'cafe24';
  color: white;
  background-color: ${props => props.bgColor};
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
            <SContainer>
              <div>
                <STime>
                  {item.time.padStart(2, '0')}:00 ~{' '}
                  {(Number(item.time) + 1).toString().padStart(2, '0')}:00
                </STime>
                <SNickName>{item.userId}</SNickName>
              </div>
              <div>
                {today.getHours() > item.time ? (
                  <SClickButton bgColor="grey" disabled>
                    완료
                  </SClickButton>
                ) : null}
                {today.getHours().toString().padStart(2, '0') ===
                item.time.padStart(2, '0') ? (
                  <SClickButton bgColor="green">Live</SClickButton>
                ) : null}
                {today.getHours() < item.time ? (
                  <SClickButton
                    bgColor="red"
                    onClick={() => {
                      // axios.delete(`${API_URL}/schedule/cancle/${item.scheduleId}`);
                    }}
                  >
                    {' '}
                    취소
                  </SClickButton>
                ) : null}
              </div>
            </SContainer>
          </STimeBox>
        ))}
      </STimeList>
    </>
  );
}

export default ScheduleListHost;
