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
import API_URL from '../../api/api';
import { userAtom, timeAtom } from '../../recoilState';

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

function DayCarouselHost() {
  const settings = {
    arrows: false,
    autoplay: false,
    centerPadding: '10px',
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  const { shelterId } = useRecoilValue(userAtom);
  const [dayTime, setDayTime] = useRecoilState(timeAtom);
  const [todayTime, setTodayTime] = useState('');

  const false2true = time => {
    setTodayTime(
      todayTime.substring(0, time) +
        '1' +
        todayTime.substring(time + 1, todayTime.length),
    );
  };

  const true2false = time => {
    setTodayTime(
      todayTime.substring(0, time) +
        '0' +
        todayTime.substring(time + 1, todayTime.length),
    );
  };

  const handleNineChange = event => {
    if (event.target.checked === true) {
      false2true(9);
    } else {
      true2false(9);
    }
    setDayTime([
      todayTime,
      dayTime[1],
      dayTime[2],
      dayTime[3],
      dayTime[4],
      dayTime[5],
      dayTime[6],
    ]);
  };
  const handleTenChange = event => {
    if (event.target.checked === true) {
      false2true(10);
    } else {
      true2false(10);
    }
  };
  const handleElevenChange = event => {
    if (event.target.checked === true) {
      false2true(11);
    } else {
      true2false(11);
    }
  };
  const handleTwelveChange = event => {
    if (event.target.checked === true) {
      false2true(12);
    } else {
      true2false(12);
    }
  };
  const handleThirteenChange = event => {
    if (event.target.checked === true) {
      false2true(13);
    } else {
      true2false(13);
    }
  };
  const handleFourteenChange = event => {
    if (event.target.checked === true) {
      false2true(14);
    } else {
      true2false(14);
    }
  };
  const handleFifteenChange = event => {
    if (event.target.checked === true) {
      false2true(15);
    } else {
      true2false(15);
    }
  };
  const handleSixteenChange = event => {
    if (event.target.checked === true) {
      false2true(16);
    } else {
      true2false(16);
    }
  };
  const handleSeventeenChange = event => {
    if (event.target.checked === true) {
      false2true(17);
    } else {
      true2false(17);
    }
  };

  const days = [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ];

  useEffect(() => {
    // axios
    //   .get(`${API_URL}/timetable/${shelterId}`, { shelterId })
    //   .then(res => setDayTime(res.data));
  }, []);

  // const [btnActive, setBtnActive] = useState('');

  // const toggleActive = e => {
  //   setBtnActive(e.target.value);
  // };

  const handleSetDayTime = () => {
    if (todayTime[24] === '0') {
      setDayTime([
        todayTime,
        dayTime[1],
        dayTime[2],
        dayTime[3],
        dayTime[4],
        dayTime[5],
        dayTime[6],
      ]);
    } else if (todayTime[24] === '1') {
      setDayTime([
        dayTime[0],
        todayTime,
        dayTime[2],
        dayTime[3],
        dayTime[4],
        dayTime[5],
        dayTime[6],
      ]);
    } else if (todayTime[24] === '2') {
      setDayTime([
        dayTime[0],
        dayTime[1],
        todayTime,
        dayTime[3],
        dayTime[4],
        dayTime[5],
        dayTime[6],
      ]);
    } else if (todayTime[24] === '3') {
      setDayTime([
        dayTime[0],
        dayTime[1],
        dayTime[2],
        todayTime,
        dayTime[4],
        dayTime[5],
        dayTime[6],
      ]);
    } else if (todayTime[24] === '4') {
      setDayTime([
        dayTime[0],
        dayTime[1],
        dayTime[2],
        dayTime[3],
        todayTime,
        dayTime[5],
        dayTime[6],
      ]);
    } else if (todayTime[24] === '5') {
      setDayTime([
        dayTime[0],
        dayTime[1],
        dayTime[2],
        dayTime[3],
        dayTime[4],
        todayTime,
        dayTime[6],
      ]);
    } else if (todayTime[24] === '6') {
      setDayTime([
        dayTime[0],
        dayTime[1],
        dayTime[2],
        dayTime[3],
        dayTime[4],
        dayTime[5],
        todayTime,
      ]);
    }

    // axios~!
  };

  return (
    <>
      <Slider {...settings}>
        {days.map((item, index) => (
          <SButtonDiv key={index}>
            <SButton
              type="button"
              value={item}
              // className={'btn' + (index === btnActive ? ' active' : '')}
              onClick={() => {
                if (item === '일요일') {
                  setTodayTime(dayTime[0]);
                } else if (item === '월요일') {
                  setTodayTime(dayTime[1]);
                } else if (item === '화요일') {
                  setTodayTime(dayTime[2]);
                } else if (item === '수요일') {
                  setTodayTime(dayTime[3]);
                } else if (item === '목요일') {
                  setTodayTime(dayTime[4]);
                } else if (item === '금요일') {
                  setTodayTime(dayTime[5]);
                } else if (item === '토요일') {
                  setTodayTime(dayTime[6]);
                }
                console.log(todayTime);
              }}
            >
              {item}
            </SButton>
          </SButtonDiv>
        ))}
      </Slider>
      <STimeList>
        <STimeBox>
          {dayTime[9]}
          <STime>09:00 ~ 10:00</STime>
          <Switch
            checked={todayTime[9] === '1' ? true : false}
            onChange={handleNineChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </STimeBox>
        <STimeBox>
          <STime>10:00 ~ 11:00</STime>
          <Switch
            checked={todayTime[10] === '1' ? true : false}
            onChange={handleTenChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </STimeBox>
        <STimeBox>
          <STime>11:00 ~ 12:00</STime>
          <Switch
            checked={todayTime[11] === '1' ? true : false}
            onChange={handleElevenChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </STimeBox>
        <STimeBox>
          <STime>12:00 ~ 13:00</STime>
          <Switch
            checked={todayTime[12] === '1' ? true : false}
            onChange={handleTwelveChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </STimeBox>
        <STimeBox>
          <STime>13:00 ~ 14:00</STime>
          <Switch
            checked={todayTime[13] === '1' ? true : false}
            onChange={handleThirteenChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </STimeBox>
        <STimeBox>
          <STime>14:00 ~ 15:00</STime>
          <Switch
            checked={todayTime[14] === '1' ? true : false}
            onChange={handleFourteenChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </STimeBox>
        <STimeBox>
          <STime>15:00 ~ 16:00</STime>
          <Switch
            checked={todayTime[15] === '1' ? true : false}
            onChange={handleFifteenChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </STimeBox>
        <STimeBox>
          <STime>16:00 ~ 17:00</STime>
          <Switch
            checked={todayTime[16] === '1' ? true : false}
            onChange={handleSixteenChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </STimeBox>
        <STimeBox>
          <STime>17:00 ~ 18:00</STime>
          <Switch
            checked={todayTime[17] === '1' ? true : false}
            onChange={handleSeventeenChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </STimeBox>
      </STimeList>
      <Button onClick={handleSetDayTime}>적용하기</Button>
    </>
  );
}

export default DayCarouselHost;
