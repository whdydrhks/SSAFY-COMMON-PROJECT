/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import {
  animalListState,
  scheduleHostAtom,
  scheduleUserAtom,
  twoWeeksAtom,
  userAtom,
} from '../recoilState';
import Header from '../components/common/Header';
import Nav from '../components/common/Nav';
import ImageCarousel from '../components/common/ImageCarousel';
import ReviewList from '../components/Review/ReviewList';

const STitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
  margin-left: 1rem;
  margin-right: 1rem;
`;

const STitle = styled.h1`
  font-family: 'cafe24';
  font-size: 2rem;
`;

const SLiveMoreLink = styled(Link)`
  font-size: 1.5rem;
  font-family: 'cafe24';
  text-decoration: none;
  margin-top: 20px;
`;

const SReviewTitle = styled.div`
  margin-top: 20px;
  font-family: 'cafe24';
  font-size: 2rem;
`;

const SReviewMoreLink = styled(Link)`
  font-size: 1.5rem;
  font-family: 'cafe24';
  text-decoration: none;
  margin-top: 20px;
`;

const SLine = styled.div`
  height: 10px;
  background-color: #d9d9d9;
  opacity: 0.4;
`;

const SBox = styled.div`
  margin-left: 2rem;
  margin-right: 2rem;
`;

function Home() {
  return (
    <>
      <Header />
      <STitleBox>
        <STitle>Live</STitle>
        <SLiveMoreLink to="/live">더 보기 &gt;</SLiveMoreLink>
      </STitleBox>
      <ImageCarousel page="Home" />
      {/* <SReviewContainer>리뷰컨테이너~</SReviewContainer> */}
      {/* <br /> */}
      <SLine />

      <STitleBox>
        <SReviewTitle>입양 후기</SReviewTitle>
        <SReviewMoreLink to="/review">더 보기 &gt;</SReviewMoreLink>
      </STitleBox>
      <SBox>
        <ReviewList />
      </SBox>
      <Nav />
    </>
  );
}

export default Home;
