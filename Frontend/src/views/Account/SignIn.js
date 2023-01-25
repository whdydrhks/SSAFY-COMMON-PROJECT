import React from 'react';
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Grid,
  Typography,
  Avatar,
  Box,
  Container,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import styled from 'styled-components';
import Header from '../../components/common/Header';
import Nav from '../../components/common/Nav';
import GoogleLogin from '../../assets/login/btn_google_signin_light_normal_web@2x.png';
import NaverLogin from '../../assets/login/btnG_official.png';
import KakaoLogin from '../../assets/login/kakao_login_large_narrow.png';

const SSocialLoginBtn = styled.img`
  width: 250px;
  height: 60px;
`;

const STextField = styled(TextField)`
  width: 90px;
`;

function SignIn() {
  return (
    <>
      <Header />
      <Nav />
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
          <STextField
            margin="normal"
            label="Email Address"
            required
            name="email"
            fullWidth
            autoComplete="email"
            autoFocus
          />
          <STextField
            margin="normal"
            label="Password"
            required
            name="password"
            fullWidth
            type="password"
            autoComplete="current-password"
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
          >
            로그인
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="d">비밀번호 찾기</Link>
            </Grid>
            <Grid item>
              <Link href="d">회원가입</Link>
            </Grid>
          </Grid>
        </Box>
        <SSocialLoginBtn src={GoogleLogin} />
        <SSocialLoginBtn src={NaverLogin} />
        <SSocialLoginBtn src={KakaoLogin} />
      </Container>
    </>
  );
}

export default SignIn;
