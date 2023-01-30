import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import styled from 'styled-components';

const SAppBar = styled(AppBar)`
  position: fixed;
  background-color: grey;
`;

function Header() {
  return (
    <Box>
      <SAppBar>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            반가워
          </Typography>
          <Button color="inherit">Alarm</Button>
        </Toolbar>
      </SAppBar>
    </Box>
  );
}

export default Header;
