import React from 'react';
import { render, screen } from '@testing-library/react';
import AddressForm from './AddressForm';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

describe('AddressForm Component', () => {
  const defaultProps = {
    phoneNumber: '+380501234567',
    email: 'test@example.com',
    address: '123 Test Street, City',
  };

  it('renders all contact information', () => {
    render(<AddressForm {...defaultProps} />);
    
    expect(screen.getByText(defaultProps.address)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.phoneNumber)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.email)).toBeInTheDocument();
  });

  it('renders correct phone link', () => {
    render(<AddressForm {...defaultProps} />);
    const phoneLink = screen.getByText(defaultProps.phoneNumber);
    expect(phoneLink).toHaveAttribute('href', `tel:${defaultProps.phoneNumber}`);
  });

  it('renders correct email link', () => {
    render(<AddressForm {...defaultProps} />);
    const emailLink = screen.getByText(defaultProps.email);
    expect(emailLink).toHaveAttribute('href', `mailto:${defaultProps.email}`);
  });

  it('renders payment icons', () => {
    render(<AddressForm {...defaultProps} />);
    const paymentIcon = screen.getByAltText('Visa and Mastercard payment options');
    expect(paymentIcon).toBeInTheDocument();
    expect(paymentIcon).toHaveAttribute('src', '/images/sections/footer/visa-mastercard.svg');
  });

  it('applies custom className when provided', () => {
    const customClass = 'custom-class';
    const { container } = render(<AddressForm {...defaultProps} className={customClass} />);
    expect(container.firstChild).toHaveClass(customClass);
  });
}); 