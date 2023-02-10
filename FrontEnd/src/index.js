import React from 'react';
import { render } from 'react-dom';
import { RecoilRoot } from 'recoil';
import styled from 'styled-components';
import App from './App';

const SContainer = styled.div`
  /* display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; */
`;

const root = document.getElementById('root');
render(
  <RecoilRoot>
    <SContainer>
      <App />
    </SContainer>
  </RecoilRoot>,
  root,
);
