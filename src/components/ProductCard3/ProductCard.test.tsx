import React from "react";
import { render, screen, fireEvent } from "../../test/test-utils";
import ProductCard from "./ProductCard";
import { CartContext } from "@/context/CartContext";

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

// Mock react-spring-3d-carousel
jest.mock("react-spring-3d-carousel", () => {
  return function MockCarousel({ slides }: any) {
    return (
      <div data-testid="mock-carousel">
        {slides.map((slide: any) => slide.content)}
      </div>
    );
  };
});

// Mock components
jest.mock("../HighLightText/HighLightText", () => {
  return function MockHighlightText({ children }: any) {
    return <span data-testid="mock-highlight">{children}</span>;
  };
});

jest.mock("../Button/Button", () => {
  return function MockButton({ children, onClick }: any) {
    return <button onClick={onClick}>{children}</button>;
  };
});

jest.mock("../ArowButton/ArowButton", () => {
  return function MockButtonArrow({ onClick }: any) {
    return <button onClick={onClick}>Arrow</button>;
  };
});

jest.mock("../Icon/Icon", () => {
  return function MockIcon({ name, size, fill, stroke }: any) {
    return <div data-testid="mock-icon">{name}</div>;
  };
});

describe("ProductCard Component", () => {
  const mockProducts = [
    {
      id: 1,
      name: "Product 1",
      volume: "100ml",
      photo: "/test-image-1.jpg",
      description: "Test description 1",
      sizes: { S: 100, M: 200, L: 300 },
      type: "test",
      isNew: true,
      badgeInfo: "Special offer"
    },
    {
      id: 2,
      name: "Product 2",
      volume: "200ml",
      photo: "/test-image-2.jpg",
      description: "Test description 2",
      sizes: { S: 150, M: 250, L: 350 },
      type: "test"
    }
  ];

  const renderWithContext = (products = mockProducts) => {
    return render(
      <CartContext.Provider
        value={{
          cartItems: [],
          cartTotal: 0,
          cartCount: 0,
          addToCart: jest.fn(),
          removeFromCart: jest.fn(),
          updateCartItemQuantity: jest.fn()
        }}
      >
        <ProductCard products={products} />
      </CartContext.Provider>
    );
  };

  beforeEach(() => {
    // Mock localStorage
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn(),
      removeItem: jest.fn(),
      key: jest.fn(),
      length: 0
    };
    global.localStorage = localStorageMock as unknown as Storage;
  });

  it("renders product card with initial product", () => {
    renderWithContext();
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Test description 1")).toBeInTheDocument();
  });

  it("shows NEW badge for new products", () => {
    renderWithContext();
    expect(screen.getByText("NEW")).toBeInTheDocument();
  });

  it("shows info badge when badgeInfo is present", () => {
    renderWithContext();
    const icons = screen.getAllByTestId("mock-icon");
    expect(
      icons.find((icon) => icon.textContent === "icon-info")
    ).toBeInTheDocument();
  });

  it("renders size options", () => {
    renderWithContext();
    expect(screen.getByLabelText("S")).toBeInTheDocument();
    expect(screen.getByLabelText("M")).toBeInTheDocument();
    expect(screen.getByLabelText("L")).toBeInTheDocument();
  });

  it("allows size selection", () => {
    renderWithContext();
    const sizeInput = screen.getByLabelText("M");
    fireEvent.click(sizeInput);
    expect(sizeInput).toBeChecked();
  });

  it("shows alert when trying to add to cart without size selection", () => {
    const mockAlert = jest.spyOn(window, "alert").mockImplementation(() => {});
    renderWithContext();
    fireEvent.click(screen.getByText("ДОДАТИ В КОШИК"));
    expect(mockAlert).toHaveBeenCalledWith("Будь ласка, виберіть розмір!");
    mockAlert.mockRestore();
  });

  it("adds product to cart when size is selected", () => {
    const mockAddToCart = jest.fn();
    render(
      <CartContext.Provider
        value={{
          cartItems: [],
          cartTotal: 0,
          cartCount: 0,
          addToCart: mockAddToCart,
          removeFromCart: jest.fn(),
          updateCartItemQuantity: jest.fn()
        }}
      >
        <ProductCard products={mockProducts} />
      </CartContext.Provider>
    );

    fireEvent.click(screen.getByLabelText("M"));
    fireEvent.click(screen.getByText("ДОДАТИ В КОШИК"));
    expect(mockAddToCart).toHaveBeenCalledWith(mockProducts[0], "M");
  });

  it("navigates between products", () => {
    renderWithContext();
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    const arrows = screen.getAllByText("Arrow");
    fireEvent.click(arrows[1]); // Click the next arrow
    expect(screen.getByText("Product 2")).toBeInTheDocument();
  });
});
