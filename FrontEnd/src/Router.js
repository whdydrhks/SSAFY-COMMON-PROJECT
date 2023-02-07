import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Live from './pages/Live/Live';
import Review from './pages/Review/Review';
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
import CreateRoomHost from './pages/VideoChat/CreateRoomHost';
import NotFound from './NotFound';

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
    path: '/checkpassword/:userId',
    element: <CheckPassword />,
  },
  {
    path: '/modifypassword/:userId',
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
    path: '/alarm/:id',
    element: <Alarm />,
  },
  {
    path: '/videochat',
    element: <CreateRoomHost />,
  },
  {
    path: '/notfound',
    element: <NotFound />,
  },
]);

export default router;
