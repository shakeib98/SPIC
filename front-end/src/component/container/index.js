import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import AppBar from '../appbar';

export default function SimpleContainer(props) {
    console.log("container",props)
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md">
        <Box>
            {props.children && props.children}
        </Box>
      </Container>
    </React.Fragment>
  );
}