import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ModalMenu from "./ModalMenu";
import "@testing-library/jest-dom";

// Mock the navigationButtons
jest.mock("@/constants/navigationButtons", () => ({
  navigationButtons: [
    { title: "Home", link: "/" },
    { title: "About", link: "/about" },
    { title: "Contact", link: "/contact" }
  ]
}));

describe("ModalMenu Component", () => {
  it("renders when isOpen is true", () => {
    render(<ModalMenu isOpen={true} onClick={() => {}} />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("does not render when isOpen is false", () => {
    const { container } = render(
      <ModalMenu isOpen={false} onClick={() => {}} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<ModalMenu isOpen={true} onClick={handleClick} />);

    fireEvent.click(screen.getByRole("navigation"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders navigation buttons", () => {
    render(<ModalMenu isOpen={true} onClick={() => {}} />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("applies correct classes based on isOpen prop", () => {
    const { rerender } = render(<ModalMenu isOpen={true} onClick={() => {}} />);
    const modal = screen.getByRole("navigation").parentElement;

    expect(modal).toHaveClass("show");

    rerender(<ModalMenu isOpen={false} onClick={() => {}} />);
    expect(modal).toHaveClass("hide");
  });
});
