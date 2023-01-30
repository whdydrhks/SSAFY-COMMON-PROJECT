import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Nav from '../components/Nav';

const SLiveContainer = styled.div``;

// const SLiveName = styled.div``;
// const SLiveVideo = styled.div``;
// const SLiveShelter = styled.div``;
// const SLiveIndex = styled.div``;
const SLine = styled.div`
  height: 10px;
  background-color: grey;
`;
const SReviewContainer = styled.div``;

function Home() {
  return (
    <>
      <Header />
      <SLiveContainer>동영상 썸네일 캐로셀~</SLiveContainer>
      <SLine />
      <SReviewContainer>리뷰컨테이너~</SReviewContainer>
      <Nav />
    </>
  );
}

export default Home;
