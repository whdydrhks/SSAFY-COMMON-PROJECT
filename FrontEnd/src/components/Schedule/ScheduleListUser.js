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
`;
const STime = styled.div`
  display: flex;
  justify-content: space-between;
`;
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
          <SDate>{item}</SDate>
          {scheduleUser.map(schedule =>
            schedule.day === item ? (
              <STime key={schedule.room}>
                <div>{schedule.time}</div>
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
              </STime>
            ) : null,
          )}
        </div>
      ))}
    </SContainer>
  );
}

export default ScheduleListUser;
