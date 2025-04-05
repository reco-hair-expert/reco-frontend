import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CatalogCard from './CatalogCard';
import { useCart } from '@/context/CartContext';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: any) => {
    return <a href={href}>{children}</a>;
  };
});

// Mock the Icon component
jest.mock('../Icon/Icon', () => {
  return ({ name, className }: any) => {
    return <div data-testid={`icon-${name}`} className={className}>Icon</div>;
  };
});

// Mock the CartContext
jest.mock('@/context/CartContext', () => ({
  useCart: jest.fn(),
}));

describe('CatalogCard Component', () => {
  const mockProduct = {
    id: 1,
    name: 'Test Product',
    photo: '/test-image.jpg',
    sizes: {
      S: 100,
      M: 120,
      L: 140,
    },
    volume: '500ml',
    description: 'Test product description',
    type: 'Сухе'
  };

  const mockAddToCart = jest.fn();

  beforeEach(() => {
    (useCart as jest.Mock).mockReturnValue({
      addToCart: mockAddToCart,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders product information correctly', () => {
    render(<CatalogCard product={mockProduct} perRow={3} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByAltText('Test Product')).toHaveAttribute('src', '/test-image.jpg');
    expect(screen.getByText('bestseller')).toBeInTheDocument();
    
    // Use getAllByText for elements that appear multiple times
    const typeElements = screen.getAllByText('Сухе');
    expect(typeElements.length).toBeGreaterThan(0);
  });

  it('renders size selector with available sizes', () => {
    render(<CatalogCard product={mockProduct} perRow={3} />);
    
    const sizeSelect = screen.getByRole('combobox');
    expect(sizeSelect).toBeInTheDocument();
    
    // Use getAllByText for elements that appear multiple times
    const sizeOptions = screen.getAllByText('Оберіть розмір');
    expect(sizeOptions.length).toBeGreaterThan(0);
    
    expect(screen.getByText('S')).toBeInTheDocument();
    expect(screen.getByText('M')).toBeInTheDocument();
    expect(screen.getByText('L')).toBeInTheDocument();
  });

  it('shows warning when trying to buy without selecting size', async () => {
    render(<CatalogCard product={mockProduct} perRow={3} />);
    
    // Find the button by its class instead of text
    const buyButton = screen.getByRole('button', { name: /Оберіть розмір/i });
    fireEvent.click(buyButton);
    
    expect(screen.getByText('Будь ласка, оберіть розмір перед покупкою.')).toBeInTheDocument();
    expect(mockAddToCart).not.toHaveBeenCalled();
    
    await waitFor(() => {
      expect(screen.queryByText('Будь ласка, оберіть розмір перед покупкою.')).not.toBeInTheDocument();
    }, { timeout: 3500 });
  });

  it('adds product to cart when size is selected', () => {
    render(<CatalogCard product={mockProduct} perRow={3} />);
    
    const sizeSelect = screen.getByRole('combobox');
    fireEvent.change(sizeSelect, { target: { value: 'M' } });
    
    // The button text changes after selecting a size
    const buyButton = screen.getByRole('button', { name: /Купити за 120 грн/i });
    fireEvent.click(buyButton);
    
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct, 'M');
  });

  it('applies correct width based on perRow prop', () => {
    render(<CatalogCard product={mockProduct} perRow={4} />);
    
    const card = screen.getByTestId('catalog-card');
    expect(card).toHaveStyle({ width: 'calc((100% - 20px * 3) / 4)' });
  });
}); 