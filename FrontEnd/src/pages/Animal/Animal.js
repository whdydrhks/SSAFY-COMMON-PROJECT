/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Header from '../../components/common/Header';
import Nav from '../../components/common/Nav';
import AnimalCategory from '../../components/Animal/AnimalCategory';

function Animal() {
  return (
    <>
      <Header />
      <STitle>
        <Sh1>관리 동물</Sh1>
        <Link to="/animal/create" style={{ textDecoration: 'none' }}>
          <SCreateButton variant="contained" size="medium">
            동물 등록
          </SCreateButton>
        </Link>
      </STitle>
      <AnimalCategory />
      <Nav />
    </>
  );
}

const Sh1 = styled.h1`
  font-size: 2rem;
  margin-top: 1rem;
  // margin-left: 1rem;
`;

const STitle = styled.div`
  display: flex;
  justify-content: space-between;
  /* margin-top: 5rem; */
  margin-bottom: 2rem;
  margin-left: 1rem;
  margin-right: 1rem;
`;

const SCreateButton = styled(Button)`
  border-radius: 10px;
  margin-top: 1rem;
  /* margin-right: 1rem; */
`;

export default Animal;
