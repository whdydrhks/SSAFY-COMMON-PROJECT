/* eslint-disable no-unused-vars */
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
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useRecoilState } from 'recoil';
import jwtDecode from 'jwt-decode';
import Header from '../../components/common/Header';
import Nav from '../../components/common/Nav';
import API_URL from '../../api/api';
import { userAtom } from '../../recoilState';
import { getCookie } from './cookie';
// import '../../styles/cafe24.css';

const SButton = styled.button`
  background-color: red;
`;

const SFindLink = styled(Link)`
  text-decoration: none;
`;

const SignupLink = styled(Link)`
  font-size: 'cafe24';
  border-radius: 10px;
  text-decoration: none;
  /* box-shadow: 2px 2px 2px 2px gray; */
`;

const SFormControlLabel = styled.div`
  /* position: relative; */
  float: right;
  /* margin-top: 1rem; */
  margin-right: 15rem;
`;

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useRecoilState(userAtom);
  const onChangeUserEmail = event => {
    setEmail(event.target.value);
  };
  const onChangeUserPassword = event => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    axios
      .post(
        `${API_URL}/auth/login`,
        {
          email,
          password,
        },
        { validateStatus: false },
      )
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          document.cookie = `accessToken=${res.headers.authorization}`;
          const accessToken = getCookie('accessToken');
          const decodedToken = jwtDecode(accessToken);
          const role = decodedToken.userRole;
          const id = decodedToken.userId;
          axios
            .get(
              `${API_URL}/user/${id}`,
              {
                headers: {
                  Authorization: accessToken,
                },
              },
              { withCredentials: true },
            )
            .then(info => {
              console.log(info);
              const { name, nickname, phoneNumber, profileImage, shelterId } =
                info.data.data;
              setUser({
                userId: id,
                role,
                email,
                name,
                nickname,
                phoneNumber,
                profileImage,
                shelterId,
              });
            });
          navigate('/');
        } else {
          alert('아이디와 비밀번호를 확인해주세요.');
        }
      });
  };

  // Enter 클릭 시 적용
  // const handleOnKeyPress = e => {
  //   if (e.key === 'Enter') {
  //     handleLogin();
  //   }
  // };

  // console.log(user);
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
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}> */}

          <LockOutlinedIcon />
          <br />
          <Typography component="h1" variant="h5">
            로그인
          </Typography>
          {/* <form onSubmit={handleOnKeyPress}> */}
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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="로그인 상태 유지"
              />
            </Grid>
          </Grid>
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
              <SFindLink to="/findpassword">
                <Button>비밀번호 찾기</Button>
              </SFindLink>
            </Grid>
            <Grid item>
              <SignupLink to="/signup">
                <Button>회원가입</Button>
              </SignupLink>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Nav />
    </>
  );
}

export default Login;
