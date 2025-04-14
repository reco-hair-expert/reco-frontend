import React from "react";
import { render, screen } from "@testing-library/react";
import FooterLinks from "./FooterLink";

// Mock next/link
jest.mock("next/link", () => {
  return ({ children, href, className, ariaLabel }: any) => {
    return (
      <a href={href} className={className} aria-label={ariaLabel || children}>
        {children}
      </a>
    );
  };
});

describe("FooterLinks Component", () => {
  const expectedLinks = [
    { title: "Каталог", link: "/" },
    { title: "Про нас", link: "/about" },
    { title: "Контакти", link: "/contacts" },
    { title: "Відгуки", link: "/feedback" }
  ];

  it("renders all footer links", () => {
    render(<FooterLinks />);
    expectedLinks.forEach(({ title, link }) => {
      const linkElement = screen.getByText(title);
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute("href", link);
    });
  });

  it("applies correct classes", () => {
    const { container } = render(<FooterLinks />);
    expect(container.firstChild).toHaveClass("footerLinks");

    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).toHaveClass("footerLink");
    });
  });

  it("sets correct aria-labels", () => {
    const { container } = render(<FooterLinks />);
    console.log("Rendered HTML:", container.innerHTML);

    expectedLinks.forEach(({ title }) => {
      const link = screen.getByText(title);
      expect(link).toBeInTheDocument();
      expect(link.getAttribute("aria-label")).toBe(title);
    });
  });
});
