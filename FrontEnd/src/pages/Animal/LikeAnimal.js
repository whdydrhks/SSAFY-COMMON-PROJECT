/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */

import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import axios from 'axios';
import API_URL from '../../api/api';
import Header from '../../components/common/Header';
import Nav from '../../components/common/Nav';
import { userAtom } from '../../recoilState';
import { getCookie } from '../Account/cookie';

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
      <div>관심동물</div>
      <div>
        {likeAnimal.map((item, index) => (
          <>
            <div key={index}>{item.animalId}</div>
            <div key={index}>{item.breed}</div>
            <div key={index}>{item.gender}</div>
            <div key={index}>{item.note}</div>
            <div key={index}>{item.neuter}</div>
          </>
        ))}
      </div>{' '}
      <Nav />
    </>
  );
}

export default LikeAnimal;
