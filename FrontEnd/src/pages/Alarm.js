/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import Header from '../components/common/Header';
import Nav from '../components/common/Nav';
import { alarmAtom } from '../recoilState';

const SAlarm = styled.div``;

function Alarm() {
  const [alarmList, setAlarmList] = useRecoilState(alarmAtom);

  useEffect(() => {
    // axios 알람 받아오기
    // setAlarmList
  }, []);

  return (
    <>
      <Header />
      {alarmList.map((alarm, index) => (
        <SAlarm key={index}>{alarm}</SAlarm>
      ))}
      <Nav />
    </>
  );
}

export default Alarm;
