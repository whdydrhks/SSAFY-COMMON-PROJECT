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
import { dateListAtom, scheduleAtom, twoWeeksAtom } from '../../recoilState';
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
const SLiveButton = styled(Button)`
  color: green;
`;
const SCancleButton = styled(Button)`
  color: red;
`;

function ScheduleListUser() {
  const today = new Date();
  const accessToken = getCookie('accessToken');
  const [twoWeeks, setTwoWeeks] = useRecoilState(twoWeeksAtom);
  const [scheduleUser, setScheduleUser] = useRecoilState(scheduleAtom);
  const [dateList, setDateList] = useRecoilState(dateListAtom);
  useEffect(() => {
    const weeks = [];
    for (let i = 0; i < 14; i += 1) {
      const to = new Date();
      const nxtDay = new Date(to.setDate(to.getDate() + i));
      const todayMonth = (nxtDay.getMonth() + 1).toString();
      const todayDate = nxtDay.getDate().toString();
      weeks.push({ month: todayMonth, day: todayDate });
    }
    setTwoWeeks(weeks);
    axios
      .get(`${API_URL}/schedule/users`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then(res => {
        setScheduleUser(res.data.data);
      });
  }, []);

  console.log('two', twoWeeks);
  console.log('sc', scheduleUser);

  return (
    <SContainer>
      {scheduleUser.map(schedule => (
        <STimeTable key={schedule.room}>
          <div>
            <STime>
              {schedule.time.toString().padStart(2, '0')}:00 ~{' '}
              {(schedule.time + 1).toString().padStart(2, '0')}
              :00
            </STime>
            <SShelter>{schedule.room}</SShelter>
          </div>
        </STimeTable>
      ))}
    </SContainer>
  );
}

export default ScheduleListUser;
