import React, { useState } from 'react';
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
  Avatar,
  Box,
  Container,
} from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Header from '../../components/common/Header';
import Nav from '../../components/common/Nav';
import API_URL from '../../api/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onChangeUserEmail = event => {
    setEmail(event.target.value);
  };
  const onChangeUserPassword = event => {
    setPassword(event.target.value);
  };
  const handleLogin = () => {
    console.log(email);
    console.log(password);
    axios
      .post(`${API_URL}/user/login`, {
        email,
        password,
      })
      .then(res => {
        if (res === 'fail') {
          alert('로그인 실패');
        } else {
          alert('로그인 성공');
        }
      });
  };

  return (
    <>
      <Header />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <TextField
            margin="normal"
            label="이메일"
            required
            name="email"
            fullWidth
            autoComplete="email"
            autoFocus
            value={email}
            onChange={onChangeUserEmail}
          />
          <TextField
            margin="normal"
            label="비밀번호"
            required
            name="password"
            fullWidth
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={onChangeUserPassword}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember Me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleLogin}
          >
            로그인
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/findpassword">비밀번호 찾기</Link>
            </Grid>
            <Grid item>
              <Link to="/signup">회원가입</Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Nav />
    </>
  );
}

export default Login;
