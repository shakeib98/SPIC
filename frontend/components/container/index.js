import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Snackbar from '../snackbar';


export default function SimpleContainer(props) {
    // console.log("container",props)
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md">
        <Box>
            {props.children && props.children}
        </Box>
      </Container>
      <Snackbar {...props} />
    </React.Fragment>
  );
}