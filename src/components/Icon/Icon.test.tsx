import React from "react";
import { render, screen } from "@testing-library/react";
import Icon from "./Icon";

describe("Icon Component", () => {
  it("renders with default props", () => {
    const { container } = render(<Icon name="test-icon" />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("width", "24");
    expect(svg).toHaveAttribute("height", "24");
    expect(svg).toHaveAttribute("fill", "none");
    expect(svg).toHaveAttribute("stroke", "currentColor");
  });

  it("renders with custom size", () => {
    const { container } = render(<Icon name="test-icon" size={32} />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", "32");
    expect(svg).toHaveAttribute("height", "32");
  });

  it("renders with custom stroke and fill", () => {
    const { container } = render(
      <Icon fill="blue" name="test-icon" stroke="red" />
    );
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("stroke", "red");
    expect(svg).toHaveAttribute("fill", "blue");
  });

  it("renders with custom className", () => {
    const { container } = render(
      <Icon className="custom-class" name="test-icon" />
    );
    const svg = container.querySelector("svg");
    expect(svg).toHaveClass("custom-class");
  });

  it("uses correct sprite reference", () => {
    const { container } = render(<Icon name="test-icon" />);
    const use = container.querySelector("use");
    expect(use).toHaveAttribute("href", "/sprite.svg#test-icon");
  });
});
