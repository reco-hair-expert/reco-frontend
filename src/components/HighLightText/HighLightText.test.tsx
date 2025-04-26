import React from "react";
import { render, screen } from "@testing-library/react";
import HighlightText from "./HighLightText";

describe("HighlightText Component", () => {
  it("renders children correctly", () => {
    const testText = "Test Highlight Text";
    render(<HighlightText>{testText}</HighlightText>);
    expect(screen.getByText(testText)).toBeInTheDocument();
  });

  it("applies highlight class", () => {
    const testText = "Test Highlight Text";
    const { container } = render(<HighlightText>{testText}</HighlightText>);
    const highlightElement = container.querySelector(".highlight");
    expect(highlightElement).toBeInTheDocument();
  });

  it("renders with multiple children", () => {
    render(
      <HighlightText>
        <span>First</span>
        <span>Second</span>
      </HighlightText>
    );
    expect(screen.getByText("First")).toBeInTheDocument();
    expect(screen.getByText("Second")).toBeInTheDocument();
  });
});
