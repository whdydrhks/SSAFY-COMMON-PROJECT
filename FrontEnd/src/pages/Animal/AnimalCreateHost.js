import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { animalListState, animalNumber } from '../../recoilState';
import Nav from '../../components/common/Nav';
import Header from '../../components/common/Header';

function AnimalCreateHost() {
  let id = useRecoilValue(animalNumber);
  const getId = () => {
    id += 1;
    return id;
  };

  //   확인용
  // const temp = useRecoilValue(animalList);
  // useEffect(() => {
  //   console.log(temp);
  // }, [id]);

  const setAnimalList = useSetRecoilState(animalListState);

  const [manageNumber, setManageNumber] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const genderList = ['M', 'F'];
  const [gender, setGender] = useState('M');
  const [breed, setBreed] = useState('');
  const [weight, setWeight] = useState(0);
  const neuterList = ['T', 'F'];
  const [neuter, setNeuter] = useState('T');
  const [note, setNote] = useState('');

  const handleManageNumber = e => {
    setManageNumber(e);
  };

  const handleName = e => {
    setName(e);
  };

  const handleAge = e => {
    setAge(e);
  };

  const handleGender = e => {
    setGender(e);
  };

  const handleBreed = e => {
    setBreed(e);
  };

  const handleWeight = e => {
    setWeight(e);
  };

  const handleNeuter = e => {
    setNeuter(e);
  };

  const handleNote = e => {
    setNote(e);
  };

  const addAnimal = () => {
    setAnimalList(oldAnimalList => [
      ...oldAnimalList,
      {
        animalId: getId(),
        shelterId: 0,
        name,
        manageNumber,
        thumbnailImage: '파일경로',
        breed,
        age,
        gender,
        weight: parseFloat(weight),
        neuter,
        note,
        expired: 'F',
      },
    ]);
  };

  return (
    <>
      <Header />

      <div>
        <span>관리번호</span>
        <input
          type="text"
          onChange={handleManageNumber}
          placeholder="관리번호를 입력해 주세요."
        />
      </div>

      <div>
        <span>이름</span>
        <input
          type="text"
          onChange={handleName}
          placeholder="이름을 입력해 주세요."
        />
      </div>

      <div>
        <span>나이</span>
        <input
          type="text"
          onChange={handleAge}
          placeholder="나이를 입력해 주세요."
        />
      </div>

      <div>
        <span>성별</span>
        <select onChange={handleGender}>
          {genderList.map(item => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div>
        <span>품종</span>
        <input
          type="text"
          onChange={handleBreed}
          placeholder="품종을 입력해 주세요."
        />
      </div>

      <div>
        <span>체중</span>
        <input
          type="number"
          onChange={handleWeight}
          placeholder="체중을 입력해 주세요."
        />
      </div>

      <div>
        <span>중성화 여부</span>
        <select onChange={handleNeuter}>
          {neuterList.map(item => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div>
        <span>특징</span>
        <textarea onChange={handleNote} />
      </div>

      <Link to="/animal">
        <button type="button" onClick={addAnimal}>
          동물 등록
        </button>
      </Link>

      <Nav />
    </>
  );
}

export default AnimalCreateHost;
