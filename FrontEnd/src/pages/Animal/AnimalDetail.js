import React, { useState } from 'react';
import Modal from 'react-modal';
import { Button } from '@mui/material';
import axios from 'axios';
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header';
import Nav from '../../components/common/Nav';
import ImageCarousel from '../../components/common/ImageCarousel';
import '../../styles/cafe24.css';
import {
  manageCode,
  name,
  breed,
  gender,
  note,
  weight,
  neuter,
} from '../../images/index';

const STitle = styled.div`
  font-family: 'cafe24';
  font-size: 2rem;
  /* margin-top: 2rem; */
  margin-bottom: 1.5rem;
  margin-left: 1rem;
  margin-right: 1rem;
`;

const SLine = styled.div`
  display: flex;
  margin-bottom: 2rem;
`;

const SGrayLineBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 35%;
`;

const SGrayLine = styled.div`
  height: 1px;
  background-color: #d9d9d9;
  opacity: 0.4;
`;

const SDetailInformation = styled.div`
  font-family: 'cafe24';
  font-size: 24;
  width: 30%;
  text-align: center;
`;

const SInformationBox = styled.div`
  height: 2.5rem;
  display: flex;
  justify-content: space-around;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  /* border-radius: 10px; */
`;

const SInformationImg = styled.img`
  width: 2rem;
  height: 2rem;
  margin-top: 0.2rem;
  margin-bottom: 0.5rem;
`;

const SInformationText = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: 'cafe24';
  font-size: 16px;
  border: 1px solid #1f2247;
  border-radius: 40px;
  padding: 10px;
`;

const SNoteBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-left: 1rem;
  margin-bottom: 2rem;
  margin-right: 1rem;
`;

const SNoteImg = styled.img`
  width: 2rem;
  height: 2rem;
  margin-top: 0.2rem;
  margin-bottom: 0.5rem;
  /* margin-right: 1rem; */
`;

const SInformationNote = styled.div`
  display: inline-block;
  width: 80%;
  border: 1px solid #1f2247;
  border-radius: 10px;
  padding: 10px;
  font-family: 'cafe24';
`;

const SButtonBox = styled.div`
  display: flex;
  justify-content: center;
  justify-content: space-evenly;
`;

const SModifyButton = styled(Button)`
  font-family: 'cafe24';
  border-radius: 10px;
  margin-right: 1rem;
  box-shadow: 2px 2px 2px 2px gray;
`;

const SDeleteButton = styled(Button)`
  font-family: 'cafe24';
  background-color: red;
  border-radius: 10px;
  box-shadow: 2px 2px 2px 2px gray;
`;

const SModalBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SButtonBlock = styled.div`
  display: flex;
  justify-content: center;
  justify-content: space-between;
`;

const SModalDeletebutton = styled(Button)`
  font-family: 'cafe24';
  font-size: 2rem;
`;

const SModalCancelbutton = styled(Button)`
  font-family: 'cafe24';
  font-size: 2rem;
`;

const SModalMessage = styled.div`
  font-family: 'cafe24';
  font-size: 24px;
`;
function AnimalDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location.state);
  const key = [manageCode, name, breed, gender, weight, neuter];
  const korKey = ['관리 번호', '이름', '품종', '성별', '체중', '중성화 여부'];
  const { animal } = location.state;
  // animal 은 객체임
  const animalInformation = [
    { manageCode: animal.manageCode },
    { name: animal.name },
    { breed: animal.breed },
    { gender: animal.gender },
    { weight: animal.weight },
    { neuter: animal.neuter },
  ];
  // animalInformation.map(item =>
  //   console.log(Object.keys(item)[0], Object.values(item)[0]),
  // );
  const [isModal, setIsModal] = useState(false);

  const handleModal = () => {
    setIsModal(false);
  };

  const handleDeleteAnimal = () => {
    // navigate 핸들러 함수 최하단으로 내려야함
    axios.delete('http://192.168.31.226:3000/animal', {
      data: {
        shelterId: {},
        animalID: animal.animalId,
      },
    });
    navigate(`/animal`);
  };

  return (
    <>
      <Header />

      <STitle>동물 정보</STitle>
      <ImageCarousel page="AnimalDetail" />
      <SLine>
        <SGrayLineBox>
          <SGrayLine />
        </SGrayLineBox>
        <SDetailInformation>상세 정보</SDetailInformation>
        <SGrayLineBox>
          <SGrayLine />
        </SGrayLineBox>
      </SLine>
      {animalInformation.map((Item, index) => (
        <SInformationBox key={key[index]}>
          <SInformationImg src={key[index]} alt={`${Object.keys(Item)}`} />
          <SInformationText>
            <div>{korKey[index]}</div>
            <div>{Object.values(Item)}</div>
          </SInformationText>
        </SInformationBox>
      ))}

      <SNoteBox>
        <SNoteImg src={note} alt="note.png" />
        <SInformationNote>{animal.note}</SInformationNote>
      </SNoteBox>

      <SButtonBox>
        <Link
          to={`/animal/update/${animal.animalId}`}
          style={{ textDecoration: 'none' }}
        >
          <SModifyButton variant="contained" size="medium">
            수정하기
          </SModifyButton>
        </Link>
        <SDeleteButton
          onClick={() => setIsModal(true)}
          variant="contained"
          size="medium"
        >
          삭제하기
        </SDeleteButton>
      </SButtonBox>
      <Modal
        isOpen={isModal}
        onRequestClose={() => setIsModal(false)}
        style={{
          overlay: {
            display: 'flex',
            justifyContent: 'center',
            alignItem: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.75)',
          },
          content: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            position: 'relative',
            top: '25rem',
            left: 0,
            right: 0,
            bottom: 0,
            width: '50%',
            height: '10%',
            border: '1px solid #ccc',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            padding: '20px',
            boxShadow: '5px 5px 5px 5px gray',
          },
        }}
      >
        <SModalBlock>
          <SModalMessage>삭제하시겠습니까?</SModalMessage>
          <SButtonBlock>
            <SModalDeletebutton onClick={handleDeleteAnimal} type="button">
              삭제
            </SModalDeletebutton>
            <SModalCancelbutton onClick={handleModal} type="button">
              취소
            </SModalCancelbutton>
          </SButtonBlock>
        </SModalBlock>
      </Modal>

      <Nav />
    </>
  );
}

export default AnimalDetail;
