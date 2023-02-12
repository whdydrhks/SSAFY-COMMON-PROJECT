/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */

import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

const STemp = styled(Tab)`
  width: 50%;
  border: 1px solid black;
  border-radius: 10px 10px 0px 0px;
`;

const SBox = styled(Box)`
  //   background-color: rgba(180, 230, 230);
  //   position: fixed;
  //   left: 0;
  //   right: 0;
  //   bottom: 0;
  //   height: 4rem;
  align-items: center;
`;

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <SBox
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </SBox>
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

function LiveCategory() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <STemp label="채팅" {...a11yProps(0)} />
          <STemp label="예약하기" {...a11yProps(1)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        채팅
      </TabPanel>
      <TabPanel value={value} index={1}>
        예약
      </TabPanel>
    </div>
  );
}

export default LiveCategory;
