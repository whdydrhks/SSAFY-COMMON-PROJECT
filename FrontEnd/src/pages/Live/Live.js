/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import API_URL from '../../api/api';
import Header from '../../components/common/Header';
import Nav from '../../components/common/Nav';
import {
  liveListAtom,
  timetableShelterIdAtom,
  userAtom,
} from '../../recoilState';

const SContainer = styled.div`
  ul {
    margin: auto;
  }
`;

const SLiveHeader = styled.div`
  display: flex;
  padding: 2rem;
  justify-content: space-between;
`;

const STitle = styled.div`
  width: 30%;
  font-size: 1.6rem;
  margin: auto;
  border-radius: 15px 15px 15px 0;
  border-bottom: 5px solid #b9c4c4;
  padding: 1rem 2.5rem;
  background: #cedada;
  margin-top: 1rem;
  margin-bottom: 1rem;
  text-align: center;
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
const SLiveImg = styled.img``;

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
  const today = new Date();
  const payloadRoomNumber = today.getTime();

  const user = useRecoilValue(userAtom);
  const [liveList, setLiveList] = useRecoilState(liveListAtom);
  const [timetableShelterId, setTimetableShelterId] = useRecoilState(
    timetableShelterIdAtom,
  );
  const [thumbnailImages, setThumbnailImages] = useState([]);
  const [lifeInfo, setLifeInfo] = useState([]);

  // const [liveInfo,setLiveInfo] = useState([]);

  // tempLiveInfo.forEach(liveId => {
  //   axios.get(`${API_URL}/${liveId}/image`).then(res => tempImgList.push(res));
  // });
  // console.log(tempImgList);
  const handleClickLive = id => {
    setTimetableShelterId(id);
  };
  // console.log(liveList);
  useEffect(async () => {
    await axios.get(`${API_URL}/live/all`).then(res => {
      setLiveList(res.data.data);
      console.log(res.data.data);
      console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@');
    });
  }, []);

  return (
    <>
      <Header />
      <SLiveHeader>
        <STitle>Live</STitle>
        {user.role === 'HOST' ? (
          <Link to="/livechat" state={{ roomNumber: payloadRoomNumber }}>
            <SLiveCreateButton>생성</SLiveCreateButton>
          </Link>
        ) : null}
      </SLiveHeader>
      {/* <SLiveContainer>
        {liveList.map((live, index) => (
          <Link to="/livechat" key={index} state={{ roomNumber: live.room }}>
            <SLiveItem onClick={() => handleClickLive(live.shelterId)}>
              <SLiveImgBox>
                <div>{live.thumbnailImage}</div>
                <img
                  src={live.thumnailImage}
                  alt="liveThumbnail"
                  style={{ width: '100%', height: '100%' }}
                />
              </SLiveImgBox>
              <SLiveContentBox>
                <SLiveTitle>{live.title}</SLiveTitle>
                <SLiveShelter>{live.shelterName}</SLiveShelter>
              </SLiveContentBox>
            </SLiveItem>
          </Link>
        ))}
      </SLiveContainer> */}
      <SContainer>
        <ImageList sx={{ width: 0.9, height: 0.9 }}>
          {/* <ImageListItem key="Subheader" cols={2}> */}
          {/* <STitle>라이브</STitle> */}
          {/* </ImageListItem> */}
          {liveList.map((item, index) => (
            <Link to="/livechat" key={index} state={{ roomNumber: item.room }}>
              <ImageListItem key={item.img} style={{ width: '40vw' }}>
                <img
                  src={item.thumnailImage}
                  srcSet={item.thumnailImage}
                  alt={item.title}
                  loading="lazy"
                  style={{ width: '40vw', height: '20vh' }}
                />
                <ImageListItemBar
                  title={item.title}
                  subtitle={item.shelterName}
                  actionIcon={
                    <IconButton
                      sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                      aria-label={`info about ${item.title}`}
                    >
                      {/* <InfoIcon /> */}
                    </IconButton>
                  }
                />
              </ImageListItem>
            </Link>
          ))}
        </ImageList>
      </SContainer>
      {/* <ImageList sx={{ width: 1, height: 1 }}>
        {liveList.map(item => (
          <ImageListItem key={item.thumnail}>
            <img
              src={item.thumnailImage}
              srcSet={item.thumnailImage}
              alt="temp"
              loading="lazy"
            />
            <ImageListItemBar
              title={item.title}
              subtitle={<span>by: {item.shelterName}</span>}
              position="below"
            />
          </ImageListItem>
        ))}
      </ImageList> */}
      <Nav />
    </>
  );
}
export default Live;
