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
import Header from '../../components/Header';
import Nav from '../../components/Nav';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [chkPassword, setChkPassword] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  // const [emailError, setEmailError] = useState(false);
  // const [passwordError, setPasswordError] = useState(false);
  // const [chkPasswordError, setChkPasswordError] = useState(false);
  // const [nicknameError, setNicknameError] = useState(false);
  // const [phoneNumberError, setPhoneNumberError] = useState(false);

  const checkEmail = () => {
    const regExEmail =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    console.log('이메일 유효성 검사 ::', regExEmail.test(email));
  };

  const checkPassword = () => {
    const regExPassword =
      /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    console.log('비밀번호 유효성 검사 :: ', regExPassword.test(password));
  };

  const checkDuplicatePassword = () => {
    if (password === chkPassword) {
      console.log('비밀번호 같다');
      return true;
    }
    console.log('비밀번호 다르다');
    return false;
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
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/signIn" variant="body2">
                Already have an account? Sign in
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
