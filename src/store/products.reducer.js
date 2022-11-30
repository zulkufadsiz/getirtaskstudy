import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFilteredProducts } from './filters.reducer';

export const setProducts = createAsyncThunk(
  'product/setProducts',
  async ({ response, _page }, { dispatch, getState }) => {
    console.log('Response', response);
    const { brands } = getState().filter;

    const totalPage = Math.round(response.headers['x-total-count'] / 16);
    const filteredProducts = response.data.filter((item) => {
      return brands.length > 0 ? brands.includes(item.manufacturer) : item;
    });
    dispatch(getProductsReducer({ data: response.data, totalPage: totalPage, _page }));
    dispatch(getFilteredProducts({ products: filteredProducts }));
    return await response.data;
  }
);
export const setPage = createAsyncThunk('product/setPage', async ({ _page }, { dispatch }) => {
  dispatch(setPageReducer(_page));
  return _page;
});

const initialState = {
  products: [],
  totalPage: 0,
  _page: 1
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getProductsReducer: (state, action) => {
      const { totalPage, data } = action.payload;
      state.products = data;
      state.totalPage = totalPage;
    },
    setPageReducer: (state, action) => {
      state._page = action.payload;
    },
    resetStateReducer: () => initialState
  },
  extraReducers: {}
});

export const { getProductsReducer, setPageReducer, resetStateReducer } = productSlice.actions;

export default productSlice.reducer;
