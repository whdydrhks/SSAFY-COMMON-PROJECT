import React, { useState } from 'react';
import { Container, TextField, Typography } from '@mui/material';
import Header from '../../components/common/Header';
import Nav from '../../components/common/Nav';

function CheckPassword() {
  const [password, setPassword] = useState('');
  const handlePassword = () => {
    setPassword(password);
  };
  return (
    <>
      <Header />
      <Container component="main" maxWidth="xs">
        <Typography component="h6" variant="body2">
          비밀번호 확인
        </Typography>
        <TextField
          required
          fullWidth
          id="password"
          name="password"
          autoComplete="password"
          placeholder="비밀번호 확인"
          value={password}
          onChange={handlePassword}
        />
      </Container>
      <Nav />
    </>
  );
}

export default CheckPassword;
