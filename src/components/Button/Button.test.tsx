import React from "react";
import { render, screen, fireEvent } from "../../test/test-utils";
import Button from "./Button";

describe("Button Component", () => {
  it("renders button with text content", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("renders button with icon when icon prop is provided", () => {
    const iconSrc = "/test-icon.png";
    render(<Button icon={iconSrc}>Click me</Button>);
    const icon = screen.getByAltText("icon");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("src", iconSrc);
  });

  it("applies correct size class", () => {
    render(<Button size="l">Large Button</Button>);
    expect(screen.getByText("Large Button").parentElement).toHaveClass(
      "button--l"
    );
  });

  it("applies correct variant class", () => {
    render(<Button variant="secondary">Secondary Button</Button>);
    expect(screen.getByText("Secondary Button").parentElement).toHaveClass(
      "button--secondary"
    );
  });

  it("applies correct state class", () => {
    render(<Button state="hover">Hover Button</Button>);
    expect(screen.getByText("Hover Button").parentElement).toHaveClass(
      "button--primary--hover"
    );
  });

  it("handles click events when not disabled", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not handle click events when disabled", () => {
    const handleClick = jest.fn();
    render(
      <Button disabled onClick={handleClick}>
        Click me
      </Button>
    );
    fireEvent.click(screen.getByText("Click me"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("has disabled attribute when disabled prop is true", () => {
    render(<Button disabled>Disabled Button</Button>);
    expect(screen.getByText("Disabled Button").parentElement).toBeDisabled();
  });

  it("applies disabled class when disabled", () => {
    render(<Button disabled>Disabled Button</Button>);
    expect(screen.getByText("Disabled Button").parentElement).toHaveClass(
      "button--disabled"
    );
  });
});
