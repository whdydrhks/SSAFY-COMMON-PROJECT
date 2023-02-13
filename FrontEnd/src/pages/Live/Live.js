/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */

import axios from 'axios';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import API_URL from '../../api/api';
import Header from '../../components/common/Header';
import Nav from '../../components/common/Nav';
import {
  liveListAtom,
  timetableShelterIdAtom,
  userAtom,
} from '../../recoilState';

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

const SLiveContainer = styled.div`
  a {
    text-decoration: none;
    color: black;
  }
`;
const SLiveItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2rem;
  border: 1px solid black;
`;
const SLiveImgBox = styled.div`
  width: 34%;
  height: 6rem;
  border: 1px solid black;
  background-color: yellow;
`;
const SLiveContentBox = styled.div`
  width: 66%;
  height: 6rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: beige;
`;
const SLiveImg = styled.div``;

const SLiveTitle = styled.div`
  font-size: 1.2rem;
  margin-top: 0.5rem;
  margin-left: 0.5rem;
`;
const SLiveShelter = styled.div`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  margin-right: 0.5rem;
  text-align: right;
`;

function Live() {
  const user = useRecoilValue(userAtom);
  const [liveList, setLiveList] = useRecoilState(liveListAtom);
  const [timetableShelterId, setTimetableShelterId] = useRecoilState(
    timetableShelterIdAtom,
  );

  const handleClickLive = id => {
    setTimetableShelterId(id);
  };

  useEffect(() => {
    axios.get(`${API_URL}/live/all`).then(res => {
      setLiveList(res.data.data);
    });
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
          <Link to="/createschedule" key={index} state={live}>
            <SLiveItem onClick={() => handleClickLive(live.shelterId)}>
              <SLiveImgBox>
                <SLiveImg>{live.image}</SLiveImg>
              </SLiveImgBox>
              <SLiveContentBox>
                <SLiveTitle>{live.title}</SLiveTitle>
                <SLiveShelter>{live.shelterName}</SLiveShelter>
              </SLiveContentBox>
            </SLiveItem>
          </Link>
        ))}
      </SLiveContainer>
      <Nav />
    </>
  );
}
export default Live;
