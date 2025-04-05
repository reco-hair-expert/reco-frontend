import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BurgerBtn from './BurgerBtn';

// Mock the ModalMenu component since we're testing BurgerBtn in isolation
jest.mock('../MobileMenu/ModalMenu', () => {
  return function MockModalMenu({ isOpen }: { isOpen: boolean }) {
    return isOpen ? <div data-testid="modal-menu">Modal Menu</div> : null;
  };
});

describe('BurgerBtn Component', () => {
  it('renders with correct accessibility attributes', () => {
    render(<BurgerBtn aria-label="Menu" />);
    const button = screen.getByRole('button', { name: /menu/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'button');
  });

  it('toggles modal visibility when clicked', () => {
    render(<BurgerBtn aria-label="Menu" />);
    const button = screen.getByRole('button', { name: /menu/i });
    
    // Initially, modal should not be visible
    expect(screen.queryByTestId('modal-menu')).not.toBeInTheDocument();
    
    // Click to open modal
    fireEvent.click(button);
    expect(screen.getByTestId('modal-menu')).toBeInTheDocument();
    
    // Click again to close modal
    fireEvent.click(button);
    expect(screen.queryByTestId('modal-menu')).not.toBeInTheDocument();
  });

  it('toggles body overflow style when modal is opened/closed', () => {
    render(<BurgerBtn aria-label="Menu" />);
    const button = screen.getByRole('button', { name: /menu/i });
    
    // Initial state
    expect(document.body.style.overflow).toBe('auto');
    
    // Open modal
    fireEvent.click(button);
    expect(document.body.style.overflow).toBe('hidden');
    
    // Close modal
    fireEvent.click(button);
    expect(document.body.style.overflow).toBe('auto');
  });

  it('adds open class when modal is opened', () => {
    render(<BurgerBtn aria-label="Menu" />);
    const button = screen.getByRole('button', { name: /menu/i });
    
    // Check initial state
    expect(button).not.toHaveClass('open');
    
    // Open modal
    fireEvent.click(button);
    expect(button).toHaveClass('open');
    
    // Close modal
    fireEvent.click(button);
    expect(button).not.toHaveClass('open');
  });
}); 