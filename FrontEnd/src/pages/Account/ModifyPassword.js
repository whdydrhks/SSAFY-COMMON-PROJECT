/* eslint-disable no-lonely-if */
/* eslint-disable no-alert */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Typography, Button } from '@mui/material';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import Header from '../../components/common/Header';
import Nav from '../../components/common/Nav';
import API_URL from '../../api/api';
import { userAtom } from '../../recoilState';
import { getCookie } from './cookie';

function ModifyPassword() {
  const accessToken = getCookie('accessToken');
  const navigate = useNavigate();
  const user = useRecoilValue(userAtom);
  const [curPassword, setCurPassword] = useState('');
  const [password, setPassword] = useState('');
  const [chkPassword, setChkPassword] = useState('');

  const handleCurPassword = event => {
    setCurPassword(event.target.value);
  };
  const handlePassword = event => {
    setPassword(event.target.value);
  };
  const handleChkPassword = event => {
    setChkPassword(event.target.value);
  };
  const handleModifyPassword = () => {
    if (password !== chkPassword) {
      alert('비민번호가 일치하지 않습니다.');
    } else {
      if (window.confirm('비밀번호를 변경하시겠습니까?')) {
        axios.put(
          `${API_URL}/user/${user.userId}/password`,
          { curPassword, newPassword: password },
          {
            headers: { Authorization: accessToken },
          },
        );
        navigate(`/mypage/${user.userId}`);
      }
    }
  };

  console.log('cur :', typeof curPassword);
  console.log('new', typeof password);
  return (
    <>
      <Header />
      <Container component="main" maxWidth="xs">
        <Typography component="h6" variant="body2">
          현재 비밀번호 입력
        </Typography>
        <TextField
          required
          fullWidth
          id="password"
          name="password"
          autoComplete="password"
          placeholder="숫자+영문자+특수문자 8자리 이상"
          value={curPassword}
          onChange={handleCurPassword}
        />
        <Typography component="h6" variant="body2">
          새로운 비밀번호 입력
        </Typography>
        <TextField
          required
          fullWidth
          id="password"
          name="password"
          autoComplete="password"
          placeholder="숫자+영문자+특수문자 8자리 이상"
          value={password}
          onChange={handlePassword}
        />
        <Typography component="h6" variant="body2">
          새로운 비밀번호 재입력
        </Typography>
        <TextField
          required
          fullWidth
          id="password"
          name="password"
          autoComplete="password"
          placeholder="다시 입력해주세요."
          value={chkPassword}
          onChange={handleChkPassword}
        />
      </Container>
      <Button onClick={handleModifyPassword} variant="body2">
        수정
      </Button>
      <Nav />
    </>
  );
}

export default ModifyPassword;
