/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// import axios from 'axios';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { animalListState, userAtom } from '../../recoilState';
import AnimalItem from './AnimalItem';
import API_URL from '../../api/api';

const SLink = styled(Link)`
  margin: 0 auto;
  color: black;
  text-decoration: none;
`;

function AnimalList(props) {
  // const animalList = useRecoilValue(animalListState);
  // console.log(animalList);
  // console.log(props, 'here');

  const [temp, setTemp] = useState([]);
  const userInfo = useRecoilValue(userAtom);
  const shelterId = userInfo.shelterId;

  const getAnimalList = async () => {
    const filteredAnimalList = await axios.get(
      `${API_URL}/shelter/${shelterId}/animal?pageNo=1`,
    );
    setTemp(filteredAnimalList.data.data);
  };
  // console.log(temp);
  useEffect(() => {
    getAnimalList();
  }, []);
  // axios
  //   .get(`${API_URL}/shelter/1/animal?pageNo=1`, {
  //     params: { status: props.status },
  //   })
  //   .then(res => {
  //     console.log(res);
  //   });

  return (
    <div>
      {temp.map(animalItem => (
        <SLink
          to={`/animal/${animalItem.animalId}`}
          key={animalItem.animalId}
          state={{ animal: animalItem }}
        >
          <AnimalItem item={animalItem} />
        </SLink>
      ))}
    </div>
  );
}

export default AnimalList;
