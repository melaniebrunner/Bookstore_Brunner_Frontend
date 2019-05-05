import { ShoppingCartFactory } from './shopping-cart-factory';

describe('ShoppingCartFactory', () => {
  it('should create an instance', () => {
    expect(new ShoppingCartFactory()).toBeTruthy();
  });
});
