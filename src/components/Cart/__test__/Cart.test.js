import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import mock from '../../../utils/mock-data/mock';
import Cart from '../Cart';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
let component,cartItems;
beforeEach(()=>{
  let initialState = mock;
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  let store;
  store = mockStore(initialState);
  cartItems = mock.cart.items;
   component = render(
    <Provider store={store}>
      <Cart cart={mock.cart} />
    </Provider>
  );
})
describe('Cart component test', () => {
  test('Render cart item with correct title', () => {
    const cartTitle = component.getAllByTestId('cart-item-name');
    expect(cartTitle[0].textContent).toBe(cartItems[0].name);
  });

  test('Render cart item with correct price', () => {
    const cartPrice = component.getAllByTestId('cart-item-price');
    expect(cartPrice[0].textContent).toBe(`₺${cartItems[0].price}`);
  });

  test('Increase item count', () => {

    const increaseBtn = component.getAllByTestId('inc-button')[0];
    fireEvent.click(increaseBtn);
    fireEvent.click(increaseBtn);
    const countInput = component.getAllByTestId('cart-item-value')[0];
    expect(countInput.value).toBe('3');
  });

  test('Decrease item count', () => {
    const increaseBtn = component.getAllByTestId('inc-button')[0];
    const decreaseBtn = component.getAllByTestId('dec-button')[0];
    fireEvent.click(increaseBtn);
    fireEvent.click(increaseBtn);
    fireEvent.click(decreaseBtn);
    const countInput = component.getAllByTestId('cart-item-value')[0];
    expect(countInput.value).toBe('2');
  });

  test('Remove item from cart if count is equal 0',  () => {

    let cartTitle = component.getAllByTestId('cart-item-name')[0];
    const decreaseBtn = component.getAllByTestId('dec-button')[0];
    expect(cartTitle.textContent).toBe(cartItems[0].name);
    fireEvent.click(decreaseBtn);
    jest.useFakeTimers();
    jest.runAllTimers();
    cartTitle = component.getAllByTestId('cart-item-name');
    expect(cartTitle.textContent).not.toBe(cartItems[0].name);
  });
});
