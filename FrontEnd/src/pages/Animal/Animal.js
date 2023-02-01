/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import '../../styles/cafe24.css';
import Header from '../../components/common/Header';
import Nav from '../../components/common/Nav';
import AnimalCategory from '../../components/Animal/AnimalCategory';

const Sh1 = styled.h1`
  font-size: 2rem;
  font-family: 'cafe24';
  margin-left: 1rem;
`;

const SMain = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: 'cafe24';
  margin-bottom: 2rem;
`;

const SCreateButton = styled(Button)`
  font-family: 'cafe24';
  border-radius: 10px;
  margin-right: 1rem;
`;

function Animal() {
  return (
    <>
      <Header />
      <SMain>
        <Sh1>관리 동물</Sh1>
        <Link to="/animal/create" style={{ textDecoration: 'none' }}>
          <SCreateButton variant="contained" size="medium">
            동물 등록
          </SCreateButton>
        </Link>
      </SMain>
      <AnimalCategory />
      {/* <AnimalList /> */}
      <Nav />
    </>
  );
}
export default Animal;
