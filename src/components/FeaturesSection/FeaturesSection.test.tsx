import React from 'react';
import { render, screen } from '@testing-library/react';
import FeaturesSection from './FeaturesSection';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

// Mock the HighlightText component
jest.mock('../HighLightText/HighLightText', () => {
  return ({ children }: any) => {
    return <span data-testid="highlight-text">{children}</span>;
  };
});

// Mock the BackgroundCircles component
jest.mock('../BackgroundCircles/BackgroundCircles', () => {
  return ({ className }: any) => {
    return <div data-testid="background-circles" className={className} />;
  };
});

describe('FeaturesSection Component', () => {
  it('renders all features sections with correct content', () => {
    render(<FeaturesSection />);
    
    // Check section structure
    const section = screen.getByRole('heading', { name: 'Особливості продукту' }).closest('section');
    expect(section).toBeInTheDocument();
    
    // Check background circles
    const backgroundCircles = screen.getByTestId('background-circles');
    expect(backgroundCircles).toBeInTheDocument();
    
    // Check main heading
    const mainHeading = screen.getByRole('heading', { level: 2 });
    expect(mainHeading).toHaveTextContent('Особливості продукту');
    
    // Check left side features
    const leftHeading = screen.getByRole('heading', { name: 'Ефективність' });
    expect(leftHeading).toBeInTheDocument();
    
    const leftText = screen.getByText(/навіть для волосся з 5 ступенем пошкодження/i);
    expect(leftText).toBeInTheDocument();
    
    // Check about us link
    const aboutLink = screen.getByRole('link', { name: /про нас/i });
    expect(aboutLink).toHaveAttribute('href', '/about');
    
    // Check product image
    const productImage = screen.getByAltText('recoil');
    expect(productImage).toBeInTheDocument();
    expect(productImage).toHaveAttribute('src', '/images/sections/features/recoil.png');
    
    // Check right side features
    const rightTopHeading = screen.getByRole('heading', { name: 'Простота у використанні' });
    expect(rightTopHeading).toBeInTheDocument();
    
    const rightTopText = screen.getByText(/ідеально підходить як/i);
    expect(rightTopText).toBeInTheDocument();
    
    const rightBottomHeading = screen.getByRole('heading', { name: 'Комплексний підхід' });
    expect(rightBottomHeading).toBeInTheDocument();
    
    const rightBottomText = screen.getByText(/не лише відновлює, але й забезпечує/i);
    expect(rightBottomText).toBeInTheDocument();
    
    // Check highlighted text elements
    const highlightedTexts = screen.getAllByTestId('highlight-text');
    expect(highlightedTexts.length).toBeGreaterThan(0);
  });

  it('applies custom className when provided', () => {
    const customClass = 'custom-class';
    render(<FeaturesSection className={customClass} />);
    
    const section = screen.getByRole('heading', { name: 'Особливості продукту' }).closest('section');
    expect(section).not.toBeNull();
    expect(section!.querySelector(`.${customClass}`)).toBeInTheDocument();
  });
}); 