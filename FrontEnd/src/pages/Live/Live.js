/* eslint-disable camelcase */
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
import live_1 from '../../images/live_dummy/live_1.png';
import live_2 from '../../images/live_dummy/live_2.png';
import live_3 from '../../images/live_dummy/live_3.png';
import live_4 from '../../images/live_dummy/live_4.png';
import live_5 from '../../images/live_dummy/live_5.png';
import live_6 from '../../images/live_dummy/live_6.png';

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
  const [loading, setLoading] = useState(true);
  const [liveImgArr, setLiveImgArr] = useState([]);

  useEffect(() => {
    setLiveImgArr([live_1, live_2, live_3, live_4, live_5, live_6]);
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
    if (liveList.length === 0) return;
    const loopFn = async () => {
      console.log(liveList.length);
      for (let i = 0; i < liveList.length; i += 1) {
        console.log(`${i}: ${liveList[0].thumnailImage}`);
        await axios({
          method: 'GET',
          url: liveList[i].thumnailImage,
          responseType: 'blob',
        }).then(res => {
          console.log(res.data);
          console.log(
            window.URL.createObjectURL(
              new Blob([res.data], { type: res.headers['content-type'] }),
            ),
          );
          setUrlArr([
            ...urlArr,
            window.URL.createObjectURL(
              new Blob([res.data], { type: res.headers['content-type'] }),
            ),
          ]);
          console.log(urlArr.length);
        });
      }
      setLoading(false);
    };
    loopFn();
  }, [liveList]);

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
          <SLink
            to="/livechat"
            key={index}
            state={{ roomNumber: live.room, shelterId: live.shelterId }}
          >
            <S.LiveItemContainer
              className={live.room}
              onClick={() => saveRoomNumber(live)}
            >
              <S.LiveImage src={liveImgArr[index % 6]} alt="ThumbnailImage" />

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
