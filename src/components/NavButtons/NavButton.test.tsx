import React from "react";
import { render, screen } from "@testing-library/react";
import NavButtons from "./NavButton";

// Mock the next/link component
jest.mock("next/link", () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

// Mock the Button component
jest.mock("../Button/Button", () => {
  return ({
    children,
    variant,
    size
  }: {
    children: React.ReactNode;
    variant: string;
    size: string;
  }) => (
    <button data-variant={variant} data-size={size}>
      {children}
    </button>
  );
});

describe("NavButtons Component", () => {
  const mockButtons = [
    { title: "Home", link: "/" },
    { title: "About", link: "/about" },
    { title: "Contact", link: "/contact" }
  ];
  const mockLabels = ["Home", "About", "Contact"];

  it("renders all navigation buttons with correct titles", () => {
    render(<NavButtons buttons={mockButtons} labels={mockLabels} />);
    mockButtons.forEach((button) => {
      expect(screen.getByText(button.title)).toBeInTheDocument();
    });
  });

  it("renders buttons with correct links", () => {
    render(<NavButtons buttons={mockButtons} labels={mockLabels} />);
    mockButtons.forEach((button) => {
      const link = screen.getByText(button.title).closest("a");
      expect(link).toHaveAttribute("href", button.link);
    });
  });

  it("renders buttons with correct variant and size", () => {
    render(<NavButtons buttons={mockButtons} labels={mockLabels} />);
    const buttons = screen.getAllByRole("button");
    buttons.forEach((button) => {
      expect(button).toHaveAttribute("data-variant", "black");
      expect(button).toHaveAttribute("data-size", "m");
    });
  });

  it("applies custom className when provided", () => {
    const customClass = "custom-class";
    const { container } = render(
      <NavButtons
        buttons={mockButtons}
        labels={mockLabels}
        className={customClass}
      />
    );
    const navButtonsContainer = container.firstChild;
    expect(navButtonsContainer).toHaveClass(customClass);
  });

  it("renders with default className when no custom className is provided", () => {
    const { container } = render(
      <NavButtons buttons={mockButtons} labels={mockLabels} />
    );
    const navButtonsContainer = container.firstChild;
    expect(navButtonsContainer).toHaveClass("navBtns");
  });
});
