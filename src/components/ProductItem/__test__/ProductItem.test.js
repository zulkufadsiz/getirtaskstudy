import { render } from '@testing-library/react';
import ProductItem from '../ProductItem';

describe('Product item component tests', () => {
  test('Check product item price and name', () => {
    const item = { name: 'Handcrafted Trees Mug', price: 10.99 };
    const component = render(<ProductItem item={item} />);
    const price = component.getByTestId('product-item-price');
    expect(price.textContent).toBe(`₺${item.price}`);
    const name = component.getByTestId('product-item-name');
    expect(name.textContent).toBe(item.name);

  });
});
