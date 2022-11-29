import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const calculatePrice = (arr) => {
  return arr.reduce((prev, curr) => {
    return (parseFloat(prev) + parseFloat(curr.price) * curr.count).toFixed(2);
  }, 0);
};
export const addToCart = createAsyncThunk(
  'cart/addItemToCart',
  async ({ item }, { dispatch, getState }) => {
    let items = getState().cart.items;
    const index = items.findIndex((el) => el.name === item.name);
    if (index === -1) {
      items = [...items, { ...item, count: 1 }];
      const totalPrice = calculatePrice(items);
      dispatch(setCartReducer({ items, totalPrice }));
    } else {
      const newItems = items.map((el, i) => (i === index ? { ...el, count: el.count + 1 } : el));
      const totalPrice = calculatePrice(newItems);
      dispatch(setCartReducer({ items: newItems, totalPrice }));
    }
    return items;
  }
);

export const updateItemCount = createAsyncThunk(
  'cart/updateItemCount',
  async ({ item, count }, { dispatch, getState }) => {
    let items = getState().cart.items;
    const index = items.findIndex((el) => el.name === item.name);

    const newItems =
      count === 0
        ? items.filter((el, i) => i !== index)
        : items.map((el, i) =>
            i === index
              ? {
                  ...el,
                  count
                }
              : el
          );
    const totalPrice = calculatePrice(newItems);
    dispatch(setCartReducer({ items: newItems, totalPrice }));
    return newItems;
  }
);

const initialState = {
  items: [],
  totalPrice: 0.0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartReducer: (state, action) => {
      const { items, totalPrice } = action.payload;
      state.items = items;
      state.totalPrice = totalPrice;
    },
    resetStateReducer: () => initialState
  },
  extraReducers: {}
});

export const { setCartReducer, resetStateReducer } = cartSlice.actions;

export default cartSlice.reducer;
