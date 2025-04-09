import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CartSummary from './CartSummary';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

// Mock the hooks
jest.mock('@/context/CartContext');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('CartSummary Component', () => {
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useCart as jest.Mock).mockReturnValue({
      cartItems: [
        {
          product: {
            sizes: {
              M: 100,
            },
          },
          size: 'M',
          quantity: 2,
        },
      ],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders cart summary with correct total', () => {
    render(<CartSummary />);
    const totalElements = screen.getAllByText('₴200');
    expect(totalElements).toHaveLength(2);
    expect(totalElements[0]).toBeInTheDocument();
  });

  it('renders delivery options', () => {
    render(<CartSummary />);
    expect(screen.getByText('Стандартна доставка')).toBeInTheDocument();
    expect(screen.getByText('Експрес доставка')).toBeInTheDocument();
  });

  it('navigates to catalog when continue shopping is clicked', () => {
    render(<CartSummary />);
    fireEvent.click(screen.getByText('ПРОДОВЖИТИ ПОКУПКИ'));
    expect(mockRouter.push).toHaveBeenCalledWith('/catalog');
  });

  it('navigates to summary when checkout is clicked', () => {
    render(<CartSummary />);
    fireEvent.click(screen.getByText('ОФОРМИТИ ЗАМОВЛЕННЯ'));
    expect(mockRouter.push).toHaveBeenCalledWith('/summary');
  });
}); 