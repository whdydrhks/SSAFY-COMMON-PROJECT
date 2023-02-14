/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import styled from 'styled-components';
import Header from '../components/common/Header';
import Nav from '../components/common/Nav';
import { getCookie } from './Account/cookie';
import { alarmAtom } from '../recoilState';
import API_URL from '../api/api';

const SContainer = styled.div``;
const SAlarm = styled.div``;
function Alarm() {
  const accessToken = getCookie('accessToken');
  const [alarmList, setAlarmList] = useRecoilState(alarmAtom);

  useEffect(() => {
    axios
      .get(`${API_URL}/alarm`, { headers: { Authorization: accessToken } })
      .then(res => console.log(res));
  }, []);

  return (
    <>
      <Header />
      <SContainer>
        {alarmList.map((alarm, index) => (
          <SAlarm key={index}>{alarm}</SAlarm>
        ))}
      </SContainer>
      <Nav />
    </>
  );
}

export default Alarm;
