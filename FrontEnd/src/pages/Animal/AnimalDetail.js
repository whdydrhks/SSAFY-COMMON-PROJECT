import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../../components/common/Header';
import Nav from '../../components/common/Nav';

function AnimalDetail() {
  const location = useLocation();
  const { animal } = location.state;

  return (
    <>
      <Header />

      <div>동물 Detail</div>
      <div>관리 번호 : {animal.manageNumber}</div>
      <div>이름 : {animal.name}</div>
      <div>사진 : {animal.thumbnailImage}</div>
      <div>품종 : {animal.breed}</div>
      <div>성별 : {animal.gender}</div>
      <div>체중 : {animal.weight}</div>
      <div>중성화 여부 : {animal.neuter}</div>
      <div>특징 : {animal.note}</div>

      <Link to={`/animal/update/${animal.animalId}`}>수정하기</Link>
      <Nav />
    </>
  );
}

export default AnimalDetail;
