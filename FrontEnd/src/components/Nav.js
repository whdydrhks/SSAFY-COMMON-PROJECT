import React from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import VideocamIcon from '@mui/icons-material/Videocam';
import PetsIcon from '@mui/icons-material/Pets';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';

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
  const [value, setValue] = React.useState(0);
  return (
    <SBox>
      <SBottomNav
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="라이브" icon={<VideocamIcon />} />
        <BottomNavigationAction label="관심동물" icon={<PetsIcon />} />
        <BottomNavigationAction label="예약일정" icon={<CalendarTodayIcon />} />
        <BottomNavigationAction label="사용자" icon={<PersonIcon />} />
      </SBottomNav>
    </SBox>
  );
}

export default Nav;
