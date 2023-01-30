import React from 'react';
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
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Header from '../../components/common/Header';
import Nav from '../../components/common/Nav';

function Login() {
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
          />
          <TextField
            margin="normal"
            label="비밀번호"
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
