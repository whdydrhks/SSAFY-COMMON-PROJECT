import React from 'react';
import { RouterProvider } from 'react-router-dom';
import GlobalStyle from './styles/globalStyle';
import router from './Router';

function App() {
  return (
    <>
      <GlobalStyle />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
