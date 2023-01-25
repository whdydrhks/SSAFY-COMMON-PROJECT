import React, { useState, useEffect } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import Header from '../../components/common/Header';
import Nav from '../../components/common/Nav';
import CatSelect from '../../components/Adoption/CatSelect';
import DogSelect from '../../components/Adoption/DogSelect';
import adoptionListState from '../../state/adoptionList';

let id = 0;
const getId = () => {
  id += 1;
  return id;
};

function CreateAdoption() {
  const speciesList = ['강아지', '고양이', '기타 동물'];
  const [animalImage, setAnimalImage] = useState('');
  const [breed, setBreed] = useState('개(믹스견)');
  const [weight, setWeight] = useState(0);
  const [selectedSpecies, setSelectedSpecies] = useState('강아지');
  const [age, setAge] = useState(0);
  const [ageType, setAgeType] = useState('세');
  const [sex, setSex] = useState('남');
  const temp = useRecoilValue(adoptionListState);

  useEffect(() => {
    console.log(temp);
  }, [id]);
  const getBreed = e => {
    setBreed(e);
  };

  const handleSelect = e => {
    setSelectedSpecies(e.target.value);
  };

  const setAdoptionList = useSetRecoilState(adoptionListState);

  const handleAnimalImage = e => {
    setAnimalImage(e.target.value);
  };

  const handleWeight = e => {
    setWeight(e.target.value);
  };

  const handleAge = e => {
    setAge(e.target.value);
  };

  const handleAgeType = e => {
    setAgeType(e.target.value);
  };

  const handleSex = e => {
    setSex(e.target.value);
  };

  const addAdoptionAnimal = () => {
    setAdoptionList(oldAdoptionList => [
      ...oldAdoptionList,
      {
        id: getId(),
        image: animalImage,
        species: selectedSpecies,
        breed,
        weight,
        age,
        ageType,
        sex,
      },
    ]);
  };
  return (
    <>
      <Header />
      <Nav />
      <h1>동물 등록</h1>
      <hr />

      {/* 사진 입력 폼 */}
      <input
        type="file"
        accept="image/*"
        value={animalImage}
        onChange={handleAnimalImage}
      />

      {/* 종류 입력 폼 */}
      <span>종류</span>
      <select onChange={handleSelect} value={selectedSpecies}>
        {speciesList.map(item => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>

      {/* 품종 입력 폼 */}
      <span style={{ marginLeft: '100px' }}>품종</span>
      <span style={{ marginRight: '100px' }}>
        {(() => {
          switch (selectedSpecies) {
            case '강아지':
              return <DogSelect getBreed={getBreed} />;
            case '고양이':
              return <CatSelect getBreed={getBreed} />;
            case '기타 동물':
              return (
                <input type="text" placeholder="동물 종류를 입력해주세요." />
              );
            default:
              return <DogSelect />;
          }
        })()}
      </span>

      {/* 체중 입력 폼 */}
      <span>체중</span>
      <input
        type="number"
        value={weight}
        onChange={handleWeight}
        placeholder="체중을 입력해 주세요."
      />
      <span style={{ marginRight: '100px' }}>kg</span>

      {/* 나이 입력 폼 */}
      <span>나이</span>
      <input
        type="number"
        placeholder="나이를 입력해 주세요."
        value={age}
        onChange={handleAge}
      />
      <select onChange={handleAgeType} style={{ marginRight: '10px' }}>
        <option value="year">세</option>
        <option value="month">개월</option>
      </select>

      {/* 성별 입력 폼 */}
      <span>성별</span>
      <select onChange={handleSex}>
        <option value="남">남</option>
        <option value="여">여</option>
        <option value="unknown">Unknown</option>
      </select>
      <button onClick={addAdoptionAnimal} type="button">
        동물 등록
      </button>
    </>
  );
}

export default CreateAdoption;
