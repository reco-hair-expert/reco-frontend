import React from 'react';
import { render, screen } from '@testing-library/react';
import SocialMediaLinks from './SocialMediaLinks';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

describe('SocialMediaLinks Component', () => {
  it('renders Instagram icon with correct attributes', () => {
    render(<SocialMediaLinks platform="instagram" />);
    
    const link = screen.getByRole('link');
    const image = screen.getByAltText('instagram icon');
    
    expect(link).toHaveAttribute('href', 'https://www.instagram.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(image).toHaveAttribute('src', '/icon/instagram.svg');
    expect(image).toHaveAttribute('width', '64');
    expect(image).toHaveAttribute('height', '64');
  });
  
  it('renders Telegram icon with correct attributes', () => {
    render(<SocialMediaLinks platform="telegram" />);
    
    const link = screen.getByRole('link');
    const image = screen.getByAltText('telegram icon');
    
    expect(link).toHaveAttribute('href', 'https://t.me');
    expect(image).toHaveAttribute('src', '/icon/telegram.svg');
  });
  
  it('renders Viber icon with correct attributes', () => {
    render(<SocialMediaLinks platform="viber" />);
    
    const link = screen.getByRole('link');
    const image = screen.getByAltText('viber icon');
    
    expect(link).toHaveAttribute('href', 'https://www.viber.com');
    expect(image).toHaveAttribute('src', '/icon/viber.svg');
  });
  
  it('uses custom size when provided', () => {
    const customSize = 32;
    render(<SocialMediaLinks platform="instagram" size={customSize} />);
    
    const image = screen.getByAltText('instagram icon');
    expect(image).toHaveAttribute('width', customSize.toString());
    expect(image).toHaveAttribute('height', customSize.toString());
  });
  
  it('uses default size when not provided', () => {
    render(<SocialMediaLinks platform="instagram" />);
    
    const image = screen.getByAltText('instagram icon');
    expect(image).toHaveAttribute('width', '64');
    expect(image).toHaveAttribute('height', '64');
  });
}); 