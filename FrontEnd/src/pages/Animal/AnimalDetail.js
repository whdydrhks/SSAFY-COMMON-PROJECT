// import { shadows } from '@mui/system';
import React, { useState } from 'react';
import Modal from 'react-modal';
import { Button } from '@mui/material';
import axios from 'axios';
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header';
import Nav from '../../components/common/Nav';
import '../../styles/cafe24.css';

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
  const { animal } = location.state;

  const [isModal, setIsModal] = useState(false);

  const handleModal = () => {
    setIsModal(false);
  };

  const handleDeleteAnimal = () => {
    // navigate 핸들러 함수 최하단으로 내려야함
    navigate(`/animal`);
    axios.delete('http://192.168.31.226:3000/animal', {
      data: {
        shelterId: {},
        animalID: animal.animalId,
      },
    });
  };

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
