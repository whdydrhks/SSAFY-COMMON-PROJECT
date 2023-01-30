import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Live from './pages/Live/Live';
import Review from './pages/Review/Review';
import Animal from './pages/Animal/Animal';
import AnimalCreateHost from './pages/Animal/AnimalCreateHost';
import Schedule from './pages/Schedule/Schedule';
import Account from './pages/Account/Account';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/live',
    element: <Live />,
  },
  {
    path: '/review',
    element: <Review />,
  },
  {
    path: '/animal',
    element: <Animal />,
  },
  {
    path: '/animal/create',
    element: <AnimalCreateHost />,
  },
  {
    path: '/schedule',
    element: <Schedule />,
  },
  {
    path: '/account',
    element: <Account />,
  },
]);

export default router;
