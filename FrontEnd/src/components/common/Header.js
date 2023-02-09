import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import LogoutIcon from '@mui/icons-material/Logout';
import styled from 'styled-components';
import axios from 'axios';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { authStateAtom, userAtom } from '../../recoilState';
import { getCookie, removeCookie } from '../../pages/Account/cookie';
import helloIcon from '../../images/logo/helloIcon.png';
import API_URL from '../../api/api';
import '../../styles/cafe24.css';

const SAppBar = styled(AppBar)`
  position: fixed;
  padding: 4px;
  background-color: rgba(180, 230, 230) !important;
  a {
    font-family: 'cafe24';
    text-decoration: none;
    color: black;
  }
`;
const SHomeLogo = styled.div`
  display: flex;
  align-items: center;
  a {
    display: flex;
    align-items: center;
  }
`;
const SImg = styled.img`
  width: 2rem;
  margin-right: 0.5rem;
`;
const SHello = styled.span`
  font-size: 1.7rem;
`;

const SButton = styled.button`
  background-color: rgba(180, 230, 230) !important;
  font-family: 'cafe24';
  border: none;
  color: black;
  margin-left: 12px;
`;

function Header() {
  const accessToken = getCookie('accessToken');
  const [authState, setAuthState] = useRecoilState(authStateAtom);
  const user = useRecoilValue(userAtom);
  const resetUser = useResetRecoilState(userAtom);
  const navigate = useNavigate();

  const handleLogout = () => {
    const isLogout = window.confirm('로그아웃 하시겠습니까?');
    if (isLogout) {
      axios
        .post(
          `${API_URL}/auth/logout`,
          {},
          {
            headers: {
              Authorization: accessToken,
            },
          },
        )
        .then(() => {
          removeCookie('accessToken');
          resetUser();
          setAuthState(false);
          navigate('/');
        });
    }
  };

  return (
    <Box>
      <SAppBar>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <SHomeLogo>
              <Link to="/">
                <SImg src={helloIcon} alt="hello" />
              </Link>
              <Link to="/">
                <SHello>반가워</SHello>
              </Link>
            </SHomeLogo>
          </Typography>
          <Link to={`/alarm/${user.userId}`}>
            <NotificationsActiveIcon />
          </Link>
          {!authState ? null : (
            <SButton color="inherit" onClick={handleLogout}>
              <LogoutIcon />
            </SButton>
          )}
        </Toolbar>
      </SAppBar>
    </Box>
  );
}

export default Header;
