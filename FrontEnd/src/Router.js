/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
/* eslint-disable react/sort-comp */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable spaced-comment */
/* eslint-disable react/sort-comp */
/* eslint-disable react/destructuring-assignment */

import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Live from './pages/Live/Live';
import Review from './pages/Review/Review';
import ReviewCreate from './pages/Review/ReviewCreate';
import ReviewDetail from './pages/Review/ReviewDetail';
import ReviewUpdate from './pages/Review/ReviewUpdate';
import Animal from './pages/Animal/Animal';
import AnimalCreateHost from './pages/Animal/AnimalCreateHost';
import AnimalUpdateHost from './pages/Animal/AnimalUpdateHost';
import AnimalDetail from './pages/Animal/AnimalDetail';
import Schedule from './pages/Schedule/Schedule';
import Login from './pages/Account/Login';
import SignUp from './pages/Account/SignUp';
import FindPassword from './pages/Account/FindPassword';
import CheckPassword from './pages/Account/CheckPassword';
import ModifyPassword from './pages/Account/ModifyPassword';
import MyPage from './pages/Account/MyPage';
import ModifyMyPage from './pages/Account/ModifyMyPage';
import Alarm from './pages/Alarm';
import VideoChat from './pages/VideoChat/VideoChat';
import NotFound from './NotFound';
import LiveCreateHost from './pages/Live/LiveCreateHost';
import CreateSchedule from './components/Schedule/CreateSchedule';

import LiveChat from './pages/LiveTemp/LiveChat';

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
    path: '/review/create',
    element: <ReviewCreate />,
  },
  {
    path: '/review/:reviewId',
    element: <ReviewDetail />,
  },
  {
    path: '/review/update/:reviewId',
    element: <ReviewUpdate />,
  },
  {
    path: '/animal',
    element: <Animal />,
  },
  {
    path: '/animal/:animalId',
    element: <AnimalDetail />,
  },
  {
    path: '/animal/create',
    element: <AnimalCreateHost />,
  },
  {
    path: 'animal/update/:animalId',
    element: <AnimalUpdateHost />,
  },
  {
    path: '/schedule',
    element: <Schedule />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/findpassword',
    element: <FindPassword />,
  },
  {
    path: '/checkpassword/:userId/password',
    element: <CheckPassword />,
  },
  {
    path: '/modifypassword/:userId/password',
    element: <ModifyPassword />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/mypage/:userId',
    element: <MyPage />,
  },
  {
    path: '/modifymypage/:userId',
    element: <ModifyMyPage />,
  },
  {
    path: '/alarm/:userId',
    element: <Alarm />,
  },
  {
    path: '/videochat',
    element: <VideoChat />,
  },
  {
    path: '/live/create',
    element: <LiveCreateHost />,
  },
  {
    path: '/livechat',
    element: <LiveChat />,
  },
  {
    path: '/notfound',
    element: <NotFound />,
  },
  {
    path: '/createschedule',
    element: <CreateSchedule />,
  },
]);

export default router;
