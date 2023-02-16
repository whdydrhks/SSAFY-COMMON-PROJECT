/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-useless-fragment */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import styled from 'styled-components';
import '../../styles/slick-theme.css';
import '../../styles/slick.css';
import Slider from 'react-slick';
import cat1 from '../../images/dummy/cat1.png';
import gaejookee from '../../images/dummy/gaejookee.png';
import dog1 from '../../images/dummy/dog1.jpg';
import dogYawn from '../../images/dummy/dogYawn.jpg';
import live_1 from '../../images/live_dummy/live_1.png';
import live_2 from '../../images/live_dummy/live_2.png';
import live_3 from '../../images/live_dummy/live_3.png';
import live_4 from '../../images/live_dummy/live_4.png';
import live_5 from '../../images/live_dummy/live_5.png';
import live_6 from '../../images/live_dummy/live_6.png';
import API_URL from '../../api/api';

const SImage = styled.img`
  // 기존
  /* width: 240px; */
  min-width: 25rem;
  max-height: 14.4rem;
  border: 1px solid black;
  margin: auto;
`;

const SSlider = styled(Slider)`
  /* margin-bottom: 5rem; */
`;

const SLiveInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 15px 15px 0 0;
  margin-top: 1rem;
  /* margin-bottom: 1rem; */
  font-family: mainFont;
`;

const SLiveTitleBox = styled.div`
  font-size: 1.5rem;
  margin-left: 1rem;
  text-align: center;
  display: flex;
  align-items: flex-start;
  width: 20rem;
`;

const SShelterNicknameBox = styled.div`
  /* width: 50%; */
  /* text-align: center; */
  align-items: flex-end;
  margin-right: 1rem;
  margin-bottom: 1rem;
`;

function HomeImageCarousel() {
  const settings = {
    arrows: false,
    autoplay: true,
    centerPadding: '0px',
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const [liveImgArr, setLiveImgArr] = useState([]);
  const [liveList, setLiveList] = useState([]);

  useEffect(() => {
    setLiveImgArr([live_1, live_2, live_3, live_4, live_5, live_6]);
    axios.get(`${API_URL}/live/all`).then(res => setLiveList(res.data.data));
  });

  return (
    <div>
      <SSlider {...settings}>
        {liveList.map((live, index) => (
          <>
            <SLiveInfoBox>
              <SLiveTitleBox>{live.title}</SLiveTitleBox>
            </SLiveInfoBox>
            <SLiveInfoBox>
              <SShelterNicknameBox>{live.shelterName}</SShelterNicknameBox>
            </SLiveInfoBox>
            <SImage src={liveImgArr[index % 6]} />
          </>
        ))}
      </SSlider>
    </div>
  );
}

export default HomeImageCarousel;
