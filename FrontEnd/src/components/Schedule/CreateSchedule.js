/* eslint-disable no-return-assign */
/* eslint-disable prefer-template */
/* eslint-disable no-loop-func */
/* eslint-disable array-callback-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import '../../styles/slick-theme.css';
import '../../styles/slick.css';
import Slider from 'react-slick';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getCookie } from '../../pages/Account/cookie';
import API_URL from '../../api/api';
import {
  twoWeeksAtom,
  timetableShelterIdAtom,
  todayTimeAtom,
  dayTimeAtom,
  scheduleAtom,
} from '../../recoilState';
import '../../styles/fonts.css';

const SImpossibleTitle = styled.div`
  font-size: 2rem;
  text-align: center;
  margin-top: 2rem;
  font-family: mainFont;
`;
const STimeList = styled.div``;
const STimeBox = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: white;
  margin-bottom: 1.2rem;
`;
const STime = styled.div`
  font-size: 2rem;
`;

const SButtonDiv = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
  font-family: mainFont;
`;

const SButton = styled.button`
  width: 80%;
  height: 5vh;
  background-color: rgba(180, 210, 210, 0.8);
  border: none;
  font-size: 1.2rem;
  border-radius: 10px;
  font-family: mainFont;
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
  font-family: mainFont;
  color: white;
  background-color: ${props => props.bgColor};
`;

function CreateSchedule(props) {
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

  const buttonRef = useRef([]);
  const tod = new Date();
  const accessToken = getCookie('accessToken');
  const [timetableShelterNickname, setTimetableShelterNickname] = useState('');
  const timetableShelterId = useRecoilValue(timetableShelterIdAtom);
  const [twoWeeks, setTwoWeeks] = useRecoilState(twoWeeksAtom);
  const [dayTime, setDayTime] = useRecoilState(dayTimeAtom);
  const [clickDate, setClickDate] = useState(0);
  const [todayTimeArr, setTodayTimeArr] = useState([]);
  const [scheduleHost, setScheduleHost] = useRecoilState(scheduleAtom);
  const copyArr = [];

  const handleClickDate = (e, k) => {
    setClickDate(e.target.value);
    const initial = '000000000';

    for (let i = 0; i < 14; i += 1) {
      const today = new Date();
      const next = new Date(today.setDate(today.getDate() + i));
      const nextDate =
        (next.getMonth() + 1).toString().padStart(2, '0') +
        next.getDate().toString().padStart(2, '0');
      const nextDay = next.getDay();
      const last = nextDay;
      const lastStr = nextDay.toString();

      let t9 = '1';
      let t10 = '1';
      let t11 = '1';
      let t12 = '1';
      let t13 = '1';
      let t14 = '1';
      let t15 = '1';
      let t16 = '1';
      let t17 = '1';

      if (dayTime[last][9] === '0') {
        t9 = '0';
      } else {
        scheduleHost.map(schedule => {
          if (schedule.day === nextDate && schedule.time === 9) {
            t9 = '0';
          }
        });
      }
      if (dayTime[last][10] === '0') {
        t10 = '0';
      } else {
        scheduleHost.map(schedule => {
          if (schedule.day === nextDate && schedule.time === 10) {
            t10 = '0';
          }
        });
      }
      if (dayTime[last][11] === '0') {
        t11 = '0';
      } else {
        scheduleHost.map(schedule => {
          if (schedule.day === nextDate && schedule.time === 11) {
            t11 = '0';
          }
        });
      }

      if (dayTime[last][12] === '0') {
        t12 = '0';
      } else {
        scheduleHost.map(schedule => {
          if (schedule.day === nextDate && schedule.time === 12) {
            t12 = '0';
          }
        });
      }
      if (dayTime[last][13] === '0') {
        t13 = '0';
      } else {
        scheduleHost.map(schedule => {
          if (schedule.day === nextDate && schedule.time === 13) {
            t13 = '0';
          }
        });
      }
      if (dayTime[last][14] === '0') {
        t14 = '0';
      } else {
        scheduleHost.map(schedule => {
          if (schedule.day === nextDate && schedule.time === 14) {
            t14 = '0';
          }
        });
      }
      if (dayTime[last][15] === '0') {
        t15 = '0';
      } else {
        scheduleHost.map(schedule => {
          if (schedule.day === nextDate && schedule.time === 15) {
            t15 = '0';
          }
        });
      }
      if (dayTime[last][16] === '0') {
        t16 = '0';
      } else {
        scheduleHost.map(schedule => {
          if (schedule.day === nextDate && schedule.time === 16) {
            t16 = '0';
          }
        });
      }
      if (dayTime[last][17] === '0') {
        t17 = '0';
      } else {
        scheduleHost.map(schedule => {
          if (schedule.day === nextDate && schedule.time === 17) {
            t17 = '0';
          }
        });
      }

      copyArr.push(
        initial +
          t9 +
          t10 +
          t11 +
          t12 +
          t13 +
          t14 +
          t15 +
          t16 +
          t17 +
          '000000' +
          lastStr,
      );
    }
    setTodayTimeArr(copyArr[k].split(''));
  };

  const handleCreateSchedule = idx => {
    if (window.confirm('예약하시겠습니까?')) {
      axios.post(
        `${API_URL}/schedule/register`,
        {
          day: clickDate,
          shelterNickname: timetableShelterNickname,
          time: idx,
        },
        { headers: { Authorization: accessToken } },
      );

      axios
        .get(`${API_URL}/schedule/shelters/${timetableShelterId}`)
        .then(res => setScheduleHost(res.data.data));

      buttonRef.current[idx].style = 'background-color:grey';
      buttonRef.current[idx].innerText = '마감';
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

    axios
      .get(`${API_URL}/shelter/${timetableShelterId}/timetable`, {
        shelterId: timetableShelterId,
      })
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

    axios
      .get(`${API_URL}/schedule/shelters/${timetableShelterId}`)
      .then(res => setScheduleHost(res.data.data));
  }, []);

  return (
    <>
      <Slider {...settings}>
        {twoWeeks.map((date, index) => (
          <SButtonDiv key={index}>
            <SButton
              type="button"
              value={date.month.padStart(2, '0') + date.day.padStart(2, '0')}
              onClick={e => handleClickDate(e, index)}
            >
              {date.month}월 {date.day}일
            </SButton>
          </SButtonDiv>
        ))}
      </Slider>
      <STimeList>
        {/* {clickDate ===
        (tod.getMonth() + 1).toString().padStart(2, '0') +
          tod.getDate().toString().padStart(2, '0') ? (
          <SImpossibleTitle>당일 예약은 불가합니다.</SImpossibleTitle>
        ) : ( */}
        <div>
          {todayTimeArr.map((item, index) =>
            index >= 9 && index <= 17 ? (
              <STimeBox>
                <STime>
                  {index.toString().padStart(2, '0')}:00 ~
                  {(index + 1).toString().padStart(2, '0')}:00
                </STime>
                {item === '0' ? (
                  <SClickButton bgColor="grey" disabled>
                    마감
                  </SClickButton>
                ) : (
                  <SClickButton
                    bgColor="green"
                    onClick={() => handleCreateSchedule(index)}
                    ref={el => (buttonRef.current[index] = el)}
                  >
                    예약
                  </SClickButton>
                )}
              </STimeBox>
            ) : null,
          )}
        </div>
        {/* )} */}
      </STimeList>
    </>
  );
}
export default CreateSchedule;
