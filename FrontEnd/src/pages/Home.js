/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../recoilState';
import Header from '../components/common/Header';
import Nav from '../components/common/Nav';
import ImageCarousel from '../components/common/ImageCarousel';
import ReviewList from '../components/Review/ReviewList';

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
`;

const SLiveVideoBox = styled.div`
  height: 100%;
  width: 100%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  border-radius: 0 0 15px 15px;
`;

const STitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #195190;
  margin-top: 1rem;
`;

const SShelterNicknameBox = styled.div`
  /* width: 50%; */
  /* text-align: center; */
  align-items: flex-end;
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
  /* border: 1px solid lightgray; */
  /* border-left: none; */
  /* border-right: none; */
`;

const SLiveTitleBox = styled.div`
  font-size: 1.5rem;
  margin-left: 1rem;
  text-align: center;
  display: flex;
  align-items: flex-start;
  width: 5rem;
`;

const SLiveInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 15px 15px 0 0;
`;

const SReviewBox = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const STitle = styled.div`
  width: 30%;
  font-size: 1.6rem;
  margin: auto;
  margin-left: 1rem;
  border-radius: 15px 15px 15px 0;
  /* border-bottom: 1px solid #b9c4c4;  */
  padding: 1rem 2.5rem;
  /* background: #cedada; */
  background-color: white;
  margin-top: 1rem;
  margin-bottom: 1rem;
  text-align: center;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
    rgba(17, 17, 26, 0.05) 0px 8px 32px;
`;

const SMoreLink = styled(Link)`
  display: flex;
  justify-content: flex-end;
  align-items: right;
  margin-right: 1rem;
  margin-bottom: 2.5rem;
  font-size: 1.2rem;
  text-decoration: none;
  color: #195190;
  cursor: pointer;
`;

function Home() {
  return (
    <>
      <Header />
      <STitleBox>
        <STitle>라이브</STitle>
      </STitleBox>
      {/* <SMoreLink to="/live">더 보기 &gt;</SMoreLink> */}

      <SMoreLink to="/live">더 보기 &gt;</SMoreLink>
      {/* <SLiveItem> */}
      <SLiveContainer>
        <ImageCarousel page="Home" />
        <SLiveInfoBox>
          <SLiveTitleBox>방제목</SLiveTitleBox>
          <SShelterNicknameBox>Shelter Nickname</SShelterNicknameBox>
        </SLiveInfoBox>
        <SLiveVideoBox>동영상 들어갈 곳</SLiveVideoBox>
      </SLiveContainer>
      {/* </SLiveItem> */}
      {/* <SLine /> */}

      {/* SDivideLine은 회색 구분선 */}
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
