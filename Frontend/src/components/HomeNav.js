import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SNavElement = styled.div``;

function HomeNav() {
  return (
    <>
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
    </>
  );
}

export default HomeNav;
