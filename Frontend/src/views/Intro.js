import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SIntroLogo = styled.div``;

function Intro() {
  return (
    <>
      <SIntroLogo>반가워</SIntroLogo>
      <Link to="/home">Start</Link>
    </>
  );
}

export default Intro;
