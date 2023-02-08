/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import API_URL from '../../api/api';
import { scheduleUserAtom, userAtom } from '../../recoilState';

function ScheduleListUser() {
  const { userId } = useRecoilValue(userAtom);
  const [schedule, setSchedule] = useRecoilState(scheduleUserAtom);

  useEffect(() => {
    // axios.get(`${API_URL}/schedule/users/${userId}`).then((res) => )
  }, []);

  return <div>ㅋㅋ</div>;
}

export default ScheduleListUser;
