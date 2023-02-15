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
import Slider from 'react-slick';
import { Button, FormControlLabel, Switch } from '@mui/material';
import { useRecoilValue, useRecoilState } from 'recoil';
import API_URL from '../../api/api';
import { dayTimeAtom, todayTimeAtom, userAtom } from '../../recoilState';

const SButtonDiv = styled.div`
  text-align: center;
  width: 100%;
  margin-bottom: 0.5rem;
`;

const SButton = styled.button`
  width: 100%;
  background-color: white;
  border: none;
  font-size: 1.5rem;
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
const SSwitch = styled(Switch)`
  margin-right: 2rem;
`;

const SContainer = styled.div`
  display: flex;
  justify-content: right;
`;
const SClickButton = styled.button`
  width: 30%;
  height: 2.5rem;
  border: none;
  margin-top: 1rem;
  font-size: 1rem;
  /* align-items: right; */
  border-radius: 10px;
  font-family: mainFont;
  color: black;
  margin-right: 1rem;
  background-color: rgba(150, 120, 210, 0.2);
`;

const STimeList = styled.div``;
const STimeBox = styled.div`
  height: 6.7vh;
  display: flex;
  align-items: center;
  font-size: 2rem;
  justify-content: space-between;
  font-family: mainFont;
  border-bottom: 1px rgba(0,0,0,0.2) solid;
`;
const STime = styled.div`
  padding-left: 1.5rem;
  font-family: mainFont;
  border-radius: 10px;
`;

function TimeTableHost() {
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

  let newDayTime = [];
  const { shelterId } = useRecoilValue(userAtom);
  const [dayTime, setDayTime] = useRecoilState(dayTimeAtom);
  const [todayTime, setTodayTime] = useRecoilState(todayTimeAtom);

  const false2true = time => {
    setTodayTime(
      () =>
        todayTime.substring(0, time) +
        '1' +
        todayTime.substring(time + 1, todayTime.length),
    );
  };

  const true2false = time => {
    setTodayTime(
      () =>
        todayTime.substring(0, time) +
        '0' +
        todayTime.substring(time + 1, todayTime.length),
    );
  };

  const handleNineChange = event => {
    console.log(event.target.checked);
    if (event.target.checked === true) {
      false2true(9);
    } else {
      true2false(9);
    }
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
    axios
      .get(`${API_URL}/shelter/${shelterId}/timetable`, { shelterId })
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
  }, []);

  // const [btnActive, setBtnActive] = useState('');

  // const toggleActive = e => {
  //   setBtnActive(e.target.value);
  // };

  const handleSetDayTime = () => {
    const isSet = window.confirm('시간 설정을 변경하시겠습니까?');
    if (!isSet) return;
    if (todayTime[24] === '0') {
      newDayTime = [
        todayTime,
        dayTime[1],
        dayTime[2],
        dayTime[3],
        dayTime[4],
        dayTime[5],
        dayTime[6],
      ];
    } else if (todayTime[24] === '1') {
      newDayTime = [
        dayTime[0],
        todayTime,
        dayTime[2],
        dayTime[3],
        dayTime[4],
        dayTime[5],
        dayTime[6],
      ];
    } else if (todayTime[24] === '2') {
      newDayTime = [
        dayTime[0],
        dayTime[1],
        todayTime,
        dayTime[3],
        dayTime[4],
        dayTime[5],
        dayTime[6],
      ];
    } else if (todayTime[24] === '3') {
      newDayTime = [
        dayTime[0],
        dayTime[1],
        dayTime[2],
        todayTime,
        dayTime[4],
        dayTime[5],
        dayTime[6],
      ];
    } else if (todayTime[24] === '4') {
      newDayTime = [
        dayTime[0],
        dayTime[1],
        dayTime[2],
        dayTime[3],
        todayTime,
        dayTime[5],
        dayTime[6],
      ];
    } else if (todayTime[24] === '5') {
      newDayTime = [
        dayTime[0],
        dayTime[1],
        dayTime[2],
        dayTime[3],
        dayTime[4],
        todayTime,
        dayTime[6],
      ];
    } else if (todayTime[24] === '6') {
      newDayTime = [
        dayTime[0],
        dayTime[1],
        dayTime[2],
        dayTime[3],
        dayTime[4],
        dayTime[5],
        todayTime,
      ];
    }
  };

  const handleSetDayTimeButton = () => {
    handleSetDayTime();
    axios.put(`${API_URL}/shelter/${shelterId}/timetable`, {
      dayString: newDayTime,
    });
    setDayTime(newDayTime);
    // axios
    //   .get(`${API_URL}/timetable/${shelterId}`, { shelterId })
    //   .then(res =>
    //     setDayTime(() => [
    //       res.data.data.sun,
    //       res.data.data.mon,
    //       res.data.data.tue,
    //       res.data.data.wed,
    //       res.data.data.thr,
    //       res.data.data.fri,
    //       res.data.data.sat,
    //     ]),
    //   );
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
              }}
            >
              {item}
            </SButton>
          </SButtonDiv>
        ))}
      </Slider>
      <STimeList>
        <STimeBox>
          {/* {dayTime[9]} */}
          <STime>&nbsp;&nbsp;&nbsp;09:00 ~ 10:00</STime>
          <SSwitch
            checked={todayTime[9] === '1' ? true : false}
            onChange={handleNineChange}
            inputProps={{ 'aria-label': 'controlled' }}
            defaultChecked color="secondary"
          />
        </STimeBox>
        <STimeBox>
          <STime>&nbsp;&nbsp;&nbsp;10:00 ~ 11:00</STime>
          <SSwitch
            checked={todayTime[10] === '1' ? true : false}
            onChange={handleTenChange}
            inputProps={{ 'aria-label': 'controlled' }}
            defaultChecked color="secondary"
          />
        </STimeBox>
        <STimeBox>
          <STime>&nbsp;&nbsp;&nbsp;11:00&nbsp;~&nbsp;12:00</STime>
          <SSwitch
            checked={todayTime[11] === '1' ? true : false}
            onChange={handleElevenChange}
            inputProps={{ 'aria-label': 'controlled' }}
            defaultChecked color="secondary"
          />
        </STimeBox>
        <STimeBox>
          <STime>&nbsp;&nbsp;&nbsp;12:00 ~ 13:00</STime>
          <SSwitch
            checked={todayTime[12] === '1' ? true : false}
            onChange={handleTwelveChange}
            inputProps={{ 'aria-label': 'controlled' }}
            defaultChecked color="secondary"
          />
        </STimeBox>
        <STimeBox>
          <STime>&nbsp;&nbsp;&nbsp;13:00 ~ 14:00</STime>
          <SSwitch
            checked={todayTime[13] === '1' ? true : false}
            onChange={handleThirteenChange}
            inputProps={{ 'aria-label': 'controlled' }}
            defaultChecked color="secondary"
          />
        </STimeBox>
        <STimeBox>
          <STime>&nbsp;&nbsp;&nbsp;14:00 ~ 15:00</STime>
          <SSwitch
            checked={todayTime[14] === '1' ? true : false}
            onChange={handleFourteenChange}
            inputProps={{ 'aria-label': 'controlled' }}
            defaultChecked color="secondary"
          />
        </STimeBox>
        <STimeBox>
          <STime>&nbsp;&nbsp;&nbsp;15:00 ~ 16:00</STime>
          <SSwitch
            checked={todayTime[15] === '1' ? true : false}
            onChange={handleFifteenChange}
            textColor="secondary"
            indicatorColor="secondary"
            inputProps={{ 'aria-label': 'controlled' }}
            defaultChecked color="secondary"
          />
        </STimeBox>
        <STimeBox>
          <STime>&nbsp;&nbsp;&nbsp;16:00 ~ 17:00</STime>
          <SSwitch
            checked={todayTime[16] === '1' ? true : false}
            onChange={handleSixteenChange}
            inputProps={{ 'aria-label': 'controlled' }}
            defaultChecked color="secondary"
          />
        </STimeBox>
        <STimeBox>
          <STime>&nbsp;&nbsp;&nbsp;17:00 ~ 18:00</STime>
          <SSwitch
            checked={todayTime[17] === '1' ? true : false}
            onChange={handleSeventeenChange}
            inputProps={{ 'aria-label': 'controlled' }}
            defaultChecked color="secondary"
          />
        </STimeBox>
      </STimeList>
      <SContainer>
      <SClickButton onClick={handleSetDayTimeButton}>적용하기</SClickButton>
      </SContainer>
    </>
  );
}

export default TimeTableHost;
