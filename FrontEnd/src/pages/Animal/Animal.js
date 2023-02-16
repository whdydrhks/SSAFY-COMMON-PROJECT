/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import { useRecoilValue } from 'recoil';
import Header from '../../components/common/Header';
import Nav from '../../components/common/Nav';
import AnimalCategory from '../../components/Animal/AnimalCategory';
import { userAtom } from '../../recoilState';
import LikeAnimal from './LikeAnimal';
import '../../styles/fonts.css';

const Sh1 = styled.h1`
  font-size: 2rem;
  margin-top: 1rem;
  font-family: mainFont;
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
  border-radius: 100%;
  width: 100%;
  margin-top: 0.7rem;
  /* margin-right: 1rem; */
`;

function Animal() {
  const user = useRecoilValue(userAtom);

  return (
    <>
      <Header />
      {user.role === 'HOST' ? (
        <>
          <STitle>
            <Sh1>관리목록</Sh1>
            <Link to="/animal/create" style={{ textDecorSation: 'none' }}>
              <SCreateButton size="small">
                <Icon
                  color="secondary"
                  sx={{ fontSize: 40, alignContent: 'center' }}
                >
                  add_circle
                </Icon>
              </SCreateButton>
            </Link>
          </STitle>
          <AnimalCategory />
        </>
      ) : (
        <LikeAnimal />
      )}

      <Nav />
    </>
  );
}

export default Animal;
