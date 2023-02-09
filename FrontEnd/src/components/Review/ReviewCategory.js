/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */

import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import axios from 'axios';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useRecoilState } from 'recoil';
import ReviewList from './ReviewList';
import { reviewListState } from '../../recoilState';

const STemp = styled(Tab)`
  width: 50%;
  border: 1px solid black;
  border-radius: 10px 10px 0px 0px;
`;

const SSearchBar = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
`;

const SSearchCategory = styled.select`
  text-align: center;
  height: 3rem;
`;

const SInput = styled.input`
  width: 50%;
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

function ReviewCategory() {
  const [value, setValue] = useState(0);

  const [searchCategory, setSearchCategory] = useState('searchTitle');
  const [searchValue, setSearchValue] = useState('');
  const [reviewList, setReviewList] = useRecoilState(reviewListState);

  const handleSearchCategory = e => {
    setSearchCategory(e.target.value);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSearchValue = e => {
    setSearchValue(e.target.value);
  };
  console.log(reviewList);

  const url = 'api';
  const search = async () => {
    axios
      .get(url, {
        params: {
          searchCategory,
          searchValue,
        },
      })
      .then(res => {
        setReviewList(res);
      });
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <STemp label="전체글" {...a11yProps(0)} />
          <STemp label="개념글" {...a11yProps(1)} />
        </Tabs>
      </Box>

      {/* 검색 카테고리 */}
      <SSearchBar>
        <SSearchCategory onChange={handleSearchCategory}>
          <option value="searchTitle">제목</option>
          <option value="searchTitleContent">제목 + 내용</option>
        </SSearchCategory>
        {(() => {
          switch (searchCategory) {
            case 'searchTitle':
              return (
                <SInput
                  type="text"
                  onChange={handleSearchValue}
                  placeholder="제목을 입력해 주세요."
                />
              );
            case 'searchTitleContent':
              return (
                <SInput
                  type="text"
                  onChange={handleSearchValue}
                  placeholder="제목 + 내용을 입력해 주세요."
                />
              );
            default:
              return (
                <SInput
                  type="text"
                  onChange={handleSearchValue}
                  placeholder="제목을 입력해 주세요."
                />
              );
          }
        })()}

        <button type="button" onClick={search}>
          검색
        </button>
      </SSearchBar>

      <TabPanel value={value} index={0}>
        <ReviewList />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ReviewList />
      </TabPanel>
    </Box>
  );
}

export default ReviewCategory;
