import React from 'react';
import styled from 'styled-components';
import HomeHeader from '../../components/common/HomeHeader';
import HomeNav from '../../components/common/HomeNav';
import homeImg from '../../assets/img/home.jpg';

const SHome = styled.div`
  background-image: url(${homeImg});
  background-repeat: no-repeat;
  height: 100vh;
  background-size: cover;
`;

function Home() {
  return (
    <SHome>
      <HomeHeader />
      <HomeNav />
    </SHome>
  );
}

export default Home;
