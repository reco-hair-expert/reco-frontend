import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CallButton from './CallButton';

// Mock the Icon component
jest.mock('@/components/Icon/Icon', () => {
  return function MockIcon({ name }: { name: string }) {
    return <div data-testid={`icon-${name}`}>Icon</div>;
  };
});

describe('CallButton Component', () => {
  const mockPhoneNumber = '+7 (999) 999-99-99';
  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it('renders with correct phone number', () => {
    render(<CallButton phoneNumber={mockPhoneNumber} />);
    expect(screen.getByText(mockPhoneNumber)).toBeInTheDocument();
  });

  it('renders with correct accessibility attributes', () => {
    render(<CallButton phoneNumber={mockPhoneNumber} ariaLabel="Call us" />);
    const button = screen.getByRole('button', { name: /call us/i });
    expect(button).toBeInTheDocument();
  });

  it('renders phone icon', () => {
    render(<CallButton phoneNumber={mockPhoneNumber} />);
    const icon = screen.getByTestId('icon-icon-phone');
    expect(icon).toBeInTheDocument();
  });

  it('handles click events', () => {
    render(<CallButton phoneNumber={mockPhoneNumber} onClick={mockOnClick} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom className correctly', () => {
    const customClass = 'custom-class';
    render(<CallButton phoneNumber={mockPhoneNumber} className={customClass} />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass(customClass);
  });
}); 