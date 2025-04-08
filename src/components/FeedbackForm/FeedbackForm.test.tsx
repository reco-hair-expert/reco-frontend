import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FeedbackForm from './FeedbackForm';

// Mock the Icon component
jest.mock('../Icon/Icon', () => {
  return ({ name, className }: any) => {
    return <div data-testid={`icon-${name}`} className={className}>Icon</div>;
  };
});

// Mock the Button component
jest.mock('../Button/Button', () => {
  return ({ children, variant, size, className }: any) => {
    return (
      <button 
        data-testid="button" 
        data-variant={variant} 
        data-size={size} 
        className={className}
      >
        {children}
      </button>
    );
  };
});

// Mock the InputLabel component
jest.mock('../InputLabel/InputLabel', () => {
  return ({ children, htmlFor, required }: any) => {
    return (
      <label htmlFor={htmlFor} data-required={required}>
        {children}
      </label>
    );
  };
});

// Mock useDeviceDetection hook
jest.mock('@/context/useDeviceDetection', () => ({
  __esModule: true,
  default: () => ({
    isMobile: false,
    isTablet: false
  })
}));

describe('FeedbackForm Component', () => {
  it('renders form with all inputs and labels', () => {
    render(<FeedbackForm />);
    
    // Check form elements
    expect(screen.getByLabelText(/ім'я/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/номер телефону/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Введіть ваше імʼя')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('+380 __ ___ __ __')).toBeInTheDocument();
    
    // Check required labels
    const labels = screen.getAllByText(/ім'я|номер телефону/i);
    labels.forEach(label => {
      expect(label).toHaveAttribute('data-required', 'true');
    });
    
    // Check phone icon
    expect(screen.getByTestId('icon-icon-phone')).toBeInTheDocument();
    
    // Check submit button
    const button = screen.getByTestId('button');
    expect(button).toHaveAttribute('data-variant', 'primary');
    expect(button).toHaveAttribute('data-size', 'l');
  });

  it('shows validation errors for empty fields', async () => {
    render(<FeedbackForm />);
    
    const submitButton = screen.getByTestId('button');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      const errorMessages = screen.getAllByText('Це поле обовʼязкове');
      expect(errorMessages).toHaveLength(2);
    });
  });

  it('validates name input format', async () => {
    render(<FeedbackForm />);
    
    const nameInput = screen.getByLabelText(/ім'я/i);
    fireEvent.change(nameInput, { target: { value: '123' } });
    fireEvent.blur(nameInput);
    
    await waitFor(() => {
      const error = screen.getByText(/ім'я/i);
      expect(error).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('validates phone number length', async () => {
    render(<FeedbackForm />);
    
    const phoneInput = screen.getByLabelText(/номер телефону/i);
    fireEvent.change(phoneInput, { target: { value: '+380' } });
    fireEvent.blur(phoneInput);
    
    await waitFor(() => {
      const error = screen.getByText(/номер/i);
      expect(error).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('resets form after successful submission', async () => {
    render(<FeedbackForm />);
    
    const nameInput = screen.getByLabelText(/ім'я/i);
    const phoneInput = screen.getByLabelText(/номер телефону/i);
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(phoneInput, { target: { value: '+380501234567' } });
    
    const submitButton = screen.getByTestId('button');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(nameInput).toHaveValue('');
      expect(phoneInput).toHaveValue('');
    });
  });
}); 