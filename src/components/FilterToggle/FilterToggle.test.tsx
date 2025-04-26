import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FilterToggle from "./FilterToggle";

describe("FilterToggle Component", () => {
  it("renders all filter options", () => {
    render(<FilterToggle />);

    // Check if all options are rendered
    expect(screen.getByText("Сухе")).toBeInTheDocument();
    expect(screen.getByText("Фабоване")).toBeInTheDocument();
    expect(screen.getByText("Термозахист")).toBeInTheDocument();
  });

  it('has "Сухе" as the default active option', () => {
    render(<FilterToggle />);

    // Check if "Сухе" is active by default
    const activeOption = screen.getByText("Сухе");
    expect(activeOption).toHaveClass("active");
  });

  it("changes active option when clicked", () => {
    render(<FilterToggle />);

    // Click on "Фабоване" option
    const fabovaneOption = screen.getByText("Фабоване");
    fireEvent.click(fabovaneOption);

    // Check if "Фабоване" becomes active
    expect(fabovaneOption).toHaveClass("active");

    // Check if "Сухе" is no longer active
    const suheOption = screen.getByText("Сухе");
    expect(suheOption).not.toHaveClass("active");

    // Click on "Термозахист" option
    const termozahistOption = screen.getByText("Термозахист");
    fireEvent.click(termozahistOption);

    // Check if "Термозахист" becomes active
    expect(termozahistOption).toHaveClass("active");

    // Check if "Фабоване" is no longer active
    expect(fabovaneOption).not.toHaveClass("active");
  });
});
