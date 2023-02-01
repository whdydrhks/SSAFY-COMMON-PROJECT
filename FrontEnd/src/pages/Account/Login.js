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
import { useSetRecoilState } from 'recoil';
import { decode } from 'jsonwebtoken';
import Header from '../../components/common/Header';
import Nav from '../../components/common/Nav';
import API_URL from '../../api/api';
import { authStateAtom, userAtom } from '../../recoilState';
import { getCookie } from './cookie';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setAuthState = useSetRecoilState(authStateAtom);
  const setUser = useSetRecoilState(userAtom);
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
      .post(
        `${API_URL}/user/login`,
        {
          email,
          password,
        },
        { withCredentials: true },
      )
      .then(res => {
        console.log(res);
        if (res.data.msg === 'success') {
          setAuthState(true);
          const accessToken = getCookie('accessToken');
          const decodedToken = decode(accessToken);
          const { role } = decodedToken.role;
          const { nickname } = decodedToken.nickname;
          axios.get(`${API_URL}/${nickname}`).then(info => {
            const { name, phoneNumber, profileImg } = info.data.name;
            setUser({
              role,
              email,
              name,
              nickname,
              phoneNumber,
              profileImg,
            });
          });
          // jwt 디코딩 후 닉네임, role 저장
          // 유저 닉네임으로 axios하여 유저의 모든 정보 갖고온 후 아톰에 저장
          // axios.get(`${API_URL}/`);
          // home으로 이동시키기
        } else {
          alert('아이디와 비밀번호를 확인해주세요.');
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
