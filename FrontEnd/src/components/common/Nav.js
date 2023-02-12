import React from 'react';
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
import { useRecoilValue } from 'recoil';
import { userAtom } from '../../recoilState';
import { getCookie } from '../../pages/Account/cookie';

const SBox = styled(Box)`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 4rem;
`;

const SBottomNavigationAction = styled(BottomNavigationAction)`
  font-family: 'cafe24';
`;

const SBottomNav = styled(BottomNavigation)`
  display: flex;
  justify-content: space-between;
`;

function Nav() {
  const accessToken = getCookie('accessToken');
  const user = useRecoilValue(userAtom);
  return (
    <SBox>
      <SBottomNav showLabels>
        <SBottomNavigationAction
          label="Home"
          icon={<HomeIcon />}
          component={Link}
          to="/"
        />

        <SBottomNavigationAction
          label="라이브"
          icon={<VideocamIcon />}
          component={Link}
          to="/live"
        />

        <SBottomNavigationAction
          label="관심동물"
          icon={<PetsIcon />}
          component={Link}
          to="/animal"
        />

        <SBottomNavigationAction
          label="예약일정"
          icon={<CalendarTodayIcon />}
          component={Link}
          to="/schedule"
        />
        {!accessToken ? (
          <SBottomNavigationAction
            label="사용자"
            icon={<PersonIcon />}
            component={Link}
            to="/login"
          />
        ) : (
          <SBottomNavigationAction
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
