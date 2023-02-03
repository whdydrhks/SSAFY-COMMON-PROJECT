/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../components/common/Header';
import Nav from '../components/common/Nav';
import HomeLiveCarousel from '../components/Home/HomeLiveCarousel';

const SLine = styled.div`
  height: 10px;
  background-color: #d9d9d9;
  opacity: 0.4;
`;

// const SReviewContainer = styled.div``;

function Home() {
  return (
    <>
      <Header />
      <HomeLiveCarousel />
      {/* <SReviewContainer>리뷰컨테이너~</SReviewContainer> */}
      {/* <br /> */}
      <SLine />
      <Link to="/review">리뷰 더 보기</Link>
      <Nav />
    </>
  );
}

export default Home;
