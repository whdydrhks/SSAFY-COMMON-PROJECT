/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import styled from 'styled-components';
import Header from '../../components/common/Header';
import Nav from '../../components/common/Nav';
import LiveCategory from '../../components/Live/LiveCategory';

const SLive = styled.video`
  align-items: top;
  border: 1px solid black;
  /* height: 50%; */
`;

const SLine = styled.div`
  height: 10px;
  background-color: #d9d9d9;
  opacity: 0.4;
`;

const SBoxLive = styled.div`
  position: bottom;
  justify-content: end;
  border: 1px solid black;
`;

const SBoxCategory = styled.div`
  justify-content: bottom;
  border: 1px solid red;
`;

function Live() {
  return (
    <>
      <Header />
      <SBoxLive>
        <SLive>1</SLive>
      </SBoxLive>
      <SLine />
      <SBoxCategory>
        <LiveCategory />
      </SBoxCategory>
      <Nav />
    </>
  );
}

export default Live;
