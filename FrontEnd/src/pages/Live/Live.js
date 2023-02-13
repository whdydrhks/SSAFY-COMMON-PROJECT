/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */

import axios from 'axios';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import API_URL from '../../api/api';
import Header from '../../components/common/Header';
import Nav from '../../components/common/Nav';
import { liveListAtom, userAtom } from '../../recoilState';

const SLiveHeader = styled.div`
  display: flex;
  padding: 2rem;
  justify-content: space-between;
`;

const STitle = styled.div`
  font-size: 2rem;
`;
const SLiveCreateButton = styled.button`
  background-color: green;
  height: 2.5rem;
  border: 1px solid green;
  border-radius: 15%;
  font-size: 1.1rem;
  color: white;
`;

const SLiveContainer = styled.div``;
const SLiveItem = styled.div``;

function Live() {
  const user = useRecoilValue(userAtom);
  const [liveList, setLiveList] = useRecoilState(liveListAtom);

  useEffect(() => {
    axios.get(`${API_URL}/live/all`).then(res => setLiveList(res.data.data));
  }, []);

  return (
    <>
      <Header />
      <SLiveHeader>
        <STitle>Live</STitle>
        {user.role === 'HOST' ? (
          <Link to="/live/create">
            <SLiveCreateButton>생성</SLiveCreateButton>
          </Link>
        ) : null}
      </SLiveHeader>
      <SLiveContainer>
        {liveList.map((live, index) => (
          <SLiveItem key={index}>
            라이브 제목 : {live.title} <br /> 보호소 : {live.shelterName}
          </SLiveItem>
        ))}
      </SLiveContainer>
      <Nav />
    </>
  );
}

export default Live;
