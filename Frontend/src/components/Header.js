import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SHeaderForm = styled.div`
  display: flex;
  justify-content: space-between;
`;
const SHeaderAppName = styled.div``;
const SHeaderSignForm = styled.div`
  display: flex;
`;
const SHeaderSignElement = styled.div``;
function HomeHeader() {
  return (
    <SHeaderForm>
      <SHeaderAppName>
        <Link to="/home">반가워</Link>
      </SHeaderAppName>
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
