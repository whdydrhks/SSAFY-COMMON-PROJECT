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
      <div>관리번호 : {item.manageCode}</div>
      <div>이름 : {item.name}</div>
      <div>나이 : {item.age}</div>
      <div>품종 : {item.breed}</div>
      <div>성별 : {item.gender}</div>
      <div>체중 : {item.weight}</div>
      <div>중성화 여부 : {item.neuter}</div>
      <div>특징 : {item.note}</div>
      <hr />
    </SDetail>
  );
}

AnimalItem.propTypes = {
  item: PropTypes.shape({
    animalId: PropTypes.number,
    shelterId: PropTypes.number,
    name: PropTypes.string,
    manageCode: PropTypes.string,
    thumbnailImage: PropTypes.string,
    breed: PropTypes.string,
    age: PropTypes.number,
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
