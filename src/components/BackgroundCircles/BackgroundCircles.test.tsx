import React from 'react';
import { render } from '@testing-library/react';
import BackgroundCircles from './BackgroundCircles';

describe('BackgroundCircles Component', () => {
  it('renders with default className', () => {
    const { container } = render(<BackgroundCircles />);
    const circlesElement = container.firstChild as HTMLElement;
    expect(circlesElement).toHaveClass('circles');
  });

  it('applies custom className when provided', () => {
    const customClass = 'custom-class';
    const { container } = render(<BackgroundCircles className={customClass} />);
    const circlesElement = container.firstChild as HTMLElement;
    expect(circlesElement).toHaveClass('circles');
    expect(circlesElement).toHaveClass(customClass);
  });
}); 