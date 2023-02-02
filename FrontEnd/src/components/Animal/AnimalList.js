import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { animalListState } from '../../recoilState';
import AnimalItem from './AnimalItem';

const SLink = styled(Link)`
  margin: 0 auto;
  color: black;
  text-decoration: none;
`;

function AnimalList() {
  const animalList = useRecoilValue(animalListState);

  return (
    <div>
      {animalList.map(animalItem => (
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
