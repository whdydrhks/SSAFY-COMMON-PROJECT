import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../../api/api';
import Header from '../../components/common/Header';
import Nav from '../../components/common/Nav';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [chkPassword, setChkPassword] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [chkPasswordError, setChkPasswordError] = useState(false);
  // const [nicknameError, setNicknameError] = useState(false);

  const handleSignUp = () => {
    axios
      .post(`${API_URL}/user`, {
        email,
        password,
        name,
        nickname,
        phoneNumber,
      })
      .then(res => {
        console.log(res);
        if (res.data.msg === 'success') {
          if (!emailError) {
            alert('이메일 형식이 잘못되었습니다.');
            return;
          }
          if (!passwordError) {
            alert('비밀번호 형식이 잘못되었습니다.');
            return;
          }
          if (!chkPasswordError) {
            alert('비밀번호가 같지 않습니다.');
            return;
          }
          window.location.href = '/login';
        } else {
          alert('회원가입실패');
        }
      });
  };

  const checkEmail = () => {
    const regExEmail =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    setEmailError(regExEmail.test(email));
  };

  const checkPassword = () => {
    const regExPassword =
      /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    setPasswordError(regExPassword.test(password));
  };

  const checkDuplicatePassword = () => {
    if (password === chkPassword) {
      setChkPasswordError(true);
    }
  };

  const handleEmail = event => {
    setEmail(event.target.value);
  };

  const handlePassword = event => {
    setPassword(event.target.value);
  };

  const handleChkPassword = event => {
    setChkPassword(event.target.value);
  };

  const handleNickname = event => {
    setNickname(event.target.value);
  };

  const handleName = event => {
    setName(event.target.value);
  };

  const handlePhoneNumber = event => {
    setPhoneNumber(event.target.value);
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
            Sign up
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography component="h6" variant="body2">
                이메일
              </Typography>
              <TextField
                required
                fullWidth
                id="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={handleEmail}
                onBlur={checkEmail}
              />
              <Button type="submit">인증하기</Button>
            </Grid>
            <Grid item xs={12}>
              <Typography component="h6" variant="body2">
                비밀번호
              </Typography>
              <TextField
                required
                fullWidth
                name="password"
                type="password"
                id="password"
                autoComplete="new-password"
                placeholder="숫자+영문자+특수문자 8자리 이상"
                value={password}
                onChange={handlePassword}
                onBlur={checkPassword}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography component="h6" variant="body2">
                비밀번호 확인
              </Typography>
              <TextField
                required
                fullWidth
                name="chkPassword"
                type="password"
                id="chkPassword"
                autoComplete="new-password"
                placeholder="비밀번호 확인"
                value={chkPassword}
                onChange={handleChkPassword}
                onBlur={checkDuplicatePassword}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography component="h6" variant="body2">
                이름
              </Typography>
              <TextField
                required
                fullWidth
                id="name"
                name="name"
                autoComplete="name"
                value={name}
                onChange={handleName}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography component="h6" variant="body2">
                닉네임
              </Typography>
              <TextField
                required
                fullWidth
                id="nickname"
                name="nickname"
                autoComplete="nickname"
                value={nickname}
                onChange={handleNickname}
              />
              <Button type="submit">중복확인</Button>
            </Grid>
            <Grid item xs={12}>
              <Typography component="h6" variant="body2">
                핸드폰 번호
              </Typography>
              <TextField
                required
                fullWidth
                id="phoneNumber"
                name="phoneNumber"
                autoComplete="phoneNumber"
                placeholder="- 없이 입력해주세요"
                value={phoneNumber}
                onChange={handlePhoneNumber}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="이용 약관에 동의합니다."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                로그인
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Nav />
    </>
  );
}

export default SignUp;
