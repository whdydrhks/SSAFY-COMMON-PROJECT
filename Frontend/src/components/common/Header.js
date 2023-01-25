import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SHeaderForm = styled.div``;
const SHeaderSignForm = styled.div`
  display: flex;
  justify-content: right;
  position: relative;
  margin-top: 16px;
  margin-right: 40px;
`;
const SHeaderSignElement = styled.div`
  padding: 0 32px;
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
    </SHeaderForm>
  );
}

export default HomeHeader;
