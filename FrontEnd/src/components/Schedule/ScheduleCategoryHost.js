/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useRecoilValue } from 'recoil';

import DayCarouselHost from './DayCarouselHost';
import DateCarouselHost from './DateCarouselHost';
import ManageTimeHost from './ManageTimeHost';

import { setDayTime } from '../../recoilState';

const STemp = styled(Tab)`
  width: 50%;
  border: 1px solid black;
  border-radius: 10px 10px 0px 0px;
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
          <Typography>{children}</Typography>
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

function ScheduleCategoryHost() {
  const [value, setValue] = React.useState(0);
  const [day, setDay] = React.useState('Default');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const dayTime = useRecoilValue(setDayTime);

  console.log('dayTime : ', dayTime);
  console.log(dayTime[0][day]);

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <STemp label="시간 설정" {...a11yProps(0)} />
          <STemp label="일정 관리" {...a11yProps(1)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <DayCarouselHost setDay={setDay} />
        <ManageTimeHost start={9} end={17} times={dayTime[0][day]} />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <DateCarouselHost />
        {/* <ManageTimeHost /> */}
      </TabPanel>
    </Box>
  );
}

export default ScheduleCategoryHost;
