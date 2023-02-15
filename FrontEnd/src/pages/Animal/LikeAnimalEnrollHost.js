/* eslint-disable prefer-template */
/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
/* eslint-disable radix */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/button-has-type */

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
// import { Typography, Grid, Select, MenuItem } from '@mui/material';
import { Button, List, ListItem, ListItemButton } from '@mui/material';
import Box from '@mui/material/Box';

import { useRecoilState, useRecoilValue } from 'recoil';
import { animalListState, userAtom } from '../../recoilState';
import API_URL from '../../api/api';
import Nav from '../../components/common/Nav';
import Header from '../../components/common/Header';
import { getCookie } from '../Account/cookie';

const SSearchBar = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  /* background-color: rgba(180, 230, 230); */
`;

const SSearchCategory = styled.select`
  text-align: center;
  height: 2rem;
`;

const SInput = styled.input`
  text-align: left;
  width: 49%;
`;

const SBox = styled.div`
  display: center;
  /* text-align: center; */
  /* align-items: center; */
  flex-direction: column;
`;

const SButton = styled(Button)`
  background-color: white;
  /* border: none; */
`;

function LikeAnimalEnrollHost() {
  const location = useLocation();
  const accessToken = getCookie('accessToken');
  const userInfo = useRecoilState(userAtom);
  const Nickname = userInfo.nickname;
  // console.log('Nickname : ', Nickname);
  // 검색 카테고리(닉네임)
  const [searchCategory, setSearchCategory] = useState('searchNickname');
  // 검색창에 입력하는 값
  const [searchValue, setSearchValue] = useState('');
  // user의 Nickname을 가져오는 값
  const [userNickname, setUserNickname] = useState([]);
  // Button Click 시, 선택되어있는 로직
  const [onStay, setOnStay] = useState();
  const [clickNickname, setClickNickname] = useState('');
  // console.log('onStay : ', onStay);
  // '적용' Button Click 시, 해당 User에게 Animal List와 Detail 제공

  // const [onAdopt, setOnAdopt] = useState();

  // console.log('userNickname : ', userNickname);

  // 검색 카테고리(닉네임)
  const handleSearchCategory = e => {
    setSearchCategory(e.target.value);
  };

  // 검색창에 입력하는 값
  const handleSearchValue = e => {
    setSearchValue(e.target.value);
  };

  // 검색 로직
  // useEffect(() => {
  //   axios
  //     .get(`${API_URL}/user`, { params: { keyword: searchValue } })
  //     .then(res => {
  //       setUserNickname(res.data.data);
  //     });
  // }, []);
  const search = async () => {
    axios
      .get(`${API_URL}/user`, { params: { keyword: searchValue } })
      .then(res => {
        setUserNickname(res.data.data);
      });
  };
  // console.log(search);
  // console.log('userNickname2 : ', userNickname);

  // Button Click 시, 선택되어있는 로직
  const onStayClick = e => {
    // setOnStay(e.target.value);
    // clickNickname = e.target.value;
    setClickNickname(e.target.value);
  };

  // 적용 Button Click 시, Animal로 가는 로직
  const animalInfo = useRecoilState(animalListState);
  // console.log('animalInfo : ', animalInfo);
  const animalIdNum = animalInfo.animalId;
  const navigate = useNavigate();
  // console.log('navigate : ', navigate);
  const handleAdoptButton = () => {
    console.log(clickNickname);
    let userId;
    userNickname.forEach(item => {
      // console.log(item);
      // console.log(clickNickname);
      if (item.nickname === clickNickname) {
        userId = item.userId;
      }
    });
    const today = new Date();
    const year = today.getFullYear().toString();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const hour = today.getHours().toString().padStart(2, '0');
    const min = today.getMinutes().toString().padStart(2, '0');
    const sec = today.getSeconds().toString().padStart(2, '0');
    const nxtDate = new Date(today.setDate(today.getDate() + 7));
    const nxtDay = nxtDate.getDate().toString().padStart(2, '0');
    const expiredDate =
      year +
      '-' +
      month +
      '-' +
      nxtDay.toString() +
      ' ' +
      hour +
      ':' +
      min +
      ':' +
      sec;
    // const expiredDate
    const animalId = location.state.animalInformation.animalId;
    console.log('animalId : ', animalId);
    console.log('userId : ', userId);
    // console.log(typeof expiredDate);
    axios
      .post(
        `${API_URL}/user/${userId}/like/animal/${animalId}`,
        { expiredDate },
        { headers: { Authorization: accessToken } },
      )
      .then(res => console.log(res));
    // navigate(`/animal/${animalIdNum}`);
  };

  // location을 활용하여, 다시 Render하는 Logic

  // 실패 코드
  // const AnimalInfo = useRecoilState(animalListState);
  // const animalId = AnimalInfo.animalId;
  // console.log('AnimalInfo : ', AnimalInfo);

  return (
    <>
      <Header />
      <Box sx={{ width: '100%' }}>
        {/* 검색 카테고리 */}
        <SSearchBar>
          <SSearchCategory onChange={handleSearchCategory}>
            <option value="searchNickname">닉네임</option>
          </SSearchCategory>
          {(() => {
            switch (searchCategory) {
              case 'searchNickname':
                return (
                  <SInput
                    type="text"
                    onChange={handleSearchValue}
                    placeholder="닉네임을 입력해 주세요."
                  />
                );
              default:
                return (
                  <SInput
                    type="text"
                    onChange={handleSearchValue}
                    placeholder="닉네임을 입력해 주세요."
                  />
                );
            }
          })()}

          <button type="button" onClick={search}>
            검색
          </button>
        </SSearchBar>
        {/* userNickname 에서 값 뽑아오기 */}
        <SBox>
          {userNickname.map((Item, index) => (
            <SButton onClick={onStayClick} key={index} value={Item.nickname}>
              {Item.nickname}
            </SButton>
          ))}
        </SBox>
        {/* User 선택 후 적용 Button */}
        <div>
          <button onClick={handleAdoptButton}>적용</button>
        </div>
      </Box>
      <Nav />
    </>
  );
}

export default LikeAnimalEnrollHost;
