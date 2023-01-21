import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SHeaderForm = styled.div``;
const SHeaderSignForm = styled.div`
  display: flex;
  justify-content: right;
  position: relative;
  top: 24px;
  right: 24px;
`;
const SHeaderApp = styled.div`
  font-size: 40px;
  padding: 32px;
  color: white;
  a {
    text-decoration: none;
    color: white;
  }
`;
const SHeaderSignElement = styled.div`
  padding: 8px;
  a {
    text-decoration: none;
    color: grey;
  }
`;

function HomeHeader() {
  return (
    <SHeaderForm>
      <SHeaderSignForm>
        <SHeaderSignElement>
          <Link to="/signIn">로그인</Link>
        </SHeaderSignElement>
        <SHeaderSignElement>
          <Link to="/signUp">회원가입</Link>
        </SHeaderSignElement>
      </SHeaderSignForm>
      <SHeaderApp>
        <Link to="/home">반가워</Link>
      </SHeaderApp>
    </SHeaderForm>
  );
}

export default HomeHeader;
