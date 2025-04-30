import React from "react";
import { render, screen } from "@testing-library/react";
import InputLabel from "./InputLabel";

// Mock Icon component
jest.mock("@/components/Icon/Icon", () => {
  return function MockIcon({ className, name, stroke, size }: any) {
    return (
      <svg
        className={className}
        data-name={name}
        data-size={size}
        data-stroke={stroke}
        data-testid="mock-icon"
      />
    );
  };
});

describe("InputLabel Component", () => {
  it("renders label with text", () => {
    const labelText = "Test Label";
    render(<InputLabel htmlFor="test-input">{labelText}</InputLabel>);
    expect(screen.getByText(labelText)).toBeInTheDocument();
  });

  it("sets correct htmlFor attribute", () => {
    const htmlFor = "test-input";
    render(<InputLabel htmlFor={htmlFor}>Test Label</InputLabel>);
    expect(screen.getByText("Test Label")).toHaveAttribute("for", htmlFor);
  });

  it("applies correct class", () => {
    const { container } = render(
      <InputLabel htmlFor="test-input">Test Label</InputLabel>
    );
    expect(container.querySelector("label")).toHaveClass("inputLabel");
  });

  it("renders star icon when required is true", () => {
    render(
      <InputLabel required htmlFor="test-input">
        Test Label
      </InputLabel>
    );
    const icon = screen.getByTestId("mock-icon");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("data-name", "icon-star");
    expect(icon).toHaveAttribute("data-stroke", "#fbc000");
    expect(icon).toHaveAttribute("data-size", "20");
    expect(icon).toHaveClass("inputIconStar");
  });

  it("does not render star icon when required is false", () => {
    render(
      <InputLabel htmlFor="test-input" required={false}>
        Test Label
      </InputLabel>
    );
    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
  });
});
