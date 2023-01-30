import React from 'react';
import { render } from 'react-dom';
import { RecoilRoot } from 'recoil';
import App from './App';

const root = document.getElementById('root');
render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
  root,
);
