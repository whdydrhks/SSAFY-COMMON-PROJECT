import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import helloIcon from '../../images/logo/helloIcon.png';

const SDetail = styled.div`
  display: flex;
  margin: 2rem 0;
`;

const SHr = styled.div`
  border: 1px solid grey;
  color: black;
  text-decoration: none;
`;

const SAnimalImage = styled.img`
  min-height: 8rem;
  width: 40%;
  max-height: 8rem;
  display: flex;
  object-fit: cover;
  position: flex;
  margin-right: 3rem;
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
  margin-bottom: 1rem;
  flex-basis: 270px;
`;

function AnimalItem({ item }) {
  return (
    <div>
      <SDetail>
        <SAnimalImage src={helloIcon} alt="준비중" onError={helloIcon} />
        <SItemContainer>
          <SAnimalItem>
            관리번호 : <br />
            {item.manageCode}
          </SAnimalItem>
          <SAnimalItem>이름 : {item.name}</SAnimalItem>
          <SAnimalItem>나이 : {item.age}</SAnimalItem>
          <SAnimalItem>품종 : {item.breed}</SAnimalItem>
        </SItemContainer>
      </SDetail>
      <SHr />
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
