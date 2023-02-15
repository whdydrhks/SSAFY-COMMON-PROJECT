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
import '../../styles/fonts.css';

const SBox = styled(Box)`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 4rem;
  background-color: white;
`;

const SBottomNavigationAction = styled(BottomNavigationAction)`
  font-family: mainFont;
`;

// const SBottomNav = styled(BottomNavigation)`
//   display: flex;
//   justify-content: space-between;
// `;

function Nav() {
  const [value, setValue] = React.useState(0);
  const accessToken = getCookie('accessToken');
  const user = useRecoilValue(userAtom);
  return (
    <SBox>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
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
        {/* 관심동물  or 동물관리 */}
        {!accessToken ? (
          <SBottomNavigationAction
            label="관심동물"
            icon={<PetsIcon />}
            component={Link}
            to="/login"
          />
        ) : null}

        {accessToken && user.role === 'HOST' ? (
          <SBottomNavigationAction
            label="동물관리"
            icon={<PetsIcon />}
            component={Link}
            to="/animal"
          />
        ) : null}
        {accessToken && user.role === 'USER' ? (
          <SBottomNavigationAction
            label="관심동물"
            icon={<PetsIcon />}
            component={Link}
            to="/animal"
          />
        ) : null}

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
      </BottomNavigation>
    </SBox>
  );
}

export default Nav;
