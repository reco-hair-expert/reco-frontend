import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

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

// Mock the AddressForm component
jest.mock("../AddressForm/AddressForm", () => {
  return ({ address, phoneNumber, email }: any) => {
    return (
      <div data-testid="address-form">
        <div data-testid="address">{address}</div>
        <div data-testid="phone">{phoneNumber}</div>
        <div data-testid="email">{email}</div>
      </div>
    );
  };
});

// Mock the SocialMediaHub component
jest.mock("../SocialMediaHub/SocialMediaHub", () => {
  return ({ children }: any) => {
    return <div data-testid="social-media-hub">{children}</div>;
  };
});

// Mock the SocialMediaLinks component
jest.mock("../SocialMediaLinks/SocialMediaLinks", () => {
  return ({ platform }: any) => {
    return <div data-testid={`social-link-${platform}`} />;
  };
});

// Mock the FooterLinks component
jest.mock("../FooterLink/FooterLink", () => {
  return () => {
    return <div data-testid="footer-links" />;
  };
});

// Mock the contacts constants
jest.mock("@/constants/contacts", () => ({
  address: "Test Address",
  phoneNumber: "+380123456789",
  email: "test@example.com"
}));

describe("Footer Component", () => {
  it("renders the footer with all elements", () => {
    render(<Footer />);

    // Check logo
    const logo = screen.getByAltText("Логотип компании");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/images/logo/logo.svg");

    // Check footer links
    expect(screen.getByTestId("footer-links")).toBeInTheDocument();

    // Check address form
    const addressForm = screen.getByTestId("address-form");
    expect(addressForm).toBeInTheDocument();
    expect(screen.getByTestId("address")).toHaveTextContent("Test Address");
    expect(screen.getByTestId("phone")).toHaveTextContent("+380123456789");
    expect(screen.getByTestId("email")).toHaveTextContent("test@example.com");

    // Check social media hub
    const socialMediaHub = screen.getByTestId("social-media-hub");
    expect(socialMediaHub).toBeInTheDocument();
    expect(screen.getByTestId("social-link-instagram")).toBeInTheDocument();
    expect(screen.getByTestId("social-link-viber")).toBeInTheDocument();
    expect(screen.getByTestId("social-link-telegram")).toBeInTheDocument();

    // Check copyright text
    expect(screen.getByText(/© 2025 RECO/)).toBeInTheDocument();
  });

  it("applies custom className when provided", () => {
    render(<Footer className="custom-class" />);

    // Check if the custom class is applied
    const footer = screen.getByRole("contentinfo");
    expect(footer.querySelector(".custom-class")).toBeInTheDocument();
  });
});
