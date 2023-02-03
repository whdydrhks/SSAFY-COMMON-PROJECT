/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import '../../styles/slick-theme.css';
import '../../styles/slick.css';
import '../../styles/cafe24.css';
import Slider from 'react-slick';

const STitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
`;

const STitle = styled.h1`
  font-family: 'cafe24';
  font-size: 2rem;
`;

const SMoreLink = styled(Link)`
  font-size: 1.5rem;
  font-family: 'cafe24';
  text-decoration: none;
`;
const SLiveVideo = styled.div`
  width: 240px;
  height: 120px;
  border: 1px solid black;
`;

const SSlider = styled(Slider)`
  margin-bottom: 5rem;
`;

function HomeLiveCarousel() {
  const settings = {
    arrows: false,
    autoplay: true,
    // centerMode: true,
    centerPadding: '0px',
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  return (
    <div>
      <STitleBox>
        <STitle>Live</STitle>
        <SMoreLink to="/live">더 보기 &gt;</SMoreLink>
      </STitleBox>
      <SSlider {...settings}>
        <SLiveVideo>1</SLiveVideo>
        <SLiveVideo>2</SLiveVideo>
        <SLiveVideo>3</SLiveVideo>
        <SLiveVideo>4</SLiveVideo>
        <SLiveVideo>5</SLiveVideo>
        <SLiveVideo>6</SLiveVideo>
      </SSlider>
    </div>
  );
}

export default HomeLiveCarousel;
