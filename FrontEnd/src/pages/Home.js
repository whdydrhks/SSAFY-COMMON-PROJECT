/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../components/common/Header';
import Nav from '../components/common/Nav';
import ImageCarousel from '../components/common/ImageCarousel';

const STitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
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
      <STitleBox>
        <STitle>Live</STitle>
        <SMoreLink to="/live">더 보기 &gt;</SMoreLink>
      </STitleBox>
      <ImageCarousel page="Home" />
      {/* <SReviewContainer>리뷰컨테이너~</SReviewContainer> */}
      {/* <br /> */}
      <SLine />
      <Link to="/review">리뷰 더 보기</Link>
      <Nav />
    </>
  );
}

export default Home;
