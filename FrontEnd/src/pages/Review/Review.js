import React, { Suspense } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import Header from '../../components/common/Header';
import Nav from '../../components/common/Nav';
// import ReviewList from '../../components/Review/ReviewList';
import ReviewCategory from '../../components/Review/ReviewCategory';

const Sh1 = styled.h1`
  font-size: 2rem;
  margin-top: 1rem;
  font-family: mainFont;
  /* margin-left: 1rem; */
`;

const STitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  margin-left: 1rem;
  margin-right: 1rem;
`;

const SCreateButton = styled(Button)`
  border-radius: 100%;
  width: 100%;
  margin-top: 0.7rem;
  /* margin-right: 1rem; */
`;
function Review() {
  return (
    <>
      <Header />
      <STitle>
        <Sh1>입양 후기</Sh1>
        {/* <Link to="/review/create" style={{ textDecoration: 'none' }}> */}
        <Link to="/review/create" style={{ textDecoration: 'none' }}>
          <SCreateButton size="small">
            <Icon
              color="secondary"
              sx={{ fontSize: 30, alignContent: 'center' }}
            >
              add_circle
            </Icon>
          </SCreateButton>
        </Link>
      </STitle>
      <Suspense fallback={<div>Loading...</div>}>
        <ReviewCategory />
      </Suspense>
      <Nav />
    </>
  );
}

export default Review;
