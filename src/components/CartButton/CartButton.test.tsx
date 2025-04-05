import React from 'react';
import { render, screen, fireEvent } from '../../test/test-utils';
import CartButton from './CartButton';
import { CartContext } from '@/context/CartContext';
import { CartItem } from '@/types/types';

// Mock the Icon component
jest.mock('@/components/Icon/Icon', () => {
  return function MockIcon({ name, stroke, size, className }: any) {
    return <div data-testid="mock-icon" className={className}>{name}</div>;
  };
});

describe('CartButton Component', () => {
  const mockCartItems: CartItem[] = [
    { product: { id: 1, name: 'Product 1', volume: '100ml', photo: '', description: '', sizes: {}, type: 'test' }, quantity: 2 },
    { product: { id: 2, name: 'Product 2', volume: '200ml', photo: '', description: '', sizes: {}, type: 'test' }, quantity: 3 },
  ];

  const renderWithContext = (cartItems: CartItem[] = [], onClick = jest.fn()) => {
    return render(
      <CartContext.Provider value={{ cartItems, cartTotal: 0, cartCount: 0, addToCart: jest.fn(), removeFromCart: jest.fn(), updateCartItemQuantity: jest.fn() }}>
        <CartButton onClick={onClick} cart={cartItems} />
      </CartContext.Provider>
    );
  };

  it('renders cart button with icon', () => {
    renderWithContext();
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
  });

  it('shows badge with total items when cart is not empty', () => {
    renderWithContext(mockCartItems);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('does not show badge when cart is empty', () => {
    renderWithContext([]);
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  it('is disabled when cart is empty', () => {
    renderWithContext([]);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('is enabled when cart has items', () => {
    renderWithContext(mockCartItems);
    expect(screen.getByRole('button')).not.toBeDisabled();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    renderWithContext(mockCartItems, handleClick);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom className when provided', () => {
    render(
      <CartContext.Provider value={{ cartItems: [], cartTotal: 0, cartCount: 0, addToCart: jest.fn(), removeFromCart: jest.fn(), updateCartItemQuantity: jest.fn() }}>
        <CartButton className="custom-class" cart={[]} />
      </CartContext.Provider>
    );
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });
}); 