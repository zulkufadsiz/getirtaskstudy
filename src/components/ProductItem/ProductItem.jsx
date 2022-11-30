import React from 'react';
import { Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import './ProductItem.css';

function ProductItem({ item, onItemAdd }) {
  const image =
    'https://images.ctfassets.net/2d5q1td6cyxq/4kmwcxuqXxUxUVfggQhbiI/650b0af104bfdf9979545eb326786243/Hero-hottoddy_.jpg';
  return (
    <div className="product-item-container">
      <div className="product-image-container">
        <img className="product-image" src={image} alt="Image" />
      </div>
      <Typography data-testid="product-item-price" className="text-title text-blue">
        ₺{item.price}
      </Typography>
      <Typography data-testid="product-item-name" className="text-title product-title">
        {item.name}
      </Typography>
      <Button
        data-testid="product-add-btn"
        onClick={() => onItemAdd(item)}
        className="btn-primary"
        variant="contained">
        Add
      </Button>
    </div>
  );
}

export default ProductItem;
ProductItem.propTypes = {
  item: PropTypes.object,
  onItemAdd: PropTypes.func
};
