import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { motion } from "framer-motion";
import helloIcon from '../../images/logo/helloIcon.png';
// import gaejookee from '../../images/dummy/gaejookee.png';
import cat1 from '../../images/dummy/cat1.png';
import nameIcon from '../../images/AnimalDetail/name.png';
import manageCodeIcon from '../../images/AnimalDetail/manageCode.png';
import breedIcon from '../../images/AnimalDetail/breed.png'
import "../../styles/fonts.css";


const SDetail = styled.div`
  display: flex;
  margin-left: 0.1%;
  margin-right: 0.1%;
  margin-bottom: 5%;
  border-radius: 5%;
  /* background-color: rgba(244,240,230,0.7); */
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`;

const SHr = styled.div`
  /* border: 1px solid rgba(244,240,230,1);; */
  color: black;
  text-decoration: none;
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
  font-size: 1.5rem;
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

function AnimalItem({ item }) {
  return (
    <motion.div
    className="swiper-slide"
    whileHover={{ scale: 1.12 }}
    transition={{ type: "spring", stiffness: 45 }}>
      <SDetail>
        <SAnimalImage src={cat1} alt="준비중" onError={helloIcon} />
        <SItemContainer>
          <SAnimalItem>
            <SNoteImg src={manageCodeIcon}/>
            {item.manageCode}
          </SAnimalItem>
          <SAnimalItem>
            <SNoteImg src={nameIcon} />{item.name} [{item.age}살]</SAnimalItem>
          <SAnimalItem>
            <SNoteImg src={breedIcon}/>
            {item.breed}
            </SAnimalItem>
        </SItemContainer>
      </SDetail>
      <SHr />
      </motion.div>
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
