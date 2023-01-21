import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Intro from './views/Intro';
import Home from './views/Home';
import About from './views/About';
import Live from './views/Live';
import News from './views/News';
import Adoption from './views/Adoption';
import Community from './views/Community';
import Donation from './views/Donation';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Intro />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/live',
    element: <Live />,
  },
  {
    path: '/news',
    element: <News />,
  },
  {
    path: '/adoption',
    element: <Adoption />,
  },
  {
    path: '/community',
    element: <Community />,
  },
  {
    path: '/donation',
    element: <Donation />,
  },
  {
    path: '/signIn',
    element: <SignIn />,
  },
  {
    path: '/signUp',
    element: <SignUp />,
  },
]);

export default router;
