import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/common/Header';
import Nav from '../../components/common/Nav';

function AnimalDetail() {
  const location = useLocation();
  const { animal } = location.state.animal;

  return (
    <>
      <Header />

      <div>동물 Detail</div>
      <div>{animal.animalId}</div>

      <Nav />
    </>
  );
}

export default AnimalDetail;
