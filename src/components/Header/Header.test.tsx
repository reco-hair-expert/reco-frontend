import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';
import { navigationButtons } from '@/constants/navigationButtons';
import { phoneNumber } from '@/constants/contacts';

// Mock the next/image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />;
  },
}));

// Mock the next/link component
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

describe('Header Component', () => {
  it('renders the logo with correct attributes', () => {
    render(<Header />);
    const logo = screen.getByAltText('Логотип компании');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/images/logo/logo-1x.png');
    expect(logo).toHaveAttribute('width', '64');
    expect(logo).toHaveAttribute('height', '64');
  });

  it('renders navigation buttons with correct labels', () => {
    render(<Header />);
    navigationButtons.forEach((button) => {
      expect(screen.getByText(button.title)).toBeInTheDocument();
    });
  });

  it('renders call button with correct phone number', () => {
    render(<Header />);
    const phoneLink = screen.getByText(phoneNumber).closest('a');
    expect(phoneLink).toHaveAttribute('href', `tel:${phoneNumber}`);
  });

  it('renders cart button with link to cart page', () => {
    render(<Header />);
    const cartButton = screen.getByRole('button', { name: '' });
    const cartLink = cartButton.closest('a');
    expect(cartLink).toHaveAttribute('href', '/cart');
  });

  it('renders burger button for mobile menu', () => {
    render(<Header />);
    const burgerButton = screen.getByRole('button', { name: /menu/i });
    expect(burgerButton).toBeInTheDocument();
  });
}); 