import React from "react";
import { render, screen } from "@testing-library/react";
import Error404 from "./error404";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  }
}));

// Mock next/link
jest.mock("next/link", () => {
  return ({ children, href }: any) => {
    return <a href={href}>{children}</a>;
  };
});

// Mock the Icon component
jest.mock("../Icon/Icon", () => {
  return ({ name, className }: any) => {
    return (
      <div data-testid={`icon-${name}`} className={className}>
        Icon
      </div>
    );
  };
});

// Mock the BackgroundCircles component
jest.mock("../BackgroundCircles/BackgroundCircles", () => {
  return ({ className, "aria-hidden": ariaHidden }: any) => {
    return (
      <div
        data-testid="background-circles"
        className={className}
        aria-hidden={ariaHidden}
      />
    );
  };
});

describe("Error404 Component", () => {
  it("renders the 404 error page with all elements", () => {
    render(<Error404 />);

    // Check main container
    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();

    // Check background circles
    const backgroundCircles = screen.getAllByTestId("background-circles");
    expect(backgroundCircles).toHaveLength(2);

    // Check title section
    const title = screen.getByRole("heading", { level: 1 });
    expect(title).toBeInTheDocument();

    // Check the 4s
    const fours = screen.getAllByText("4");
    expect(fours).toHaveLength(2);

    // Check the image
    const image = screen.getByAltText("RECO продукція");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      "/images/sections/error/reco-every_day-1x.png"
    );

    // Check the error message
    const errorText = screen.getByText(
      "Ой! Ця сторінка явно переживає день неслухняного волосся!"
    );
    expect(errorText).toBeInTheDocument();

    // Check navigation links
    const homeLink = screen.getByText("Назад до головної").closest("a");
    expect(homeLink).toHaveAttribute("href", "/");

    const catalogLink = screen.getByText("каталог");
    expect(catalogLink).toHaveAttribute("href", "/catalog");

    // Check icon
    const icon = screen.getByTestId("icon-icon-arrow-up-right2");
    expect(icon).toBeInTheDocument();
  });
});
