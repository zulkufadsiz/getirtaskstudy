import React from 'react';
import { Box, Container, Link, Button } from '@mui/material';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  row: {
    display: 'flex !important',
    flexDirection: 'row',
    backgroundColor: '#E5E5E5',
    justifyContent: 'center',
    padding: ' 48px 16px 16px'
  },
  rowItem: {
    padding: '0 4px'
  }
});

function Footer() {
  const classes = useStyles();
  return (
    <Box>
      <Container className={classes.row} maxWidth="xl">
        <Box className={classes.rowItem} borderBottom={5}>
          <Link data-testid="corporation" className="btn-link" component={Button}>
            @2019 Market
          </Link>
        </Box>
        <Box className={classes.rowItem} borderBottom={5}>
          <Link data-testid="footer-privacy" className="btn-link" component={Button}>
            Privacy Policy
          </Link>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
