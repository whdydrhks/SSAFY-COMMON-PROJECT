/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-no-useless-fragment */

import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import API_URL from '../../api/api';
import Header from '../../components/common/Header';
import Nav from '../../components/common/Nav';

import { userAtom } from '../../recoilState';
import { getCookie } from '../Account/cookie';
import helloIcon from '../../images/logo/helloIcon.png';
import gaejookee from '../../images/dummy/gaejookee.png';
import nameIcon from '../../images/AnimalDetail/name.png';
import genderIcon from '../../images/AnimalDetail/gender.png';
import breedIcon from '../../images/AnimalDetail/breed.png';
import '../../styles/fonts.css';
import dog_1 from '../../images/dogDetail/dog_1.png';

const SAll = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const SDetail = styled.div`
  width: 100%;
  display: flex;
  margin-left: 1%;
  margin-right: 1%;
  margin-bottom: 5%;
  border-radius: 5%;
  /* background-color: rgba(244, 240, 230, 0.7); */
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`;

const SLink = styled(Link)`
  margin: 2 auto;
  color: black;
  text-decoration: none;
  font-family: mainFont;
`;

const SHr = styled.div`
  font-size: 2rem;
  margin-top: 1rem;
  font-family: mainFont;
  margin-left: 1rem;
  margin-bottom: 1.4rem;
`;

const SAnimalImage = styled.img`
  min-height: 10%;
  width: 35%;
  max-height: 10%;
  display: flex;
  object-fit: cover;
  position: flex;
  margin-left: 5%;
  margin-top: 3%;
  margin-bottom: 3%;
  margin-right: 3%;
  border-radius: 100%;
  /* border: 1px solid black; */
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.6);
`;

const SItemContainer = styled.div`
  flex-wrap: nowrap;
  text-align: left;
  width: 100%;
  position: left;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  /* border: 1px solid black; */
  // display: inline-block;
`;

const SAnimalItem = styled.div`
  /* overflow: hidden; */
  /* display: center; */
  flex-direction: row;
  flex-grow: 1;
  margin-left: 0.5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  flex-basis: 270px;
  font-size: 1.2rem;
  width: 100%;
  font-family: mainFont;
`;

const SNoteImg = styled.img`
  width: 1.2rem;
  height: 1.2rem;
  margin-right: 0.5rem;
  /* margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  margin-right: 1rem; */
`;

function LikeAnimal() {
  const accessToken = getCookie('accessToken');
  const user = useRecoilValue(userAtom);
  const [likeAnimal, setLikeAnimal] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/user/${user.userId}/like/animal`, {
        headers: { Authorization: accessToken },
      })
      .then(res => setLikeAnimal(res.data.data));
  }, []);
  console.log('likeAnimal : ', likeAnimal);

  return (
    <>
      <Header />
      <SHr>관심있는 친구들</SHr>

      {/* 파일 수정 */}
      <SAll>
        {likeAnimal.map(item => (
          <SLink
            to={`/animal/${item.animalId}`}
            key={item.animalId}
            state={{ animal: item }}
          >
            <motion.div
              className="swiper-slide"
              whileHover={{ scale: 1.12 }}
              transition={{ type: 'spring', stiffness: 45 }}
            >
              <SDetail>
                <SAnimalImage
                  src={dog_1}
                  alt="준비중"
                  onError={helloIcon}
                />
                <SItemContainer>
                  <SAnimalItem>
                    <SNoteImg src={nameIcon} />
                    {item.name} [{item.age}살]
                  </SAnimalItem>

                  <SAnimalItem>
                    <SNoteImg src={breedIcon} />
                    {item.breed}
                  </SAnimalItem>

                  <SAnimalItem>
                    <SNoteImg src={genderIcon} />
                    {item.gender === 'M' ? <>수컷</> : <>암컷</>}
                  </SAnimalItem>
                  {/* <SAnimalItem key={index}>특징{item.note}</SAnimalItem> */}
                  {/* <SAnimalItem key={index}>중성화{item.neuter}</SAnimalItem> */}
                </SItemContainer>
              </SDetail>
            </motion.div>
          </SLink>
        ))}
      </SAll>
      <Nav />
    </>
  );
}

// LikeAnimal.propTypes = {
//   item: PropTypes.shape({
//     animalId: PropTypes.number,
//     shelterId: PropTypes.number,
//     name: PropTypes.string,
//     manageCode: PropTypes.string,
//     thumbnailImage: PropTypes.string,
//     breed: PropTypes.string,
//     age: PropTypes.number,
//     gender: PropTypes.string,
//     weight: PropTypes.number,
//     neuter: PropTypes.string,
//     note: PropTypes.string,
//     expired: PropTypes.string,
//   }),
// };
// LikeAnimal.defaultProps = {
//   item: null,
// };

export default LikeAnimal;
