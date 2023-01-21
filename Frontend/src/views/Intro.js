import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import introImg from '../assets/img/intro.jpg';
import logo from '../assets/logo/logo_black.svg';

const SIntro = styled.div`
  background-image: url(${introImg});
  background-repeat: no-repeat;
  height: 100vh;
  background-size: cover;
`;

const SIntroHeader = styled.div`
  display: flex;
  align-items: center;
`;

const SIntroHeaderLogo = styled.img.attrs({
  src: `${logo}`,
})`
  width: 100px;
  height: 100px;
  color: white;
`;
const SInteroHeaderText = styled.div`
  font-size: 40px;
  padding: 24px;
  color: white;
`;

const SContainer = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  right: 80px;
  bottom: 80px;
`;

const SText = styled.div`
  font-size: 56px;
  color: white;
`;

const STextFind = styled.div``;
const STextYour = styled.div``;
const STextFamily = styled.div``;

const SStartButton = styled.div`
  a {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 40px;
    text-decoration: none;
    color: white;
    margin-left: 40px;
  }
`;

function Intro() {
  return (
    <SIntro>
      <SIntroHeader>
        <SIntroHeaderLogo />
        <SInteroHeaderText>반가워</SInteroHeaderText>
      </SIntroHeader>
      <SContainer>
        <SText>
          <STextFind>Find</STextFind>
          <STextYour>Your</STextYour>
          <STextFamily>Family</STextFamily>
        </SText>
        <SStartButton>
          <Link to="/home">Start</Link>
        </SStartButton>
      </SContainer>
    </SIntro>
  );
}

export default Intro;
