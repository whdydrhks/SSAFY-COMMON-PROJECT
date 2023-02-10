/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../recoilState';
import Header from '../components/common/Header';
import Nav from '../components/common/Nav';
import ImageCarousel from '../components/common/ImageCarousel';
import ReviewList from '../components/Review/ReviewList';

// 1976d2

const SContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 2rem;
  background-color: lightgray;
  border-radius: 20px 20px 0 0;
  padding-top: 0.5rem;
`;

const STitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem;
  color: #195190;
`;

const SLiveItem = styled.div`
  background-color: white;
  border: 1px solid lightgray;
  border-left: none;
  border-right: none;
`;

const SReviewItem = styled.div`
  background-color: white;
  border: 1px solid lightgray;
  border-left: none;
  border-right: none;
`;

const SLive = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-top: 2rem;
`;

const SReview = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-top: 2rem;
`;

const STitle = styled.h1`
  font-size: 1.5rem;
`;

const SMoreLink = styled(Link)`
  font-size: 1.2rem;
  text-decoration: none;
  color: #195190;
  cursor: pointer;
`;

// const SReviewContainer = styled.div``;

function Home() {
  const userInfo = useRecoilValue(userAtom);
  useEffect(() => {
    console.log(userInfo);
  });

  return (
    <>
      <Header />
      <SContainer>
        <STitleBox>
          <STitle>라이브</STitle>
          <SMoreLink to="/live">더 보기 &gt;</SMoreLink>
        </STitleBox>
        <SLiveItem>
          <SLive>
            <ImageCarousel page="Home" />
          </SLive>
        </SLiveItem>
      </SContainer>
      {/* <SLine /> */}
      <SContainer>
        <STitleBox>
          <STitle>입양 후기</STitle>
          <SMoreLink to="/review">더 보기 &gt;</SMoreLink>
        </STitleBox>
        <SReviewItem>
          <SReview>
            <ReviewList />
          </SReview>
        </SReviewItem>
      </SContainer>
      <Nav />
    </>
  );
}

export default Home;
