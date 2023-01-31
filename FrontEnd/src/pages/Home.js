/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import styled from 'styled-components';
import '../styles/slick.css';
import '../styles/slick-theme.css';
import Slider from 'react-slick';
import Header from '../components/common/Header';
import Nav from '../components/common/Nav';

const SLiveVideo = styled.div`
  width: 240px;
  height: 120px;
  border: 1px solid blue;
`;

function LiveCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div>
      <h2> 동영상 캐러셀임</h2>
      <Slider {...settings}>
        <SLiveVideo>1</SLiveVideo>
        <SLiveVideo>2</SLiveVideo>
        <SLiveVideo>3</SLiveVideo>
        <SLiveVideo>4</SLiveVideo>
        <SLiveVideo>5</SLiveVideo>
        <SLiveVideo>6</SLiveVideo>
      </Slider>
    </div>
  );
}

const SLine = styled.div`
  height: 10px;
  background-color: grey;
`;
const SReviewContainer = styled.div``;

function Home() {
  return (
    <>
      <Header />
      <LiveCarousel />
      <SLine />
      <SReviewContainer>리뷰컨테이너~</SReviewContainer>
      <Nav />
    </>
  );
}

export default Home;
