import React from 'react';
import { render, screen } from '@testing-library/react';
import HeroSection from './HeroSection';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

// Mock the RecoBg component
jest.mock('../RecoBg/RecoBg', () => {
  return () => {
    return <div data-testid="reco-bg" />;
  };
});

// Mock the HeroButtons component
jest.mock('../HeroButtons/HeroButtons', () => {
  return () => {
    return <div data-testid="hero-buttons" />;
  };
});

// Mock the HighlightText component
jest.mock('../HighLightText/HighLightText', () => {
  return ({ children }: any) => {
    return <span data-testid="highlight-text">{children}</span>;
  };
});

describe('HeroSection Component', () => {
  it('renders the hero section with all elements', () => {
    render(<HeroSection />);
    
    // Check section structure
    const section = screen.getByTestId('hero-section');
    expect(section).toBeInTheDocument();
    
    // Check RecoBg component
    expect(screen.getByTestId('reco-bg')).toBeInTheDocument();
    
    // Check main content
    const mainContent = screen.getByRole('article');
    expect(mainContent).toBeInTheDocument();
    
    // Check slogan with highlighted text
    const slogan = screen.getByRole('heading', { level: 1 });
    expect(slogan).toBeInTheDocument();
    expect(slogan).toHaveTextContent(/RECO/);
    expect(slogan).toHaveTextContent("бренд створений з любовью до волосся");
    
    // Check highlighted text
    const highlightedTexts = screen.getAllByTestId('highlight-text');
    expect(highlightedTexts).toHaveLength(2);
    expect(highlightedTexts[0]).toHaveTextContent('RECO');
    expect(highlightedTexts[1]).toHaveTextContent('RECO');
    
    // Check image
    const image = screen.getByAltText('RECO продукція');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/images/sections/hero/hero-desc-1x.png');
    expect(image).toHaveAttribute('width', '600');
    expect(image).toHaveAttribute('height', '400');
    
    // Check description text
    const description = screen.getByText(/Кожен заслуговує на здорове, сильне та блискуче волосся/);
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent(/— це інструмент, який дарує нове життя вашому волоссю/);
    
    // Check HeroButtons component
    expect(screen.getByTestId('hero-buttons')).toBeInTheDocument();
  });
  
  it('applies custom className when provided', () => {
    render(<HeroSection className="custom-class" />);
    
    // Check if the custom class is applied
    const heroSection = screen.getByTestId('hero-section');
    expect(heroSection).toHaveClass('custom-class');
  });
}); 