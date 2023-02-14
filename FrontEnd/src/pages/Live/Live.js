/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */

import axios from 'axios';
import React, { useEffect } from 'react';
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
  const today = new Date();
  const payloadRoomNumber = today.getTime();
  const itemData = [
    {
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      title: 'Breakfast',
      author: '@bkristastucchio',
      rows: 2,
      cols: 2,
      featured: true,
    },
    {
      img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      title: 'Burger',
      author: '@rollelflex_graphy726',
    },
    {
      img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
      title: 'Camera',
      author: '@helloimnik',
    },
    {
      img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
      title: 'Coffee',
      author: '@nolanissac',
      cols: 2,
    },
    {
      img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
      title: 'Hats',
      author: '@hjrc33',
      cols: 2,
    },
    {
      img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
      title: 'Honey',
      author: '@arwinneil',
      rows: 2,
      cols: 2,
      featured: true,
    },
    {
      img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
      title: 'Basketball',
      author: '@tjdragotta',
    },
    {
      img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
      title: 'Fern',
      author: '@katie_wasserman',
    },
    {
      img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
      title: 'Mushrooms',
      author: '@silverdalex',
      rows: 2,
      cols: 2,
    },
    {
      img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
      title: 'Tomato basil',
      author: '@shelleypauls',
    },
    {
      img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
      title: 'Sea star',
      author: '@peterlaster',
    },
    {
      img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
      title: 'Bike',
      author: '@southside_customs',
      cols: 2,
    },
  ];

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
          <Link to="/livechat" state={{ roomNumber: payloadRoomNumber }}>
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
      {/* <SContainer>
        <ImageList sx={{ width: 0.9, height: 0.9 }}>
          <ImageListItem key="Subheader" cols={2}>
            <STitle>라이브</STitle>
          </ImageListItem>
          {itemData.map(item => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.img}?w=248&fit=crop&auto=format`}
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar
                title={item.title}
                subtitle={item.author}
                actionIcon={
                  <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                    aria-label={`info about ${item.title}`}
                  >
                    <InfoIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      </SContainer> */}
      {/* <ImageList sx={{ width: 1, height: 1 }}>
        {itemData.map(item => (
          <ImageListItem key={item.img}>
            <img
              src={`${item.img}?w=248&fit=crop&auto=format`}
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.title}
              subtitle={<span>by: {item.author}</span>}
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
