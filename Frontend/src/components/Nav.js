import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin-top: 24px;
`;
const SNavApp = styled.div`
  a {
    margin-left: 40px;
    padding: 0 32px;
    font-size: 40px;
    text-decoration: none;
    color: black;
  }
`;
const SNavForm = styled.div`
  display: flex;
`;
const SNavElement = styled.div`
  a {
    margin-right: 40px;
    padding: 0 24px;
    text-decoration: none;
    color: black;
    font-size: 24px;
  }
`;

function Nav() {
  return (
    <SNav>
      <SNavApp>
        <Link to="/home">반가워</Link>
      </SNavApp>
      <SNavForm>
        <SNavElement>
          <Link to="/about">소개</Link>
        </SNavElement>
        <SNavElement>
          <Link to="/news">소식지</Link>
        </SNavElement>
        <SNavElement>
          <Link to="/live">Live</Link>
        </SNavElement>
        <SNavElement>
          <Link to="/adoption">입양</Link>
        </SNavElement>
        <SNavElement>
          <Link to="/community">게시판</Link>
        </SNavElement>
        <SNavElement>
          <Link to="/donation">후원</Link>
        </SNavElement>
      </SNavForm>
    </SNav>
  );
}

export default Nav;
