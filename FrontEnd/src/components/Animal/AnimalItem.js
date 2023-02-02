import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import '../../styles/cafe24.css';

const SDetail = styled.div`
  font-family: 'cafe24';
`;

function AnimalItem({ item }) {
  return (
    <SDetail>
      <p>관리번호 : {item.manageNumber}</p>
      <p>이름 : {item.name}</p>
      <p>나이 : {item.age}</p>
      <p>품종 : {item.breed}</p>
      <p>성별 : {item.gender}</p>
      <p>체중 : {item.weight}</p>
      <p>중성화 여부 : {item.neuter}</p>
      <p>특징 : {item.note}</p>
      <hr />
    </SDetail>
  );
}

AnimalItem.propTypes = {
  item: PropTypes.shape({
    animalId: PropTypes.number,
    shelterId: PropTypes.number,
    name: PropTypes.string,
    manageNumber: PropTypes.string,
    thumbnailImage: PropTypes.string,
    breed: PropTypes.string,
    age: PropTypes.string,
    gender: PropTypes.string,
    weight: PropTypes.number,
    neuter: PropTypes.string,
    note: PropTypes.string,
    expired: PropTypes.string,
  }),
};
AnimalItem.defaultProps = {
  item: null,
};

export default AnimalItem;
