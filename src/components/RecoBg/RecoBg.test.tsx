import React from "react";
import { render, screen } from "@testing-library/react";
import RecoBg from "./RecoBg";

describe("RecoBg Component", () => {
  it("renders the background with all word layers", () => {
    render(<RecoBg />);

    // Check if all word layers are rendered
    const wordLayers = screen.getAllByText("RECO");
    expect(wordLayers).toHaveLength(7);

    // Check if each layer has correct z-index
    wordLayers.forEach((layer, index) => {
      expect(layer).toHaveStyle({ zIndex: 7 - index });
    });
  });

  it("renders children when provided", () => {
    const testChild = <div data-testid="test-child">Test Content</div>;
    render(<RecoBg>{testChild}</RecoBg>);

    expect(screen.getByTestId("test-child")).toBeInTheDocument();
  });

  it("applies custom className when provided", () => {
    render(<RecoBg className="custom-class" data-testid="reco-bg" />);

    const background = screen.getByTestId("reco-bg");
    expect(background).toHaveClass("custom-class");
  });

  it("applies default className when no custom className is provided", () => {
    render(<RecoBg data-testid="reco-bg" />);

    const background = screen.getByTestId("reco-bg");
    expect(background).toHaveClass("background");
  });
});
