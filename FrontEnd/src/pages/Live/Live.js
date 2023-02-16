/* eslint-disable no-await-in-loop */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import axios from 'axios';
import React, { useEffect, useState, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import API_URL from '../../api/api';
import Header from '../../components/common/Header';
import Nav from '../../components/common/Nav';
import {
  liveListAtom,
  roomNumberAtom,
  userAtom,
  urlAtom,
} from '../../recoilState';
import '../../styles/fonts.css';
import CreateLive from '../../images/Video/CreateLive.png';
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
  const user = useRecoilValue(userAtom);
  const [urlArr, setUrlArr] = useRecoilState(urlAtom);
  const [liveList, setLiveList] = useRecoilState(liveListAtom);
  const [roomNumberInfo, setRoomNumberInfo] = useRecoilState(roomNumberAtom);

  useEffect(() => {
    const axiosFn = async () => {
      await axios.get(`${API_URL}/live/all`).then(res => {
        setLiveList(res.data.data);
      });
    };

    axiosFn();
  }, []);

  // const tmp = live => {
  //   axios({
  //     method: 'GET',
  //     url: live.thumnailImage,
  //     responseType: 'blob',
  //   }).then(
  //     res =>
  //       console.log(
  //         window.URL.createObjectURL(
  //           new Blob([res.data], { type: res.headers['content-type'] }),
  //         ),
  //       ),

  // dfsdfadsfas
  // setUrlArr([
  //   ...urlArr,
  //   window.URL.createObjectURL(
  //     new Blob([res.data], { type: res.headers['content-type'] }),
  //   ),
  // ]);
  //   );
  // };

  useEffect(() => {
    const loopFn = async () => {
      for (let i = 0; i < liveList.length; i += 1) {
        await axios({
          method: 'GET',
          url: liveList[i].thumnailImage,
          responseType: 'blob',
        }).then(res => {
          // console.log(res);
          setUrlArr([
            ...urlArr,
            window.URL.createObjectURL(
              new Blob([res.data], { type: res.headers['content-type'] }),
            ),
          ]);
        });
      }
    };

    loopFn();
  }, [liveList]);

  console.log(urlArr);

  const saveRoomNumber = l => {
    console.log(l.room);
    setRoomNumberInfo(l.room);
  };

  // console.log(urlArr);

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
              {/* <Suspense fallback={<div>로딩중</div>}> */}
              <S.LiveImage
                src={urlArr[index]}
                alt="ThumbnailImage"
                loading="lazy"
              />
              <div>{urlArr[index]}</div>
              {/* </Suspense>{' '} */}
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
