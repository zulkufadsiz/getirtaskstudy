import {render} from '@testing-library/react';
import Header from "../Header";
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mock from "../../../utils/mock-data/mock";
import React from "react";

let component;
beforeEach(()=>{
  let initialState = mock;
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  let store;
  store = mockStore(initialState);
  component = render(
    <Provider store={store}>
      <Header />
    </Provider>
  );
})
describe('Header component tests',()=>{
  test('Check header title',() => {
    const label = component.getByTestId('header-title');
    expect(label.textContent).toBe("Market");
  });
});
