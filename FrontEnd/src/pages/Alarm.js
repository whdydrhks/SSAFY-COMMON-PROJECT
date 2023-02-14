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
const SAlarm = styled.div`
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;
const SAlarmcontainer = styled.div`
  width: 100%;
  height: 12vh;
  margin-bottom: 0.1rem;
  display: flex;
  position: relative;
`;
const SImg = styled.div`
  width: 24%;
  background-color: black;
`;
const SContent = styled.div`
  width: 68%;
  margin-left: 1rem;
`;
const SType = styled.div`
  margin-top: 1rem;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: left;
`;
const SText = styled.div`
  text-align: left;
  margin-top: 0.5rem;
`;
const STime = styled.div`
  text-align: right;
  font-style: italic;
  font-weight: bolder;
`;
const SButton = styled.button`
  border: 0;
  background-color: transparent;
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
                  <SType>오늘 일정이 있습니다.</SType>
                  <SText>
                    {alarm.targetName}과의 일정이 오늘 {alarm.time}시에
                    예정되어있습니다.
                  </SText>
                  <STime>
                    {alarm.createdDate.substring(0, 10)}{' '}
                    {alarm.createdDate.substring(11, 16)}
                  </STime>
                </SContent>
                <SButton>
                  <CloseIcon />
                </SButton>
              </SAlarmcontainer>
            ) : null}
            {alarm.alarmType === 2 ? (
              <SAlarmcontainer>
                <SImg>이미지</SImg>
                <SContent>
                  <SType>오늘 일정이 있습니다.</SType>
                  <SText>
                    {alarm.targetName}과의 일정이 오늘 {alarm.time}시에
                    예정되어있습니다.
                  </SText>
                  <STime>
                    {alarm.createdDate.substring(0, 10)}{' '}
                    {alarm.createdDate.substring(11, 16)}
                  </STime>
                </SContent>
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
                  <STime>
                    {alarm.createdDate.substring(0, 10)}{' '}
                    {alarm.createdDate.substring(11, 16)}
                  </STime>
                </SContent>
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
                  <STime>
                    {alarm.createdDate.substring(0, 10)}{' '}
                    {alarm.createdDate.substring(11, 16)}
                  </STime>
                </SContent>
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
                  <STime>
                    {alarm.createdDate.substring(0, 10)}{' '}
                    {alarm.createdDate.substring(11, 16)}
                  </STime>
                </SContent>
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
