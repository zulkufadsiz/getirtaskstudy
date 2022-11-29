import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const setSorting = createAsyncThunk(
  'filter/setSorting',
  async ({ _sort, _order }, { dispatch }) => {
    dispatch(setSortingReducer({ _sort, _order }));
    return { _sort, _order };
  }
);

export const setBrands = createAsyncThunk('filter/setBrands', async ({ brands }, { dispatch }) => {
  dispatch(setBrandsReducer(brands));
  return brands;
});

export const setTags = createAsyncThunk('filter/setTags', async ({ products }, { dispatch }) => {
  const tags = [];
  products.forEach((el) => {
    el.tags.forEach((val) => {
      const index = tags.findIndex((e) => e.name === val);
      if (index === -1) {
        tags.push({ name: val, label: val });
      }
    });
  });
  dispatch(setTagsReducer(tags));
  return tags;
});

export const getFilteredProducts = createAsyncThunk(
  'filter/setProducts',
  async ({ products }, { dispatch }) => {
    dispatch(setTags({ products }));
    dispatch(setProductsReducer(products));
    return products;
  }
);

export const searchTag = createAsyncThunk(
  'filter/searchText',
  async ({ searchText }, { dispatch }) => {
    dispatch(search(searchText));
    return searchText;
  }
);

export const onTagChecked = createAsyncThunk(
  'filter/tagChecked',
  async ({ name, checked }, { dispatch, getState }) => {
    const tags = getState().filter.tags.map((tag) =>
      tag.name === name
        ? {
            ...tag,
            isChecked: checked
          }
        : tag
    );
    dispatch(setTagsReducer(tags));
    const filteredTags = tags.filter((el) => el.isChecked).map((el) => el.name);
    dispatch(setFilteredTags(filteredTags));

    return tags;
  }
);

const initialState = {
  _sort: 'price',
  _order: 'asc',
  brands: [],
  products: [],
  tags: [],
  searchText: '',
  filteredTags: []
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSortingReducer: (state, action) => {
      const { _order, _sort } = action.payload;
      state._sort = _sort;
      state._order = _order;
    },
    setBrandsReducer: (state, action) => {
      state.brands = action.payload;
    },
    setProductsReducer: (state, action) => {
      state.products = action.payload;
    },
    setTagsReducer: (state, action) => {
      state.tags = action.payload;
    },
    search: (state, action) => {
      state.searchText = action.payload;
    },
    setFilteredTags: (state, action) => {
      state.filteredTags = action.payload;
    },
    resetStateReducer: () => initialState
  },
  extraReducers: {}
});

export const {
  setSortingReducer,
  setBrandsReducer,
  setProductsReducer,
  setTagsReducer,
  setFilteredTags,
  search,
  resetStateReducer
} = filtersSlice.actions;

export default filtersSlice.reducer;
