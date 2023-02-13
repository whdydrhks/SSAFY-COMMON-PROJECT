/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import '../../styles/slick-theme.css';
import '../../styles/slick.css';
import Slider from 'react-slick';
import { useRecoilState, useRecoilValue } from 'recoil';
import API_URL from '../../api/api';
import { getCookie } from '../../pages/Account/cookie';
import {
  twoWeeksAtom,
  timetableShelterIdAtom,
  todayTimeAtom,
  dayTimeAtom,
  scheduleAtom,
} from '../../recoilState';

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

function CreateSchedule() {
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

  const accessToken = getCookie('accessToken');
  const [timetableShelterNickname, setTimetableShelterNickname] = useState('');
  const timetableShelterId = useRecoilValue(timetableShelterIdAtom);
  const [twoWeeks, setTwoWeeks] = useRecoilState(twoWeeksAtom);
  const [dayTime, setDayTime] = useRecoilState(dayTimeAtom);
  const [clickDate, setClickDate] = useState('');
  const [todayTimeArr, setTodayTimeArr] = useState([]);
  const [scheduleHost, setScheduleHost] = useRecoilState(scheduleAtom);

  const handleClickDate = (cDate, idx) => {
    const today = new Date();
    const day = today.getDay();
    setTodayTimeArr(dayTime[(day + idx) % 7].split(''));
    setClickDate(cDate);
  };

  const handleCreateSchedule = idx => {
    console.log(clickDate);
    console.log(timetableShelterNickname);
    console.log(idx);
    axios.post(
      `${API_URL}/schedule/register`,
      {
        day: clickDate,
        shelterNickname: timetableShelterNickname,
        time: idx,
      },
      { headers: { Authorization: accessToken } },
    );
  };

  useEffect(() => {
    const weeks = [];
    for (let i = 1; i < 14; i += 1) {
      const to = new Date();
      const nxtDay = new Date(to.setDate(to.getDate() + i));
      const todayMonth = (nxtDay.getMonth() + 1).toString();
      const todayDate = nxtDay.getDate().toString();
      weeks.push({ month: todayMonth, day: todayDate });
    }
    setTwoWeeks(weeks);

    axios
      .get(`${API_URL}/shelter/${timetableShelterId}/timetable`)
      .then(res =>
        setDayTime([
          res.data.data.sun,
          res.data.data.mon,
          res.data.data.tue,
          res.data.data.wed,
          res.data.data.thr,
          res.data.data.fri,
          res.data.data.sat,
        ]),
      );

    axios
      .get(`${API_URL}/shelter/${timetableShelterId}`)
      .then(res => setTimetableShelterNickname(res.data.data.name));
  }, []);

  return (
    <>
      <Slider {...settings}>
        {twoWeeks.map((date, index) => (
          <SButtonDiv key={index}>
            <SButton
              type="button"
              value={date.month.padStart(2, '0') + date.day.padStart(2, '0')}
              onClick={() =>
                handleClickDate(
                  date.month.padStart(2, '0') + date.day.padStart(2, '0'),
                  index,
                )
              }
            >
              {date.month}월 {date.day}일
            </SButton>
          </SButtonDiv>
        ))}
      </Slider>
      <STimeList>
        {todayTimeArr.map((item, index) =>
          index >= 9 && index <= 17 ? (
            <STimeBox key={index}>
              <STime>
                {index.toString().padStart(2, '0')}:00 ~{' '}
                {(index + 1).toString().padStart(2, '0')}:00
              </STime>
              {item === '1' ? (
                <SClickButton
                  bgColor="green"
                  onClick={() => handleCreateSchedule(index)}
                >
                  예약하기
                </SClickButton>
              ) : (
                <SClickButton bgColor="grey" disabled>
                  예약불가
                </SClickButton>
              )}
            </STimeBox>
          ) : null,
        )}
        {/* {todaySchedule.map((schedule, index) => (
          <STimeBox key={index}>
            <SContainer>
              <div>
                <STime>
                  {schedule.time.toString().padStart(2, '0')}:00 ~{' '}
                  {(schedule.time + 1).toString().padStart(2, '0')}:00
                </STime>
                <SNickName>{schedule.userNickname}</SNickName>
              </div>
              <div>예약</div>
            </SContainer>
          </STimeBox>
        ))} */}
      </STimeList>
    </>
  );
}
export default CreateSchedule;
