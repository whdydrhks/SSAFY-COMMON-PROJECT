/* eslint-disable react/button-has-type */
/* eslint-disable no-return-assign */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import styled from 'styled-components';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CloseIcon from '@mui/icons-material/Close';
import Header from '../components/common/Header';
import Nav from '../components/common/Nav';
import { getCookie } from './Account/cookie';
import { alarmAtom } from '../recoilState';
import API_URL from '../api/api';
import schedule from '../images/alarm/schedule.png';
import cancleSchedule from '../images/alarm/cancleSchedule.png';
import animal from '../images/alarm/animal.png';
import '../styles/fonts.css';

const SContainer = styled.div``;
const SAlarmHeader = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
`;
const SHr = styled.div`
  font-size: 2rem;
  margin-top: 1rem;
  font-family: mainFont;
  margin-bottom: 1.4rem;
`;
const SAlarm = styled.div`
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  border-radius: 10px 10px 10px 10px;
  font-size: large;
  font-family: mainFont;
  margin: 0.5rem 1rem;
`;
const SAlarmcontainer = styled.div`
  width: 100%;
  border-radius: 10px 10px 10px 10px;
  height: 12vh;
  margin-bottom: 0.1rem;
  display: flex;
  align-items: center;
  position: relative;
  background-color: ${props => props.bgColor};
`;
const SImg = styled.img`
  width: 20%;
  height: 8vh;
  margin-left: 0.5rem;
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

const SNoAlarm = styled.div``;

function Alarm() {
  const navigate = useNavigate();
  const accessToken = getCookie('accessToken');
  const alarmRef = useRef([]);
  const [alarmList, setAlarmList] = useRecoilState(alarmAtom);

  const handleHistory = () => {
    navigate(-1);
  };

  const handleDeleteAlarm = (a, idx) => {
    axios.delete(`${API_URL}/alarm`, {
      headers: { Authorization: accessToken },
      data: { alarmId: a.alarmId },
    });
    alarmRef.current[idx].style = 'display : none';
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/alarm`, { headers: { Authorization: accessToken } })
      .then(res => setAlarmList(res.data.data));
  }, []);

  return (
    <>
      <Header />
      <SAlarmHeader>
        <SButton onClick={handleHistory}>
          <ChevronLeftIcon fontSize="large" />
        </SButton>
        <SHr>알람</SHr>
      </SAlarmHeader>
      {alarmList.length === 0 ? (
        <SNoAlarm>알람업ㅆddd~다</SNoAlarm>
      ) : (
        <SContainer>
          {alarmList.map((alarm, index) => (
            <SAlarm key={index} ref={el => (alarmRef.current[index] = el)}>
              {alarm.alarmType === 1 ? (
                <SAlarmcontainer bgColor="#9dd3a8">
                  <SImg src={schedule} />

                  <SContent>
                    <SType>오늘 일정이 있습니다.</SType>
                    <SText>
                      &quot;{alarm.targetName}&quot;의 일정이 오늘 {alarm.time}
                      시에 예정되어있습니다.
                    </SText>
                    <STime>
                      {alarm.createdDate.substring(0, 10)}{' '}
                      {alarm.createdDate.substring(11, 16)}
                    </STime>
                  </SContent>
                  <SButton onClick={() => handleDeleteAlarm(alarm, index)}>
                    <CloseIcon />
                  </SButton>
                </SAlarmcontainer>
              ) : null}
              {alarm.alarmType === 2 ? (
                <SAlarmcontainer bgColor="#9dd3a8">
                  <SImg src={schedule} />

                  <SContent>
                    <SType>오늘 일정이 있습니다.</SType>
                    <SText>
                      &quot;{alarm.targetName}&quot;의 일정이 오늘 {alarm.time}
                      시에 예정되어있습니다.
                    </SText>
                    <STime>
                      {alarm.createdDate.substring(0, 10)}{' '}
                      {alarm.createdDate.substring(11, 16)}
                    </STime>
                  </SContent>
                  <SButton onClick={() => handleDeleteAlarm(alarm, index)}>
                    <CloseIcon />
                  </SButton>
                </SAlarmcontainer>
              ) : null}
              {alarm.alarmType === 3 ? (
                <SAlarmcontainer bgColor="#f4f0e6">
                  <SImg src={cancleSchedule} />

                  <SContent>
                    <SType>예약이 취소되었습니다.</SType>
                    <SText>
                      &quot;{alarm.targetName}&quot;의 {alarm.time}시 일정이
                      취소되었습니다.
                    </SText>
                    <STime>
                      {alarm.createdDate.substring(0, 10)}{' '}
                      {alarm.createdDate.substring(11, 16)}
                    </STime>
                  </SContent>
                  <SButton onClick={() => handleDeleteAlarm(alarm, index)}>
                    <CloseIcon />
                  </SButton>
                </SAlarmcontainer>
              ) : null}
              {alarm.alarmType === 4 ? (
                <SAlarmcontainer bgColor="#f4f0e6">
                  <SImg src={cancleSchedule} />

                  <SContent>
                    <SType>예약이 취소되었습니다.</SType>
                    <SText>
                      &quot;{alarm.targetName}&quot;의 {alarm.time}시 일정이
                      취소되었습니다.
                    </SText>
                    <STime>
                      {alarm.createdDate.substring(0, 10)}{' '}
                      {alarm.createdDate.substring(11, 16)}
                    </STime>
                  </SContent>
                  <SButton onClick={() => handleDeleteAlarm(alarm, index)}>
                    <CloseIcon />
                  </SButton>
                </SAlarmcontainer>
              ) : null}
              {alarm.alarmType === 5 ? (
                <SAlarmcontainer bgColor="#d9d9f3">
                  <SImg src={animal}>이미지</SImg>
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
                  <SButton onClick={() => handleDeleteAlarm(alarm, index)}>
                    <CloseIcon />
                  </SButton>
                </SAlarmcontainer>
              ) : null}
            </SAlarm>
          ))}
        </SContainer>
      )}

      <Nav />
    </>
  );
}

export default Alarm;
