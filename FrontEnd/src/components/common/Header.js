import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { authStateAtom } from '../../recoilState';
import { removeCookie } from '../../pages/Account/cookie';
import API_URL from '../../api/api';

const SAppBar = styled(AppBar)`
  position: fixed;
  background-color: grey;
  a {
    text-decoration: none;
    color: white;
  }
`;

function Header() {
  const [authState, setAuthState] = useRecoilState(authStateAtom);

  const handleLogout = () => {
    const isLogout = window.confirm('로그아웃 하시겠습니까?');
    if (isLogout) {
      axios.post(`${API_URL}/auth/logout`).then(() => {
        removeCookie('accessToken');
        setAuthState(false);
        window.location.href = '/';
      });
    }
  };

  return (
    <Box>
      <SAppBar>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/">반가워</Link>
          </Typography>
          <Button color="inherit">
            <Link to="/alarm">Alarm</Link>
          </Button>
          {!authState ? null : (
            <Button color="inherit" onClick={handleLogout}>
              로그아웃
            </Button>
          )}
        </Toolbar>
      </SAppBar>
    </Box>
  );
}

export default Header;
