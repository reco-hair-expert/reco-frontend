import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import SummaryForm from './SummaryForm';
import handlePhoneChange from '@/utils/handlePhoneChange';

// Mock the handlePhoneChange utility
jest.mock('@/utils/handlePhoneChange', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('SummaryForm Component', () => {
  beforeEach(() => {
    (handlePhoneChange as jest.Mock).mockImplementation((event, setValue) => {
      setValue('phoneNumber', event.target.value);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders all form fields', () => {
    render(<SummaryForm />);
    
    expect(screen.getByLabelText(/Ім'я/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Прізвище/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Телефон/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Країна \/ Регіон/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Місто/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Відділення/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Нотатки до замовлення/i)).toBeInTheDocument();
  });

  it('shows validation errors for required fields', async () => {
    render(<SummaryForm />);
    
    const form = screen.getByTestId('summaryForm');
    await act(async () => {
      fireEvent.submit(form);
    });

    await waitFor(() => {
      const errorMessages = screen.getAllByText(/Це поле обовʼязкове/i);
      expect(errorMessages.length).toBeGreaterThan(0);
    });
  });

  it('validates name fields for letters only', async () => {
    render(<SummaryForm />);
    
    const firstNameInput = screen.getByLabelText(/Ім'я/i);
    fireEvent.change(firstNameInput, { target: { value: '123' } });
    
    const form = screen.getByTestId('summaryForm');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText(/Імʼя повинно містити тільки букви/i)).toBeInTheDocument();
    });
  });

  it('validates phone number format', async () => {
    render(<SummaryForm />);
    
    const phoneInput = screen.getByLabelText(/Телефон/i);
    fireEvent.change(phoneInput, { target: { value: '+380' } });
    
    const form = screen.getByTestId('summaryForm');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText(/Введіть повний номер/i)).toBeInTheDocument();
    });
  });

  it('calls handlePhoneChange on phone input focus and change', () => {
    render(<SummaryForm />);
    
    const phoneInput = screen.getByLabelText(/Телефон/i);
    fireEvent.focus(phoneInput);
    fireEvent.change(phoneInput, { target: { value: '+380' } });

    expect(handlePhoneChange).toHaveBeenCalledTimes(2);
  });
}); 