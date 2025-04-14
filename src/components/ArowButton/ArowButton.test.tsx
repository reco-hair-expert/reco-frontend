import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ButtonArrow from "./ArowButton";

// Mock the Icon component
jest.mock("../Icon/Icon", () => {
  return ({ name, size, fill, stroke, className }: any) => {
    return (
      <div data-testid={name} className={className}>
        Icon
      </div>
    );
  };
});

describe("ButtonArrow Component", () => {
  it("renders with left icon", () => {
    render(<ButtonArrow icon="left" />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("buttonArrow");
    expect(screen.getByTestId("icon-arrow-right2")).toBeInTheDocument();
  });

  it("renders with right icon", () => {
    render(<ButtonArrow icon="right" />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("buttonArrow");
    expect(screen.getByTestId("icon-arrow-right2")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const customClass = "custom-class";
    render(<ButtonArrow icon="left" className={customClass} />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass(customClass);
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<ButtonArrow icon="left" onClick={handleClick} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("calls onTouchEnd handler when touched", () => {
    const handleTouchEnd = jest.fn();
    render(<ButtonArrow icon="left" onTouchEnd={handleTouchEnd} />);
    const button = screen.getByRole("button");
    fireEvent.touchStart(button);
    expect(handleTouchEnd).toHaveBeenCalledTimes(1);
  });
});
