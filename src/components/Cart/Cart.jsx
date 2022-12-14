import React from 'react';
import { ClickAwayListener, Divider, MenuItem, MenuList, Paper, Typography } from '@mui/material';
import IncDecInput from '../IncreaseDecreaseInput/IncDecInput';
import { WorkOutline } from '@mui/icons-material';
import PropTypes from 'prop-types';
import './Cart.css';
import { updateItemCount } from '../../store/cart.reducer';
import { useDispatch } from 'react-redux';

const Cart = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const setValue = (count, item) => {
    dispatch(updateItemCount({ item, count }));
  };
  return (
    <Paper ref={ref} className="cart-paper">
      <div className="cart-container">
        <ClickAwayListener
          onClickAway={(e) => {
            props.handleClose(e);
          }}>
          <MenuList
            autoFocusItem={props.open}
            id="composition-menu"
            aria-labelledby="composition-button"
            onKeyDown={props.handleListKeyDown}>
            {props.cart.items.length > 0 ? (
              props.cart.items.map((item, index) => [
                <MenuItem key={index}>
                  <div className="cart-item">
                    <div>
                      <Typography data-testid="cart-item-name" className="text-title">
                        {item.name}
                      </Typography>
                      <Typography data-testid="cart-item-price" className="text-title text-blue">
                        ₺{item.price}
                      </Typography>
                    </div>
                    <IncDecInput value={item.count} setValue={(count) => setValue(count, item)} />
                  </div>
                </MenuItem>,
                <Divider key={index * 10} />
              ])
            ) : (
              <MenuItem>
                <div className="cart-empty">
                  <WorkOutline className="text-blue text-36" />
                </div>
              </MenuItem>
            )}
            <MenuItem>
              <div className="cart-total">
                <Typography className="text-title text-blue bordered-text">
                  ₺{props.cart?.totalPrice}
                </Typography>
              </div>
            </MenuItem>
          </MenuList>
        </ClickAwayListener>
      </div>
    </Paper>
  );
});
Cart.displayName = 'Cart';
export default Cart;
Cart.propTypes = {
  cart: PropTypes.object,
  handleListKeyDown: PropTypes.func,
  handleClose: PropTypes.func,
  open: PropTypes.bool
};
