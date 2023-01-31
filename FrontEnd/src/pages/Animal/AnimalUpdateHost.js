import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router-dom';
import { animalListState } from '../../recoilState';
import Header from '../../components/common/Header';
import Nav from '../../components/common/Nav';

function AnimalEdit() {
  //   항목을 설정
  //   입양 상태, 관리 번호, 이름, 나이, 성별, 품종, 체중, 중성화 여부, 특징, 사진
  const animalIdForUpdate = useParams();
  const temp = useRecoilValue(animalListState);
  const animal = temp[animalIdForUpdate.animalId];
  console.log(animal);
  const [expired, setExpired] = useState(animal.expired);
  const [manageNumber, setManageNumber] = useState(animal.manageNumber);
  const [name, setName] = useState(animal.name);
  const genderList = ['M', 'F'];
  const [age, setAge] = useState(animal.age);
  const [gender, setGender] = useState(animal.Gender);
  const [breed, setBreed] = useState(animal.breed);
  const [weight, setWeight] = useState(animal.weight);
  const neuterList = ['T', 'F'];
  const [neuter, setNeuter] = useState(animal.neuter);
  const [note, setNote] = useState(animal.note);
  const handleExpired = e => {
    setExpired(e);
  };
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

  const handleUpdateAnimal = e => {
    setManageNumber(e.manageNumber);
    setName(e.name);
    setAge(e.age);
    setGender(e, gender);
    setBreed(e.breed);
    setWeight(e.weight);
    setNeuter(e.neuter);
    setNote(e.note);
  };
  // useEffect사용해서 마운트 될때 한번만 실행 (데이터 불러오기)
  //   useEffect(() => {
  //     const getDetail = async () => {
  //       const { data } = await axios.get(`url`);
  //       return data;
  //     };
  //     getDetail().then(result => {
  //       setManageNumber(result.manageNumber);
  //       setName(result.name);
  //       setAge(result.age);
  //       setGender(result, gender);
  //       setBreed(result.breed);
  //       setWeight(result.weight);
  //       setNeuter(result.neuter);
  //       setNote(result.note);
  //     });
  //   }, []);
  return (
    <>
      <Header />
      <form>
        <div>
          <span>입양 상태</span>
          <select onChange={handleExpired} value={expired}>
            <option value="T">입양 완료</option>
            <option value="F">입양 중</option>
          </select>
        </div>
        <div>
          <span>관리번호</span>
          <input
            type="text"
            name="manageNumber"
            value={manageNumber}
            onChange={handleManageNumber}
            placeholder="관리번호를 입력해 주세요."
          />
        </div>
        <div>
          <span>이름</span>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleName}
            placeholder="이름을 입력해 주세요."
          />
        </div>
        <div>
          <span>나이</span>
          <input
            type="text"
            name="age"
            value={age}
            onChange={handleAge}
            placeholder="나이를 입력해 주세요."
          />
        </div>
        <div>
          <span>성별</span>
          <select onChange={handleGender} name="gender" value={gender}>
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
            name="breed"
            value={breed}
            onChange={handleBreed}
            placeholder="품종을 입력해 주세요."
          />
        </div>
        <div>
          <span>체중</span>
          <input
            type="number"
            name="weight"
            value={weight}
            onChange={handleWeight}
            placeholder="체중을 입력해 주세요."
          />
        </div>
        <div>
          <span>중성화 여부</span>
          <select onChange={handleNeuter} name="neuter" value={neuter}>
            {neuterList.map(item => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div>
          <span>특징</span>
          <textarea onChange={handleNote} name="note" value={note} />
        </div>
        <input type="submit" onSubmit={handleUpdateAnimal} />
      </form>
      <Nav />
    </>
  );
}

export default AnimalEdit;
