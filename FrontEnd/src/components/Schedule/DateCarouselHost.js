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
import { twoWeeksAtom, userAtom } from '../../recoilState';

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
  const [twoWeeks, setTwoWeeks] = useRecoilState(twoWeeksAtom);
  useEffect(() => {
    for (let i = 0; i < 14; i += 1) {
      const today = new Date();
      const nxtDay = new Date(today.setDate(today.getDate() + i));
      setTwoWeeks([...twoWeeks, nxtDay]);
    }
    const today = new Date().getMonth();
    console.log(typeof today);
  }, []);

  return (
    <>
      <Slider {...settings}>
        {twoWeeks.map((item, index) => (
          <SButtonDiv key={index}>
            <SButton
              type="button"
              value={item}
              // className={'btn' + (index === btnActive ? ' active' : '')
            >
              {item.month}월 {item.day}일
            </SButton>
          </SButtonDiv>
        ))}
      </Slider>
      <STimeList>sdf</STimeList>
    </>
  );
}

export default DayCarouselHost;
