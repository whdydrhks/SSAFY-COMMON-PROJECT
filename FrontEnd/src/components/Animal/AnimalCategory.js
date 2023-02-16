/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */

import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AnimalList from './AnimalList';
import '../../styles/fonts.css';

const STemp = styled(Tab)`
  width: 50%;
  font-family: mainFont !important;
  font-size: 1.8rem !important;
  color: black;
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
          <div>{children}</div>
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

function AnimalCategory() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    console.log(event, newValue);
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          textColor="secondary"
          onChange={handleChange}
          indicatorColor="secondary"
          aria-label="basic tabs example"
        >
          <STemp label="입양중" {...a11yProps(0)} />
          <STemp label="입양 완료" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <AnimalList expired="F" />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AnimalList expired="T" />
      </TabPanel>
    </Box>
  );
}

export default AnimalCategory;
