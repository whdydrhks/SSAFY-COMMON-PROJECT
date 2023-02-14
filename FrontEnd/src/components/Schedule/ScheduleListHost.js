/* eslint-disable no-return-assign */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable prefer-template */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-undef */

import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import '../../styles/slick-theme.css';
import '../../styles/slick.css';
import Slider from 'react-slick';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  scheduleAtom,
  todayAtom,
  todayScheduleAtom,
  twoWeeksAtom,
  userAtom,
} from '../../recoilState';
import API_URL from '../../api/api';
import { getCookie } from '../../pages/Account/cookie';

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

  const timeRef = useRef([]);
  const navigate = useNavigate();
  const today = new Date();
  const todayDate =
    (today.getMonth() + 1).toString().padStart(2, '0') +
    today.getDate().toString().padStart(2, '0');
  const accessToken = getCookie('accessToken');
  const user = useRecoilValue(userAtom);
  const [twoWeeks, setTwoWeeks] = useRecoilState(twoWeeksAtom);
  const [scheduleHost, setScheduleHost] = useRecoilState(scheduleAtom);
  const [todaySchedule, setTodaySchedule] = useRecoilState(todayScheduleAtom);
  const [isClickDate, setIsClickDate] = useRecoilState(todayAtom);

  const handleDateClick = event => {
    setIsClickDate(() => event.target.value);
    setTodaySchedule(() =>
      scheduleHost.filter(schedule => schedule.day === event.target.value),
    );
  };

  const handleVideoChatClick = () => {
    navigate('/videochat');
  };

  console.log(scheduleHost);

  const handleDeleteSchedule = (s, index) => {
    if (window.confirm('일정을 삭제하시겠습니까?')) {
      axios.delete(`${API_URL}/schedule/${s.scheduleId}`, {
        headers: { Authorization: accessToken },
      });
      timeRef.current[index].style = 'display :none';

      axios.post(
        `${API_URL}/alarm`,
        {
          alarmType: 3,
          day: s.day,
          receiverId: s.userId,
          targetName: s.shelterNickname,
          time: s.time,
        },
        { headers: { Authorization: accessToken } },
      );
    }
  };

  useEffect(() => {
    const weeks = [];
    for (let i = 0; i < 14; i += 1) {
      const to = new Date();
      const nxtDay = new Date(to.setDate(to.getDate() + i));
      const todayMonth = (nxtDay.getMonth() + 1).toString();
      const todayDate = nxtDay.getDate().toString();
      weeks.push({ month: todayMonth, day: todayDate });
    }
    setTwoWeeks(weeks);
    setIsClickDate(todayDate);
    axios.get(`${API_URL}/schedule/shelters/${user.shelterId}`).then(res => {
      setScheduleHost(res.data.data);
    });
  }, []);

  return (
    <>
      <Slider {...settings}>
        {twoWeeks.map((date, index) => (
          <SButtonDiv key={index}>
            <SButton
              type="button"
              value={date.month.padStart(2, '0') + date.day.padStart(2, '0')}
              onClick={handleDateClick}
            >
              {date.month}월 {date.day}일
            </SButton>
          </SButtonDiv>
        ))}
      </Slider>
      <STimeList>
        {todaySchedule.map((schedule, index) => (
          <STimeBox key={index}>
            <SContainer ref={el => (timeRef.current[index] = el)}>
              <div>
                <STime>
                  {schedule.time.toString().padStart(2, '0')}:00 ~{' '}
                  {(schedule.time + 1).toString().padStart(2, '0')}:00
                </STime>
                <SNickName>{schedule.userNickname}</SNickName>
              </div>
              <div>
                {/* 클릭한 날이 오늘이면서 시간이 동일하다면 Live */}
                {todayDate === isClickDate &&
                today.getHours() === schedule.time ? (
                  <Link
                    to={{
                      pathname: '/videochat',
                    }}
                    state={{ room: schedule.room }}
                  >
                    <SClickButton
                      bgColor="green"
                      onClick={handleVideoChatClick}
                    >
                      Live
                    </SClickButton>
                  </Link>
                ) : null}
                {/* 클릭한 날이 오늘이면서 시간이 지났으면 완료 */}
                {todayDate === isClickDate &&
                today.getHours() > schedule.time ? (
                  <SClickButton bgColor="grey" disabled>
                    완료
                  </SClickButton>
                ) : null}
                {/* 클릭한 날이 오늘이면서 아직 시간이 지나지 않았으면 취소 */}
                {todayDate === isClickDate &&
                today.getHours() < schedule.time ? (
                  <SClickButton
                    bgColor="red"
                    onClick={() => {
                      handleDeleteSchedule(schedule, index);
                    }}
                  >
                    {' '}
                    취소
                  </SClickButton>
                ) : null}
                {/* 날짜가 다르다면 취소 */}
                {todayDate !== isClickDate ? (
                  <SClickButton
                    bgColor="red"
                    onClick={() => {
                      handleDeleteSchedule(schedule, index);
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
