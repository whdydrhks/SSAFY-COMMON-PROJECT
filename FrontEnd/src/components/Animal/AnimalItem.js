import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import '../../styles/cafe24.css';
import helloIcon from '../../images/logo/helloIcon.png';

const SDetail = styled.div`
  font-family: 'cafe24';
  display: flex;
`;

const SAnimalImage = styled.img`
  min-height: 10rem;
  height: 100%;
  width: 30%;
  max-height: 5rem;
  display: flex;
  object-fit: cover;
  position: flex;
  margin-right: auto;
  border: 1px solid black;
`;

const SItemContainer = styled.div`
  flex-wrap: nowrap;
  text-align: left;
  width: 50%;
  position: left;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  /* border: 1px solid black; */
  // display: inline-block;
`;

const SAnimalItem = styled.div`
  overflow: hidden;
  display: left;
  flex-direction: row;
  flex-grow: 1;
  // margin: 20px 5px;
  flex-basis: 270px;
`;

function AnimalItem({ item }) {
  return (
    <div>
      <SDetail>
        <SAnimalImage src={helloIcon} alt="준비중" onError={helloIcon} />
        <SItemContainer>
          <SAnimalItem>관리번호 : {item.manageCode}</SAnimalItem>
          <SAnimalItem>이름 : {item.name}</SAnimalItem>
          <SAnimalItem>나이 : {item.age}</SAnimalItem>
          <SAnimalItem>품종 : {item.breed}</SAnimalItem>
          <SAnimalItem>성별 : {item.gender}</SAnimalItem>
          <SAnimalItem>체중 : {item.weight}</SAnimalItem>
          <SAnimalItem>중성화 여부 : {item.neuter}</SAnimalItem>
          <SAnimalItem>특징 : {item.note}</SAnimalItem>
        </SItemContainer>
      </SDetail>
      <hr />
    </div>
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
