/* eslint-disable prefer-template */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */

import React, { useState } from 'react';
import styled from 'styled-components';
import '../../styles/slick-theme.css';
import '../../styles/slick.css';
import '../../styles/cafe24.css';
import './ButtonCarousel.css';
import Slider from 'react-slick';

const SButtonDiv = styled.div`
  text-align: center;
  margin: 10%;
`;

const SButton = styled.button`
  width: 90%;
  height: 5vh;
  background-color: white;
  border: none;
  font-size: 1rem;
  &.active {
    background-color: lightblue;
  }
`;

const SSlider = styled(Slider)`
  margin-bottom: 5rem;
  width: 100%;
`;

function ButtonCarousel() {
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

  const days = [
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
    '일요일',
  ];

  const [btnActive, setBtnActive] = useState('');

  const toggleActive = e => {
    setBtnActive(e.target.value);
  };

  return (
    <SSlider {...settings}>
      {days.map((item, index) => (
        <SButtonDiv>
          <SButton
            type="button"
            key={index}
            value={item}
            className={'btn' + (index === btnActive ? ' active' : '')}
            onClick={toggleActive}
          >
            {item}
          </SButton>
        </SButtonDiv>
      ))}
    </SSlider>
  );
}

export default ButtonCarousel;
