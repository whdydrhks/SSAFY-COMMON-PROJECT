/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-undef */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../../recoilState';
import Header from '../../components/common/Header';
import Nav from '../../components/common/Nav';
import TimeTableHost from '../../components/Schedule/TimeTableHost';
import ScheduleListHost from '../../components/Schedule/ScheduleListHost';
import ScheduleListUser from '../../components/Schedule/ScheduleListUser';
import "../../styles/fonts.css"

const STemp = styled(Tab)`
  width: 50%;
  /* border: 1px solid black;
  border-radius: 10px 10px 0px 0px; */
  font-family: mainFont!important;
  font-size: 1.8rem;
  color:black;
`;

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function Schedule() {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const user = useRecoilValue(userAtom);

  useEffect(() => {
    console.log(user.role);
    if (user.role === '') {
      navigate('/login');
    }
  });

  return (
    <>
      {user.role === 'HOST' ? (
        <>
          <Header />
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={value}
                textColor="secondary"
                onChange={handleChange}
                indicatorColor="secondary"
                aria-label="basic tabs example"
              >
                <STemp label="예약관리" {...a11yProps(0)} />
                <STemp label="시간설정" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel as="div" value={value} index={0}>
              <ScheduleListHost />
            </TabPanel>
            <TabPanel as="div" value={value} index={1}>
              <TimeTableHost />
            </TabPanel>
          </Box>
          <Nav />
        </>
      ) : null}
      {user.role === 'USER' ? (
        <>
          <Header />
          <ScheduleListUser />
          <Nav />
        </>
      ) : null}
    </>
  );
}

export default Schedule;
