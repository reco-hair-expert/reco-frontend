import React from "react";
import { render, screen } from "@testing-library/react";
import FeedbackSection from "./FeedbackSection";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  }
}));

// Mock the BackgroundCircles component
jest.mock("../BackgroundCircles/BackgroundCircles", () => {
  return ({ className }: any) => {
    return <div data-testid="background-circles" className={className} />;
  };
});

// Mock the FeedbackForm component
jest.mock("../FeedbackForm/FeedbackForm", () => {
  return () => {
    return <div data-testid="feedback-form" />;
  };
});

describe("FeedbackSection Component", () => {
  it("renders the feedback section with all elements", () => {
    render(<FeedbackSection />);

    // Check section structure
    const section = screen.getByTestId("feedback-section");
    expect(section).toBeInTheDocument();

    // Check title
    const title = screen.getByRole("heading", { level: 2 });
    expect(title).toHaveTextContent(
      "Залиште свої дані, щоб отримати більше інформації"
    );

    // Check background circles
    const backgroundCircles = screen.getByTestId("background-circles");
    expect(backgroundCircles).toBeInTheDocument();

    // Check form
    const form = screen.getByTestId("feedback-form");
    expect(form).toBeInTheDocument();

    // Check image
    const image = screen.getByAltText("recoil");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      "/images/sections/feedback/recoil.png"
    );
  });
});
