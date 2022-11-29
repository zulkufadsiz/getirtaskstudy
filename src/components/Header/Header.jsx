import React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Popper,
  Grow
} from '@material-ui/core';
import MenuIcon from '@mui/icons-material/Menu';
import { Work } from '@mui/icons-material';
import './Header.css';
import { useSelector } from 'react-redux';
import Cart from '../Cart/Cart';

function Header() {
  const cart = useSelector((state) => state.cart);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };
  const renderMenus = (TransitionProps, placement) => {
    return (
      <Grow
        {...TransitionProps}
        style={{
          transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom'
        }}>
        <Cart
          open={open}
          cart={cart}
          handleClose={handleClose}
          handleListKeyDown={handleListKeyDown}
        />
      </Grow>
    );
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="toolbar">
          <div className="mobile-menu">
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          </div>
          <Typography data-testid="header-title" variant="h4" component="div" sx={{ flexGrow: 2 }}>
            Market
          </Typography>
          <Button
            className="cart-button"
            startIcon={<Work />}
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? 'composition-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}>
            ₺ {cart.totalPrice}
          </Button>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal>
            {({ TransitionProps, placement }) => renderMenus(TransitionProps, placement)}
          </Popper>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
