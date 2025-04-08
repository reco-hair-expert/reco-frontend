import React from 'react';
import { render, screen } from '@testing-library/react';
import SocialMediaHub from './SocialMediaHub';

describe('SocialMediaHub Component', () => {
  it('renders children correctly', () => {
    const testChild = <div data-testid="test-child">Test Content</div>;
    render(<SocialMediaHub>{testChild}</SocialMediaHub>);
    
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
  });
  
  it('applies custom className when provided', () => {
    const customClass = 'custom-class';
    const { container } = render(
      <SocialMediaHub className={customClass}>
        <div>Test Content</div>
      </SocialMediaHub>
    );
    
    expect(container.firstChild).toHaveClass(customClass);
  });
  
  it('applies default className when no custom className is provided', () => {
    const { container } = render(
      <SocialMediaHub>
        <div>Test Content</div>
      </SocialMediaHub>
    );
    
    expect(container.firstChild).toHaveClass('social_media_hub');
  });
  
  it('passes additional props to the container div', () => {
    const testId = 'test-id';
    render(
      <SocialMediaHub data-testid={testId}>
        <div>Test Content</div>
      </SocialMediaHub>
    );
    
    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });
}); 