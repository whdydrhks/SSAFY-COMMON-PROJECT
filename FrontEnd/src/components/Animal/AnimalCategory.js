/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */

import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// import axios from 'axios';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
// import { useRecoilState } from 'recoil';
import AnimalList from './AnimalList';
// import { animalListState } from '../../recoilState';

const STemp = styled(Tab)`
  width: 50%;
  border: 1px solid black;
  border-radius: 10px 10px 0px 0px;
  /* color: rgba(180, 230, 230);   */
`;

// const SSearchBar = styled.div`
//   display: flex;
//   justify-content: space-around;
//   margin-top: 1rem;
//   margin-left: 0.5rem;
//   margin-right: 0.5rem;
/* background-color: rgba(180, 230, 230); */
// `;

// const SSearchCategory = styled.select`
//   text-align: center;
//   height: 2rem;
// `;

// const SInput = styled.input`
//   text-align: left;

//   width: 49%;
// `;

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

  // const [searchCategory, setSearchCategory] = useState('searchManageNumber');
  // const [searchValue, setSearchValue] = useState('');
  // const [animalList, setAnimalList] = useRecoilState(animalListState);

  const handleChange = (event, newValue) => {
    console.log(event, newValue);
    setValue(newValue);
  };

  // const handleSearchCategory = e => {
  //   setSearchCategory(e.target.value);
  // };

  // const handleSearchValue = e => {
  //   setSearchValue(e.target.value);
  // };

  // console.log(animalList);

  // const url = 'api';
  // const search = async () => {
  //   axios
  //     .get(url, {
  //       params: {
  //         searchCategory,
  //         searchValue,
  //       },
  //     })
  //     .then(res => {
  //       setAnimalList(res);
  //     });
  // };
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <STemp label="입양중" {...a11yProps(0)} />
          <STemp label="입양 완료" {...a11yProps(1)} />
        </Tabs>
      </Box>

      {/* 검색 카테고리 */}
      {/* <SSearchBar>
        <SSearchCategory onChange={handleSearchCategory}>
          <option value="searchManageNumber">관리 번호</option>
          <option value="searchName">이름</option>
          <option value="searchBreed">품종</option>
        </SSearchCategory>
        {(() => {
          switch (searchCategory) {
            case 'searchManageNumber':
              return (
                <SInput
                  type="text"
                  onChange={handleSearchValue}
                  placeholder="관리번호를 입력해 주세요."
                />
              );
            case 'searchName':
              return (
                <SInput
                  type="text"
                  onChange={handleSearchValue}
                  placeholder="이름을 입력해 주세요."
                />
              );
            case 'searchbreed':
              return (
                <SInput
                  type="text"
                  onChange={handleSearchValue}
                  placeholder="품종을 입력해 주세요."
                />
              );
            default:
              return (
                <SInput
                  type="text"
                  onChange={handleSearchValue}
                  placeholder="관리번호를 입력해 주세요."
                />
              );
          }
        })()}

        <button type="button" onClick={search}>
          검색
        </button>
      </SSearchBar> */}

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
