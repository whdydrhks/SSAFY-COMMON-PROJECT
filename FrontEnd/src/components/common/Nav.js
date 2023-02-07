import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import VideocamIcon from '@mui/icons-material/Videocam';
import PetsIcon from '@mui/icons-material/Pets';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useRecoilState } from 'recoil';
import API_URL from '../../api/api';
import { getCookie } from '../../pages/Account/cookie';
import { authStateAtom, userAtom } from '../../recoilState';

const SBox = styled(Box)`
  position: fixed;
  background-color: white;
  left: 0;
  right: 0;
  bottom: 0;
  height: 4rem;
`;

const SBottomNav = styled(BottomNavigation)`
  display: flex;
  justify-content: space-between;
`;

function Nav() {
  const [authState, setAuthState] = useRecoilState(authStateAtom);
  const [user, setUser] = useRecoilState(userAtom);

  useEffect(() => {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      const decodedToken = jwtDecode(accessToken);
      const role = decodedToken.userRole;
      const { userId } = decodedToken.userId;
      const email = decodedToken.userEmail;
      axios
        .get(
          `${API_URL}/user/${userId}`,
          {
            headers: {
              Authorization: accessToken,
            },
          },
          { withCredentials: true },
        )
        .then(info => {
          const { name, nickname, phoneNumber, profileImg } =
            info.data.userInfo;
          setUser({
            userId,
            role,
            email,
            name,
            nickname,
            phoneNumber,
            profileImg,
          });
        });
      setAuthState(true);
    }
  }, [authState]);

  return (
    <SBox>
      <SBottomNav showLabels>
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon />}
          component={Link}
          to="/"
        />

        <BottomNavigationAction
          label="라이브"
          icon={<VideocamIcon />}
          component={Link}
          to="/live"
        />

        <BottomNavigationAction
          label="관심동물"
          icon={<PetsIcon />}
          component={Link}
          to="/animal"
        />

        <BottomNavigationAction
          label="예약일정"
          icon={<CalendarTodayIcon />}
          component={Link}
          to="/schedule"
        />
        {!authState ? (
          <BottomNavigationAction
            label="사용자"
            icon={<PersonIcon />}
            component={Link}
            to="/login"
          />
        ) : (
          <BottomNavigationAction
            label="내정보"
            icon={<PersonIcon />}
            component={Link}
            to={`/mypage/${user.userId}`}
          />
        )}
      </SBottomNav>
    </SBox>
  );
}

export default Nav;
