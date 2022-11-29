import React, { useEffect } from 'react';
import FilterItem from '../FilterItem/FilterItem';
import { useSelector, useDispatch } from 'react-redux';
import { onTagChecked, searchTag, setSorting } from '../../store/filters.reducer';
import { setCompanies, searchCompany, onCompanyChecked } from '../../store/company.reducer';
import './SideFilters.css';
import { COMPANY } from '../../utils/config';
import axiosApi from '../../utils/axiosApi';

function SideFilters() {
  const dispatch = useDispatch();
  const { _sort, _order, searchText, tags } = useSelector((state) => state.filter);
  const company = useSelector((state) => state.company);
  const applySorting = (sortingType, e) => {
    let _sort = sortingType.split('-').shift(),
      _order = sortingType.split('-').pop();
    dispatch(setSorting({ _sort, _order }));
    return e;
  };
  const searchBrands = (searchText) => {
    dispatch(searchCompany({ searchText }));
  };
  const onBrandChange = (e) => {
    const { name, checked } = e.target;
    dispatch(onCompanyChecked({ name, checked }));
  };

  const searchTags = (searchText) => {
    dispatch(searchTag({ searchText }));
  };
  const onTagChange = (e) => {
    const { name, checked } = e.target;
    dispatch(onTagChecked({ name, checked }));
  };

  useEffect(() => {
    getCompanies().then((response) => {
      dispatch(setCompanies({ response }));
    });
  }, []);
  const getCompanies = async () => {
    const response = await axiosApi.get(COMPANY);
    return response;
  };
  const sortingValues = [
    {
      id: 1,
      value: 'price-asc',
      label: 'Price low to high'
    },
    {
      id: 2,
      value: 'price-desc',
      label: 'Price high to low'
    },
    {
      id: 3,
      value: 'added-asc',
      label: 'New to Old'
    },
    {
      id: 4,
      value: 'added-desc',
      label: 'Old to New'
    }
  ];
  return (
    <div className="side-filters">
      <FilterItem
        value={`${_sort}-${_order}`}
        name="Sorting"
        radio={sortingValues}
        setFilter={applySorting}
      />
      <FilterItem
        name="Brands"
        search={searchBrands}
        onChange={onBrandChange}
        checkbox={company.companies.filter((item) =>
          item.name.toLowerCase().includes(company.searchText.toLowerCase())
        )}
      />
      <FilterItem
        name="Tags"
        search={searchTags}
        onChange={onTagChange}
        checkbox={tags.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()))}
      />
    </div>
  );
}

export default SideFilters;
