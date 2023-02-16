/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import API_URL from '../../api/api';
import Header from '../../components/common/Header';
import Nav from '../../components/common/Nav';
import { liveListAtom, roomNumberAtom, userAtom } from '../../recoilState';
import '../../styles/fonts.css';
import CreateLive from '../../images/Video/CreateLive.png';
import cat1 from '../../images/dummy/cat1.png';
import * as S from './LiveStyle';

const SLiveHeader = styled.div`
  display: flex;
  padding: 1.5rem;
  justify-content: space-between;
  font-family: mainFont;
`;

const STitle = styled.div`
  font-size: 2.4rem;
`;
const SLiveCreateImg = styled.img`
  height: 2rem;
  color: red;
`;

const SLink = styled(Link)`
  padding: 3% 5% 3% 5%;
  color: black;
  text-decoration: none;
  text-decoration-color: black !important;
`;

function Live() {
  const today = new Date();
  const payloadRoomNumber = today.getTime();
  const listImgArr = [];
  const liveURL = [];
  const user = useRecoilValue(userAtom);
  const [urlArr, setUrlArr] = useState([]);
  const [liveList, setLiveList] = useRecoilState(liveListAtom);
  const [roomNumberInfo, setRoomNumberInfo] = useRecoilState(roomNumberAtom);

  useEffect(() => {
    axios.get(`${API_URL}/live/all`).then(res => {
      setLiveList(res.data.data);
    });
  }, []);

  useEffect(() => {
    if (liveList.length !== 0) {
      for (let i = 0; i < liveList.length; i += 1) {
        axios({
          method: 'GET',
          url: liveList[i].thumnailImage,
          responseType: 'blob',
        }).then(res => {
          setUrlArr([
            ...urlArr,
            window.URL.createObjectURL(
              new Blob([res.data], { type: res.headers['content-type'] }),
            ),
          ]);
          // callback(url);
        });
      }
    }
  }, [liveList]);

  console.log(liveURL);
  console.log('0', liveURL[0]);

  const saveRoomNumber = l => {
    console.log(l.room);
    setRoomNumberInfo(l.room);
    // setRoomNumberAtom
  };

  return (
    <>
      <Header />
      <SLiveHeader>
        <STitle>라이브</STitle>
        {user.role === 'HOST' ? (
          <Link to="/livechat" state={{ roomNumber: payloadRoomNumber }}>
            <SLiveCreateImg src={CreateLive} alt="CreateLive" />
          </Link>
        ) : null}
      </SLiveHeader>
      <S.LiveListContainer>
        {liveList.map((live, index) => (
          <SLink to="/livechat" key={index} state={{ roomNumber: live.room }}>
            <S.LiveItemContainer
              className={live.room}
              onClick={() => saveRoomNumber(live)}
            >
              <S.LiveImage src={urlArr[index]} alt="ThumbnailImage" />
              <S.LiveInformationContainer>
                <S.LiveTitle>{live.title}</S.LiveTitle>
                <S.ShelterName>{live.shelterName}</S.ShelterName>
              </S.LiveInformationContainer>
            </S.LiveItemContainer>
          </SLink>
        ))}
      </S.LiveListContainer>

      <Nav />
    </>
  );
}
export default Live;
