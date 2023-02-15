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
import { motion } from "framer-motion";
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
import "../../styles/fonts.css"

const SButtonDiv = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
  border-radius: 10px;
  font-family: mainFont;
`;

const SButton = styled.button`
  width: 90%;
  height: 4vh;
  background-color: white;
  border: none;
  font-size: 1.7em;
  border-radius: 10px;
  font-family: mainFont;
  color: grey;
  /* border: 1px solid gray; */
  color: black;
  border-radius: 40px;
  &:active,
  &:hover {
    color: black;
    background-color: rgba(217,217,243,1);
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  }
`;
const SContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* border-top: 1px solid grey; */
  /* border-bottom: 1px solid grey; */
  background-color: rgba(244,240,230,1);
  border-radius: 45px;
  font-family: mainFont;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`;
const SSContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  /* border-top: 1px solid grey; */
  /* border-bottom: 1px solid grey; */
  /* background-color: yellow; */
  /* border-radius: 50px; */
  font-family: mainFont;
`;
const STimeList = styled.div``;
const STimeBox = styled.div`
  font-size: 2rem;
  justify-content: space-between;
  background-color: white;
  font-family: mainFont;
`;
const STime = styled.div`
  font-size: 3rem;
  font-weight: bold;
  font-family: mainFont;
`;
const SNickName = styled.div`
  font-size: 1.4rem;
  font-family: mainFont;
  margin-bottom: 0.3rem;
`;

const SClickButton = styled.button`
  width: 5.5rem;
  height: 3.5vh;
  border: none;
  font-size: 1.4rem;
  font-family: mainFont;
  color: white;
  margin-left: 4rem;
  border-radius: 45px;
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
    slidesToScroll: 2,
  };

  const dateRef = useRef();
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

  const handleDateClick =  (event,index) => {
     setIsClickDate(() => event.target.value);
    setTodaySchedule(() =>
      scheduleHost.filter(schedule => schedule.day === event.target.value),
    );
    // dareRef.current = index;
    // dateRef.current.style = 
    //   'color : green'
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
                onClick={(e) => handleDateClick(e, index)}
                // ref={dateRef}
            ><motion.div
            whileTap={{ scale: 0.7 }}>
              {date.month}월 {date.day}일
              </motion.div></SButton>
          </SButtonDiv>
        ))}
      </Slider>
      <STimeList>
        {todaySchedule.map((schedule, index) => (
          <STimeBox key={index}>
            <SContainer ref={el => (timeRef.current[index] = el)}>
              <div>
                <STime>
                  {schedule.time.toString().padStart(2, '0')}&nbsp;:&nbsp;00 &nbsp;~&nbsp;{' '}
                  {(schedule.time + 1).toString().padStart(2, '0')}&nbsp;:&nbsp;00
                </STime>
              </div>
              <SSContainer>
                <SNickName>{schedule.userNickname}</SNickName>
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
                      L&nbsp;i&nbsp;v&nbsp;e
                    </SClickButton>
                  </Link>
                ) : null}
                {/* 클릭한 날이 오늘이면서 시간이 지났으면 완료 */}
                {todayDate === isClickDate &&
                today.getHours() > schedule.time ? (
                  <SClickButton bgColor="grey" disabled>
                    완&nbsp;&nbsp;료
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
                    취&nbsp;&nbsp;소
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
                    취&nbsp;&nbsp;소
                  </SClickButton>
                ) : null}
                </div>
                </SSContainer>
            </SContainer>
          </STimeBox>
        ))}
      </STimeList>
    </>
  );
}

export default ScheduleListHost;
