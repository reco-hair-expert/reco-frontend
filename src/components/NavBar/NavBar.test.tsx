import React from 'react';
import { render, screen } from '@testing-library/react';
import NavBar from './NavBar';

describe('NavBar Component', () => {
  it('renders children correctly', () => {
    render(
      <NavBar>
        <div data-testid="test-child">Test Content</div>
      </NavBar>
    );
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    const customClass = 'custom-class';
    const { container } = render(
      <NavBar className={customClass}>
        <div>Test Content</div>
      </NavBar>
    );
    const navElement = container.querySelector('nav');
    expect(navElement).toHaveClass(customClass);
  });

  it('renders with default className when no custom className is provided', () => {
    const { container } = render(
      <NavBar>
        <div>Test Content</div>
      </NavBar>
    );
    const navElement = container.querySelector('nav');
    expect(navElement).toHaveClass('navBar');
  });
}); 