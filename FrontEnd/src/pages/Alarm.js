/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import Header from '../components/common/Header';
import Nav from '../components/common/Nav';
import { getCookie } from './Account/cookie';
import { alarmAtom } from '../recoilState';
import API_URL from '../api/api';

const SContainer = styled.div``;
const SAlarm = styled.div``;
const SAlarmcontainer = styled.div`
  width: 100%;
  height: 10vh;
  margin-bottom: 0.5rem;
  background-color: beige;
  display: flex;
  justify-content: space-between;
`;
const SImg = styled.div`
  width: 24%;
  background-color: black;
`;
const SContent = styled.div`
  div {
    text-align: left;
  }
`;
const SType = styled.div`
  margin-top: 1rem;
  font-size: 1.2rem;
  font-weight: bold;
`;
const SText = styled.div``;
const STime = styled.div``;
const SButton = styled.button`
  background-color: beige;
  border: none;
  padding: 0 1rem;
`;

function Alarm() {
  const accessToken = getCookie('accessToken');
  const [alarmList, setAlarmList] = useRecoilState(alarmAtom);

  useEffect(() => {
    axios
      .get(`${API_URL}/alarm`, { headers: { Authorization: accessToken } })
      .then(res => setAlarmList(res.data.data));
  }, []);

  return (
    <>
      <Header />
      <SContainer>
        {alarmList.map((alarm, index) => (
          <SAlarm key={index}>
            {alarm.alarmType === 1 ? (
              <SAlarmcontainer>
                <SImg>이미지</SImg>
                <SContent>
                  <SType>오늘 예약 일정이 있습니다.</SType>
                  <SText>
                    {alarm.targetName}과의 일정이 {alarm.time}시에
                    예정되어있습니다.
                  </SText>
                </SContent>
                <STime>sdf</STime>
                <SButton>
                  <CloseIcon />
                </SButton>
              </SAlarmcontainer>
            ) : null}
            {alarm.alarmType === 2 ? (
              <SAlarmcontainer>
                <SImg>이미지</SImg>
                <SContent>
                  <SType>오늘 예약 일정이 있습니다.</SType>
                  <SText>
                    {alarm.targetName}과의 일정이 {alarm.time}시에
                    예정되어있습니다.
                  </SText>
                </SContent>
                <STime>sdf</STime>
                <SButton>
                  <CloseIcon />
                </SButton>
              </SAlarmcontainer>
            ) : null}
            {alarm.alarmType === 3 ? (
              <SAlarmcontainer>
                <SImg>이미지</SImg>
                <SContent>
                  <SType>예약이 취소되었습니다.</SType>
                  <SText>
                    {alarm.targetName}과의 {alarm.time}시 일정이 취소되었습니다.
                  </SText>
                </SContent>
                <STime>sdf</STime>
                <SButton>
                  <CloseIcon />
                </SButton>
              </SAlarmcontainer>
            ) : null}
            {alarm.alarmType === 4 ? (
              <SAlarmcontainer>
                <SImg>이미지</SImg>
                <SContent>
                  <SType>예약이 취소되었습니다.</SType>
                  <SText>
                    {alarm.targetName}과의 {alarm.time}시 일정이 취소되었습니다.
                  </SText>
                </SContent>
                <STime>sdf</STime>
                <SButton>
                  <CloseIcon />
                </SButton>
              </SAlarmcontainer>
            ) : null}
            {alarm.alarmType === 5 ? (
              <SAlarmcontainer>
                <SImg>이미지</SImg>
                <SContent>
                  <SType>입양이 종료되었습니다.</SType>
                  <SText>
                    {alarm.targetName}의 입양 모집이 종료되었습니다.
                  </SText>
                </SContent>
                <STime>sdf</STime>
                <SButton>
                  <CloseIcon />
                </SButton>
              </SAlarmcontainer>
            ) : null}
          </SAlarm>
        ))}
      </SContainer>
      <Nav />
    </>
  );
}

export default Alarm;
