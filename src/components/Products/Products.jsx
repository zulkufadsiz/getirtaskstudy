import React, { useEffect } from 'react';
import ProductItem from '../ProductItem/ProductItem';
import { Button, Container, Grid, Typography } from '@material-ui/core';
import { Pagination, PaginationItem } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { setProducts, setPage } from '../../store/products.reducer';
import { addToCart } from '../../store/cart.reducer';
import { ArrowForward } from '@material-ui/icons';
import Tag from '../Tag/Tag';
import './Products.css';
import { ITEM } from '../../utils/config';
import axiosApi from '../../utils/axiosApi';

function Products() {
  const dispatch = useDispatch();
  const { totalPage, _page } = useSelector((state) => state.product);
  const { _sort, _order, products, filteredTags } = useSelector((state) => state.filter);

  useEffect(() => {
    getProducts().then((response) => {
      dispatch(setProducts({ response, _page }));
    });
  }, [_page, _sort, _order]);

  const getProducts = async (_page, _limit = 16) => {
    const params = { _page, _limit, _order, _sort };
    const response = await axiosApi.get(ITEM, { params });
    return response;
  };

  const onItemAdd = (item) => {
    dispatch(addToCart({ item }));
  };

  const filteredProducts = products.filter((item) => {
    return filteredTags.length > 0 ? filteredTags.some((el) => item.tags.includes(el)) : item;
  });

  return (
    <div className="products-container">
      <Typography variant="h5" className="text-title text-grey pb-16">
        Product
      </Typography>
      <div className="tag-container">
        <Tag label="mug" />
        <Tag label="shirt" disabled />
      </div>
      <Container className="products-content">
        <Grid direction="row" justifyContent="center" alignItems="center" container spacing={2}>
          {filteredProducts.map((item, i) => (
            <Grid className="flex-col align-center" key={i} item xs={6} sm={4} md={4} lg={3} xl={2}>
              <ProductItem item={item} onItemAdd={onItemAdd} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <div className="pagination-container">
        <Pagination
          className="pagination"
          count={totalPage}
          defaultPage={_page}
          siblingCount={0}
          shape="rounded"
          onChange={(e, page) => {
            dispatch(setPage({ _page: page }));
          }}
          renderItem={(item) => (
            <PaginationItem
              {...item}
              components={{
                previous: (props) => (
                  <Button {...props} className="btn-link" startIcon={<ArrowBack />}>
                    Prev
                  </Button>
                ),
                next: (props) => (
                  <Button {...props} className="btn-link" endIcon={<ArrowForward />}>
                    Next
                  </Button>
                )
              }}
            />
          )}
        />
      </div>
    </div>
  );
}

export default Products;
