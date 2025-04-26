import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CartItems from "./CartItems";
import { CartContext } from "@/context/CartContext";
import { CartItem, Product } from "@/types/types";

// Mock the Image component from Next.js
jest.mock("next/image", () => {
  return function MockImage({ alt, width, height, className }: { src: string; alt: string; width: number; height: number; className?: string }) {
    return (
      <div
        data-testid="mock-image"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          backgroundColor: "#ccc",
        }}
        className={className}
      >
        <span>{alt}</span>
      </div>
    );
  };
});

// Mock the HighlightText component
jest.mock("@/components/HighLightText/HighLightText", () => {
  return function MockHighlightText({
    children
  }: {
    children: React.ReactNode;
  }) {
    return <div data-testid="highlight-text">{children}</div>;
  };
});

describe("CartItems Component", () => {
  const mockRemoveFromCart = jest.fn();
  const mockUpdateCartItemQuantity = jest.fn();
  const mockAddToCart = jest.fn();

  const mockProduct: Product = {
    id: 1,
    name: "Test Product",
    volume: "100ml",
    photo: "/test-image.jpg",
    description: "Test description",
    sizes: [
      { _id: "1", size: "100ml", price: 100 }, 
      { _id: "2", size: "200ml", price: 180 }
    ],
    type: "test"
  };

  const mockCartItems: CartItem[] = [
    {
      product: mockProduct,
      quantity: 2,
      size: "100ml"
    },
    {
      product: { ...mockProduct, id: 2, name: "Test Product 2" },
      quantity: 1,
      size: "200ml"
    }
  ];

  const renderWithCartContext = (cartItems: CartItem[] = []) => {
    return render(
      <CartContext.Provider
        value={{
          cartItems,
          addToCart: mockAddToCart,
          removeFromCart: mockRemoveFromCart,
          updateCartItemQuantity: mockUpdateCartItemQuantity,
          cartTotal: 0,
          cartCount: cartItems.reduce((sum, item) => sum + item.quantity, 0)
        }}
      >
        <CartItems />
      </CartContext.Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders empty cart message when cart is empty", () => {
    renderWithCartContext([]);
    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
  });

  it("renders cart items when cart is not empty", () => {
    renderWithCartContext(mockCartItems);

    // Check if product names are rendered
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("Test Product 2")).toBeInTheDocument();

    // Check if product descriptions are rendered
    const descriptions = screen.getAllByText("Test description");
    expect(descriptions).toHaveLength(2);
    expect(descriptions[0]).toBeInTheDocument();
    expect(descriptions[1]).toBeInTheDocument();

    // Check if product images are rendered
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute("src", "/test-image.jpg");
    expect(images[0]).toHaveAttribute("alt", "Test Product");
  });

  it("displays correct quantity for each item", () => {
    renderWithCartContext(mockCartItems);

    // Check if quantities are displayed correctly
    expect(screen.getByText("2")).toBeInTheDocument(); // First item quantity
    expect(screen.getByText("1")).toBeInTheDocument(); // Second item quantity
  });

  it("displays correct size and price for each item", () => {
    renderWithCartContext(mockCartItems);

    // Check if sizes are displayed
    expect(screen.getByText("100ml")).toBeInTheDocument();
    expect(screen.getByText("200ml")).toBeInTheDocument();

    // Check if prices are displayed
    expect(screen.getByText("100 грн")).toBeInTheDocument();
    expect(screen.getByText("180 грн")).toBeInTheDocument();
  });

  it("calls removeFromCart when remove button is clicked", () => {
    renderWithCartContext(mockCartItems);

    // Find and click the remove button for the first item
    const removeButtons = screen.getAllByText("X");
    fireEvent.click(removeButtons[0]);

    // Check if removeFromCart was called with correct parameters
    expect(mockRemoveFromCart).toHaveBeenCalledWith(1, "100ml");
  });

  it("calls updateCartItemQuantity when decrease button is clicked", () => {
    renderWithCartContext(mockCartItems);

    // Find and click the decrease button for the first item
    const decreaseButtons = screen.getAllByText("-");
    fireEvent.click(decreaseButtons[0]);

    // Check if updateCartItemQuantity was called with correct parameters
    expect(mockUpdateCartItemQuantity).toHaveBeenCalledWith(1, 1, "100ml");
  });

  it("calls addToCart when increase button is clicked", () => {
    renderWithCartContext(mockCartItems);

    // Find and click the increase button for the first item
    const increaseButtons = screen.getAllByText("+");
    fireEvent.click(increaseButtons[0]);

    // Check if addToCart was called with correct parameters
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct, "100ml");
  });

  it("does not decrease quantity below 1", () => {
    // Create a cart item with quantity 1
    const singleItemCart: CartItem[] = [
      {
        product: mockProduct,
        quantity: 1,
        size: "100ml"
      }
    ];

    renderWithCartContext(singleItemCart);

    // Find and click the decrease button
    const decreaseButton = screen.getByText("-");
    fireEvent.click(decreaseButton);

    // Check that updateCartItemQuantity was not called
    expect(mockUpdateCartItemQuantity).not.toHaveBeenCalled();
  });
});
