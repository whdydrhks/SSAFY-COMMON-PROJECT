/* eslint-disable no-return-assign */
/* eslint-disable prefer-const */
/* eslint-disable no-lone-blocks */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import '../../styles/slick-theme.css';
import '../../styles/slick.css';
import { Button, Switch } from '@mui/material';
import { useRecoilValue, useRecoilState } from 'recoil';
import { scheduleAtom, userAtom } from '../../recoilState';
import API_URL from '../../api/api';
import { getCookie } from '../../pages/Account/cookie';

const SContainer = styled.div``;
const SDate = styled.div`
  font-size: 2rem;
  margin: 2rem 1rem;
`;
const SMainDate = styled.div`
  margin-left: 1rem;
  font-weight: bolder;
`;
const STitle = styled.div`
  width: 30%;
  font-size: 1.6rem;
  margin: auto;
  border-radius: 15px 15px 15px 0;
  border-bottom: 1px solid #b9c4c4;
  padding: 1rem 2.5rem;
  background: #cedada;
  background-color: white;
  margin-top: 1rem;
  margin-bottom: 1rem;
  text-align: center;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
    rgba(17, 17, 26, 0.05) 0px 8px 32px;
`;

const SItem = styled.div``;

const STimeTable = styled.div`
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.04);
  margin: 1rem 0;
  padding: 1rem;
  /* border-bottom: 1px solid grey; */
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;
const STime = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;
const SLine = styled.div`
  width: 110%;
  border: 0.01rem solid rgba(0, 0, 0, 0.3);
  margin-bottom: 0.5rem;
`;
const SShelter = styled.div`
  /* margin-left: 1rem; */
  font-size: 1.6rem;
`;
const SClickButton = styled.button`
  width: 7rem;
  height: 4.5vh;
  border: none;
  font-size: 1.2rem;
  border-radius: 100px;
  color: white;
  background-color: ${props => props.bgColor};
`;

function ScheduleListUser() {
  const scheduleRef = useRef([]);
  const navigate = useNavigate();
  const today = new Date();
  const todayDate =
    (today.getMonth() + 1).toString().padStart(2, '0') +
    today.getDate().toString().padStart(2, '0');
  const accessToken = getCookie('accessToken');
  const user = useRecoilValue(userAtom);
  const [scheduleUser, setScheduleUser] = useRecoilState(scheduleAtom);
  const [dateList, setDateList] = useState([]);

  const handleDeleteSchedule = (s, idx) => {
    if (window.confirm('해당 일정을삭제하시겠습니까?')) {
      axios.delete(`${API_URL}/schedule/${s.scheduleId}`, {
        headers: { Authorization: accessToken },
      });
      scheduleRef.current[idx].style = 'display : none';

      axios.post(`${API_URL}/alarm`, {
        alarmType: 4,
        animalId: null,
        day: s.day,
        receiverId: s.shelterId,
        targetName: s.userNickname,
        time: s.time,
      });
    }
  };

  const handleVideoChatClick = () => {
    // navigate('/videochat');
  };

  useEffect(() => {
    let list = [];

    axios.get(`${API_URL}/schedule/users/${user.userId}`).then(res => {
      res.data.data.map(item => {
        if (
          Number(item.day) >=
            Number(
              (today.getMonth() + 1).toString().padStart(2, '0') +
                today.getDate().toString().padStart(2, '0'),
            ) &&
          !list.includes(item.day)
        ) {
          list.push(item.day);
        }
      });
      setDateList(() => list);
      setScheduleUser(res.data.data);
    });
  }, []);

  console.log('sc', scheduleUser);
  console.log('date', dateList);

  return (
    <SContainer>
      <STitle>예약일정</STitle>
      {dateList.map(item => (
        <SDate>
          <SMainDate>
            {Number(item.substring(0, 2))}월{Number(item.substring(2, 4))}일
          </SMainDate>
          {scheduleUser.map((schedule, index) =>
            schedule.day === item ? (
              <STimeTable
                key={index}
                ref={el => (scheduleRef.current[index] = el)}
              >
                <SItem>
                  <STime>
                    {schedule.time.toString().padStart(2, '0')}:00 ~{' '}
                    {(schedule.time + 1).toString().padStart(2, '0')}
                    :00
                  </STime>
                  <SLine />
                  <SShelter>{schedule.shelterNickname}</SShelter>
                </SItem>
                {todayDate !== schedule.day ? (
                  <SClickButton
                    bgColor="red"
                    onClick={() => {
                      handleDeleteSchedule(schedule, index);
                    }}
                  >
                    {' '}
                    취소
                  </SClickButton>
                ) : null}
                {todayDate === schedule.day &&
                today.getHours() < schedule.time ? (
                  <SClickButton
                    bgColor="red"
                    onClick={() => {
                      handleDeleteSchedule(schedule, index);
                    }}
                  >
                    {' '}
                    취소
                  </SClickButton>
                ) : null}
                {todayDate === schedule.day &&
                today.getHours() === schedule.time ? (
                  <Link
                    to={{
                      pathname: '/videochat',
                    }}
                    state={{ room: schedule.room }}
                  >
                    <SClickButton
                      bgColor="green"
                      onClick={handleVideoChatClick}
                    >
                      Live
                    </SClickButton>
                  </Link>
                ) : null}
                {todayDate === schedule.day &&
                today.getHours() > schedule.time ? (
                  <SClickButton bgColor="grey" disabled>
                    완료
                  </SClickButton>
                ) : null}
              </STimeTable>
            ) : null,
          )}
        </SDate>
      ))}
    </SContainer>
  );
}

export default ScheduleListUser;
