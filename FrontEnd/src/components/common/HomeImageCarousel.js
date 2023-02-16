/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
import styled from 'styled-components';
import '../../styles/slick-theme.css';
import '../../styles/slick.css';
import Slider from 'react-slick';
import cat1 from '../../images/dummy/cat1.png';
import gaejookee from '../../images/dummy/gaejookee.png';
import dog1 from '../../images/dummy/dog1.jpg';
import dogYawn from '../../images/dummy/dogYawn.jpg';

const SBox = styled.div`
  display: flex;
`;

const SImage = styled.img`
  // 기존
  /* width: 240px; */
  /* max-width: 75%; */
  max-height: 14rem;
  border: 1px solid black;
`;

const SSlider = styled(Slider)`
  /* margin-bottom: 5rem; */
`;

const SLiveInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 15px 15px 0 0;
  margin-top: 1rem;
  /* margin-bottom: 1rem; */
  font-family: mainFont;
`;

const SLiveTitleBox = styled.div`
  font-size: 1.5rem;
  margin-left: 1rem;
  text-align: center;
  display: flex;
  align-items: flex-start;
  width: 5rem;
`;

const SShelterNicknameBox = styled.div`
  /* width: 50%; */
  /* text-align: center; */
  align-items: flex-end;
  margin-right: 1rem;
  margin-bottom: 1rem;
`;

function HomeImageCarousel() {
  const settings = {
    arrows: false,
    autoplay: true,
    centerPadding: '0px',
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const images = [cat1, gaejookee, dogYawn, dog1];
  const roomTitle = [
    'cat1Title',
    'gaejookeeTitle',
    'dogYawnTitle',
    'dog1Title',
  ];
  const ShelterName = ['대전동물보호소', '시온쉼터', '댕블리네', '천사의집'];

  return (
    <div>
      {images !== undefined ? (
        <>
          <SSlider {...settings}>
            {roomTitle.map(title => (
              // <SImage src={image} />
              <SLiveInfoBox>
                <SLiveTitleBox>{title}</SLiveTitleBox>
              </SLiveInfoBox>
            ))}
          </SSlider>
          <SSlider {...settings}>
            {ShelterName.map(name => (
              // <SImage src={image} />
              <SLiveInfoBox>
                <SShelterNicknameBox>{name}</SShelterNicknameBox>
              </SLiveInfoBox>
            ))}
          </SSlider>
          <SSlider {...settings}>
            {images.map(image => (
              // <SImage src={image} />
              <SImage src={image} alt="준비중입니다" />
            ))}
          </SSlider>
        </>
      ) : null}
    </div>
  );
}

export default HomeImageCarousel;
