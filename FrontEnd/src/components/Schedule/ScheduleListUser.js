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
  margin-bottom: 2rem;
`;
const STimeTable = styled.div`
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  background-color: white;
  margin-bottom: 24px;
`;
const STime = styled.div`
  margin-bottom: 16px;
`;
const SShelter = styled.div``;
const SClickButton = styled.button`
  width: 5.5rem;
  height: 3.5vh;
  border: none;
  font-size: 1.2rem;
  border-radius: 10px;
  font-family: 'cafe24';
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

  const handleDeleteSchedule = (sId, idx) => {
    if (window.confirm('해당 일정을삭제하시겠습니까?')) {
      axios.delete(`${API_URL}/schedule/${sId}`, {
        headers: { Authorization: accessToken },
      });
      scheduleRef.current[idx].style = 'display : none';

      // navigate('/schedule');
      // window.location.reload();
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
      {dateList.map(item => (
        <SDate>
          {item}
          {scheduleUser.map((schedule, index) =>
            schedule.day === item ? (
              <STimeTable
                key={index}
                ref={el => (scheduleRef.current[index] = el)}
              >
                <div>
                  <STime>
                    {schedule.time.toString().padStart(2, '0')}:00 ~{' '}
                    {(schedule.time + 1).toString().padStart(2, '0')}
                    :00
                  </STime>
                  <SShelter>{schedule.shelterNickname}</SShelter>
                </div>
                {todayDate !== schedule.day ? (
                  <SClickButton
                    bgColor="red"
                    onClick={() => {
                      handleDeleteSchedule(schedule.scheduleId, index);
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
                      handleDeleteSchedule(schedule.scheduleId, index);
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
                      state: {
                        room: schedule.room,
                        nickname: schedule.userNickname,
                      },
                    }}
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
