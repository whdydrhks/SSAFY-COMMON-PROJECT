import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Intro from './views/Intro/Intro';
import Home from './views/Home/Home';
import About from './views/About/About';
import Live from './views/Live/Live';
import News from './views/News/News';
import Adoption from './views/Adoption/Adoption';
import CreateAdoption from './views/Adoption/CreateAdoption';
import Community from './views/Community/Community';
import Donation from './views/Donation/Donation';
import SignIn from './views/Account/SignIn';
import SignUp from './views/Account/SignUp';
import FindUserInfo from './views/Account/FindUserInfo';

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
    path: '/adoption/create',
    element: <CreateAdoption />,
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
  {
    path: '/findUserInfo',
    element: <FindUserInfo />,
  },
]);

export default router;
