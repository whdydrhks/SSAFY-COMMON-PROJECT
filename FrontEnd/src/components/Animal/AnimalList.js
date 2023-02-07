/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// import axios from 'axios';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { animalListState } from '../../recoilState';
import AnimalItem from './AnimalItem';
import API_URL from '../../api/api';

const SLink = styled(Link)`
  margin: 0 auto;
  color: black;
  text-decoration: none;
`;

function AnimalList(props) {
  const animalList = useRecoilValue(animalListState);
  // console.log(animalList);
  // console.log(props);

  const [temp, setTemp] = useState([]);

  const getAnimalList = async () => {
    const filteredAnimalList = await axios.get(
      `${API_URL}/shelter/1/animal?pageNo=1`,
    );
    setTemp(filteredAnimalList.data);
  };
  console.log(temp);
  useEffect(() => {
    getAnimalList();
  }, []);
  axios.get(url, { params: { expired: props.expired } }).then(res => {
    console.log(res);
  });

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
