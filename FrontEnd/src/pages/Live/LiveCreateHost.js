/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import { StopTwoTone } from '@mui/icons-material';
import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/common/Header';
import Nav from '../../components/common/Nav';

const SHeader = styled.div`
  font-size: 2rem;
  text-align: center;
  margin-top: 2rem;
`;
const SFile = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 2rem;
`;
const SFileInput = styled.input`
  display: none;
`;
const SFileUpload = styled.div`
  width: 150px;
  height: 30px;
  background: #fff;
  border: 1px solid rgb(77, 77, 77);
  border-radius: 10px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const STitle = styled.div`
  margin-left: 2rem;
`;
const STitleHeader = styled.div``;
const STitleInput = styled.input``;
const SCategory = styled.div`
  margin-left: 2rem;
`;
const SCategoryHeader = styled.div``;
const SCategoryInput = styled.input``;
const SButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SCreateButton = styled.button``;

function LiveCreateHost() {
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCagegory] = useState('');

  const handleImage = event => {
    console.log(event.target);
    setImage(event.target);
  };
  const handleTitle = event => {
    console.log(event.target.value);
    setTitle(event.target.value);
  };
  const handleCategory = event => {
    console.log(event.target.id);
    setCagegory(event.target.value);
  };

  const handleCreateLive = () => {};

  return (
    <>
      <Header />
      <SHeader>Live 생성</SHeader>
      <SFile>
        <label htmlFor="file">
          <SFileUpload
            className="btn-upload"
            value={image}
            onChange={handleImage}
          >
            썸네일 업로드
          </SFileUpload>
        </label>
        <SFileInput type="file" name="file" id="file" />
      </SFile>
      <STitle>
        <STitleHeader>방 이름</STitleHeader>
        <STitleInput type="text" value={title} onChange={handleTitle} />
      </STitle>
      <SCategory>
        <SCategoryHeader>카테고리 선택</SCategoryHeader>
        <input
          type="radio"
          id="dog"
          name="category"
          value={category}
          onChange={handleCategory}
        />
        <label htmlFor="강아지">강아지</label>
        <input
          type="radio"
          id="cat"
          name="category"
          value={category}
          onChange={handleCategory}
        />
        <label htmlFor="고양이">고양이</label>
      </SCategory>
      <SButtonDiv>
        <SCreateButton type="button" onClick={handleCreateLive}>
          생성
        </SCreateButton>
      </SButtonDiv>
      <Nav />
    </>
  );
}

export default LiveCreateHost;
