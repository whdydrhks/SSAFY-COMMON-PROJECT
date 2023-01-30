import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from '../../components/common/Header';
import Nav from '../../components/common/Nav';
import AnimalList from '../../components/Animal/AnimalList';

const StyledLink = styled(Link)`
  position: fixed;
  top: 650px;
  left: 700px;
  color: black;
  margin: 0 auto;
  width: 40px;
  height: 40px;
  border: 3px solid;
  border-radius: 50%;
  text-align: center;
  font-size: 32px;
`;

function Animal() {
  return (
    <>
      <Header />
      <h1>관리 동물</h1>
      <AnimalList />
      <StyledLink to="/animal/create" style={{ textDecoration: 'none' }}>
        +
      </StyledLink>
      <Nav />
    </>
  );
}

export default Animal;
