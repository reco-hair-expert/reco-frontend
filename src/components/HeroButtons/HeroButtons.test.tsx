import React from "react";
import { render, screen } from "@testing-library/react";
import HeroButtons from "./HeroButtons";

// Mock next/link
jest.mock("next/link", () => {
  return ({ children, href }: any) => {
    return <a href={href}>{children}</a>;
  };
});

// Mock the Button component
jest.mock("../Button/Button", () => {
  return ({ children, size, variant, className }: any) => {
    return (
      <button
        data-testid="button"
        data-size={size}
        data-variant={variant}
        className={className}
      >
        {children}
      </button>
    );
  };
});

// Mock the Icon component
jest.mock("../Icon/Icon", () => {
  return ({ name, size, fill, stroke, className }: any) => {
    return (
      <div
        data-testid={`icon-${name}`}
        data-size={size}
        data-fill={fill}
        data-stroke={stroke}
        className={className}
      />
    );
  };
});

// Mock useDeviceDetection hook
jest.mock("@/context/useDeviceDetection", () => ({
  __esModule: true,
  default: () => ({
    isMobile: false,
    isTablet: false
  })
}));

describe("HeroButtons Component", () => {
  it("renders both buttons with correct links", () => {
    render(<HeroButtons />);

    // Check if both buttons are rendered
    const buttons = screen.getAllByTestId("button");
    expect(buttons).toHaveLength(2);

    // Check if both links are rendered with correct hrefs
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute("href", "/catalog");
    expect(links[1]).toHaveAttribute("href", "/about");
  });

  it("renders buttons with correct text", () => {
    render(<HeroButtons />);

    // Check button text
    expect(screen.getByText("ЗАМОВИТИ")).toBeInTheDocument();
    expect(screen.getByText("ПРО НАС")).toBeInTheDocument();
  });

  it("renders buttons with correct variants", () => {
    render(<HeroButtons />);

    // Check button variants
    const buttons = screen.getAllByTestId("button");
    expect(buttons[0]).toHaveAttribute("data-variant", "primary");
    expect(buttons[1]).toHaveAttribute("data-variant", "secondary");
  });

  it("renders icons with correct properties", () => {
    render(<HeroButtons />);

    // Check icons
    const icons = screen.getAllByTestId(/icon-/);
    expect(icons).toHaveLength(2);
    expect(icons[0]).toHaveAttribute(
      "data-testid",
      "icon-icon-arrow-up-right2"
    );
    expect(icons[1]).toHaveAttribute(
      "data-testid",
      "icon-icon-arrow-up-right2"
    );
    expect(icons[0]).toHaveAttribute("data-size", "30");
    expect(icons[1]).toHaveAttribute("data-size", "30");
    expect(icons[0]).toHaveAttribute("data-fill", "white");
    expect(icons[1]).toHaveAttribute("data-fill", "white");
    expect(icons[0]).toHaveAttribute("data-stroke", "none");
    expect(icons[1]).toHaveAttribute("data-stroke", "none");
  });

  it("adjusts button size based on device type", () => {
    // Test for desktop (default)
    const { rerender } = render(<HeroButtons />);
    let buttons = screen.getAllByTestId("button");
    expect(buttons[0]).toHaveAttribute("data-size", "l");
    expect(buttons[1]).toHaveAttribute("data-size", "l");

    // Test for tablet
    const mockUseDeviceDetection = jest.requireMock(
      "@/context/useDeviceDetection"
    );
    mockUseDeviceDetection.default = () => ({
      isMobile: false,
      isTablet: true
    });
    rerender(<HeroButtons />);
    buttons = screen.getAllByTestId("button");
    expect(buttons[0]).toHaveAttribute("data-size", "m");
    expect(buttons[1]).toHaveAttribute("data-size", "m");

    // Test for mobile
    mockUseDeviceDetection.default = () => ({
      isMobile: true,
      isTablet: false
    });
    rerender(<HeroButtons />);
    buttons = screen.getAllByTestId("button");
    expect(buttons[0]).toHaveAttribute("data-size", "s");
    expect(buttons[1]).toHaveAttribute("data-size", "s");
  });
});
