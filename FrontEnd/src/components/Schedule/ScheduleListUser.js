/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import '../../styles/slick-theme.css';
import '../../styles/slick.css';
import '../../styles/cafe24.css';
import { Button, Switch } from '@mui/material';
import { useRecoilValue, useRecoilState } from 'recoil';
import { scheduleUserAtom, userAtom } from '../../recoilState';
import API_URL from '../../api/api';

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
const SLiveButton = styled(Button)`
  color: green;
`;
const SCancleButton = styled(Button)`
  color: red;
`;

function ScheduleListUser() {
  const today = new Date();
  const date =
    (today.getMonth() + 1).toString().padStart(2, '0') +
    today.getDate().toString().padStart(2, '0');
  const user = useRecoilValue(userAtom);
  const [scheduleUser, setScheduleUser] = useRecoilState(scheduleUserAtom);
  const [dateList, setDateList] = useState([]);

  useEffect(() => {
    // axios.get(`${API_URL}/schedule/users/${userId}`)
    // .then((res) => {
    // })
    const list = [];
    scheduleUser.forEach(schedule => {
      if (!list.includes(schedule.day)) {
        list.push(schedule.day);
      }
    });
    setDateList(list);
  }, []);

  return (
    <SContainer>
      {dateList.map((item, index) => (
        <div key={index}>
          <SDate>
            {Number(item.substring(0, 2))}월 {Number(item.substring(2))}일
          </SDate>
          {scheduleUser.map(schedule =>
            schedule.day === item ? (
              <STimeTable key={schedule.room}>
                <div>
                  <STime>
                    {schedule.time.padStart(2, '0')}:00 ~{' '}
                    {(Number(schedule.time) + 1).toString().padStart(2, '0')}:00
                  </STime>
                  <SShelter>{schedule.room}</SShelter>
                </div>
                {today.getHours() > schedule.time ? (
                  <Button disabled>완료</Button>
                ) : null}
                {today.getHours().toString().padStart(2, '0') ===
                schedule.time.padStart(2, '0') ? (
                  <SLiveButton>화상채팅</SLiveButton>
                ) : null}
                {today.getHours() < schedule.time ? (
                  <SCancleButton
                    onClick={() => {
                      // axios.delete(`${API_URL}/schedule/cancle/${item.scheduleId}`);
                    }}
                  >
                    취소
                  </SCancleButton>
                ) : null}
              </STimeTable>
            ) : null,
          )}
        </div>
      ))}
    </SContainer>
  );
}

export default ScheduleListUser;
