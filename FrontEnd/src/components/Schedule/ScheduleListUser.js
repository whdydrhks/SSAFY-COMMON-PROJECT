/* eslint-disable prefer-const */
/* eslint-disable no-lone-blocks */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import '../../styles/slick-theme.css';
import '../../styles/slick.css';
import { Button, Switch } from '@mui/material';
import { useRecoilValue, useRecoilState } from 'recoil';
import { scheduleAtom } from '../../recoilState';
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
  const [scheduleUser, setScheduleUser] = useRecoilState(scheduleAtom);
  const [dateList, setDateList] = useState([]);

  useEffect(() => {
    let list = [];

    axios
      .get(`${API_URL}/schedule/users`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then(res => {
        res.data.data.map(item => {
          if (!list.includes(item.day)) {
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
    <>
      <SContainer>
        {dateList.map(item => (
          <SDate>{item}</SDate>
        ))}
      </SContainer>
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
    </>
  );
}

export default ScheduleListUser;
