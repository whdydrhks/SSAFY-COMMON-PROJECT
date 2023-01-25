import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from '../../components/common/Header';
import Nav from '../../components/common/Nav';

const StyledLink = styled(Link)`
  position: fixed;
  top: 650px;
  left: 1400px;
  color: black;
  margin: 0 auto;
  width: 40px;
  height: 40px;
  border: 3px solid;
  border-radius: 50%;
  text-align: center;
  font-size: 32px;
`;

function Adoption() {
  return (
    <>
      <Header />
      <Nav />
      <div>여기는 입양</div>

      <StyledLink to="/adoption/create" style={{ textDecoration: 'none' }}>
        +
      </StyledLink>
    </>
  );
}

export default Adoption;
