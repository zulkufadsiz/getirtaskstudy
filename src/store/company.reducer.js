import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setBrands } from './filters.reducer';
import { setProducts } from './products.reducer';

export const setCompanies = createAsyncThunk(
  'company/setCompanies',
  async ({ response }, { dispatch }) => {
    const data = response.data.map((item) => {
      return {
        ...item,
        value: item.slug,
        label: item.name
      };
    });
    dispatch(getCompaniesReducer(data));
    return response.data;
  }
);

export const searchCompany = createAsyncThunk(
  'company/searchText',
  async ({ searchText }, { dispatch }) => {
    dispatch(search(searchText));
    return searchText;
  }
);

export const onCompanyChecked = createAsyncThunk(
  'company/companyChecked',
  async ({ name, checked }, { dispatch, getState }) => {
    const { _page } = getState().filter;
    const { products, totalPage } = getState().product;
    const companies = getState().company.companies.map((company) =>
      company.name === name
        ? {
            ...company,
            isChecked: checked
          }
        : company
    );

    dispatch(getCompaniesReducer(companies));
    const brands = companies.filter((el) => el.isChecked).map((el) => el.slug);
    dispatch(setBrands({ brands }));
    dispatch(
      setProducts({
        response: { data: [...products], headers: { ['x-total-count']: totalPage * 16 }, _page }
      })
    );
    return companies;
  }
);

const initialState = {
  companies: [],
  searchText: ''
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    getCompaniesReducer: (state, action) => {
      state.companies = action.payload;
    },
    search: (state, action) => {
      state.searchText = action.payload;
    },
    resetStateReducer: () => initialState
  },
  extraReducers: {}
});

export const { search, companyChecked, getCompaniesReducer, resetStateReducer } =
  companySlice.actions;

export default companySlice.reducer;
