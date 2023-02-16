/* eslint-disable import/order */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-unresolved */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { userAtom, liveListAtom } from '../recoilState';
import Header from '../components/common/Header';
import Nav from '../components/common/Nav';
import HomeImageCarousel from '../components/common/HomeImageCarousel';
import ReviewList from '../components/Review/ReviewList';
import axios from 'axios';
import API_URL from '../api/api';

// 1976d2
const SLiveContainer = styled.div`
  flex-direction: column;
  height: 20rem;
  margin: auto;
  margin-bottom: 2.5rem;
  display: flex;
  text-align: right;
  border: 1px solid black;
  border-radius: 15px;
  font-family: mainFont;
`;

const STitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  margin-left: 1rem;
  margin-right: 1rem;
`;

const SDivideLine = styled.div`
  background-color: white;
  border: 1px solid lightgray;
  border-left: none;
  border-right: none;
  border-bottom: none;
`;

const SReviewItem = styled.div`
  background-color: white;
`;

const SLiveInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 15px 15px 0 0;
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-family: mainFont;
`;

const SReviewBox = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const STitle = styled.h1`
  font-size: 2rem;
  margin-top: 1rem;
  font-family: mainFont;
  color: black;
`;

const SMoreLink = styled(Link)`
  font-family: mainFont;
  display: flex;
  justify-content: flex-end;
  align-items: right;
  margin-right: 1rem;
  margin-bottom: 2.5rem;
  font-size: 1.2rem;
  text-decoration: none;
  color: black;
  cursor: pointer;
`;

function Home() {
  // const
  return (
    <>
      <Header />
      <STitleBox>
        <STitle>라이브</STitle>
        <SMoreLink to="/live">더 보기 &gt;</SMoreLink>
      </STitleBox>
      <SLiveContainer>
        <HomeImageCarousel page="Home" />
      </SLiveContainer>
      <SDivideLine>
        <STitleBox>
          <STitle>입양 후기</STitle>
        </STitleBox>
      </SDivideLine>
      <SMoreLink to="/review">더 보기 &gt;</SMoreLink>
      <SReviewItem>
        <SReviewBox>
          <ReviewList />
        </SReviewBox>
      </SReviewItem>
      <Nav />
    </>
  );
}

export default Home;
