import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CartButton from "./CartButton";
import { CartContext } from "@/context/CartContext";
import type { CartItem } from "@/types/types";

// Mock the Icon component
jest.mock("@/components/Icon/Icon", () => {
  return function MockIcon({ name }: { name: string }) {
    return <div data-testid={`icon-${name}`}>Icon</div>;
  };
});

describe("CartButton Component", () => {
  const mockOnClick = jest.fn();

  const renderWithCartContext = (cartItems: CartItem[] = [], props = {}) => {
    return render(
      <CartContext.Provider
        value={{
          cartItems,
          addToCart: jest.fn(),
          removeFromCart: jest.fn(),
          updateCartItemQuantity: jest.fn(),
          cartTotal: 0,
          cartCount: cartItems.reduce((sum, item) => sum + item.quantity, 0)
        }}
      >
        <CartButton cart={cartItems} {...props} />
      </CartContext.Provider>
    );
  };

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it("renders with cart icon", () => {
    renderWithCartContext();
    const icon = screen.getByTestId("icon-icon-cart");
    expect(icon).toBeInTheDocument();
  });

  it("renders with correct accessibility attributes", () => {
    renderWithCartContext([], { "aria-label": "Shopping cart" });
    const button = screen.getByRole("button", { name: /shopping cart/i });
    expect(button).toBeInTheDocument();
  });

  it("shows correct number of items in cart", () => {
    const cartItems = [
      {
        product: {
          id: 1,
          name: "Test",
          volume: "100ml",
          photo: "",
          description: "",
          sizes: {},
          type: "test"
        },
        quantity: 2
      },
      {
        product: {
          id: 2,
          name: "Test 2",
          volume: "200ml",
          photo: "",
          description: "",
          sizes: {},
          type: "test"
        },
        quantity: 3
      }
    ];
    renderWithCartContext(cartItems);
    const badge = screen.getByText("5");
    expect(badge).toBeInTheDocument();
  });

  it("does not show badge when cart is empty", () => {
    renderWithCartContext([]);
    const badge = screen.queryByText("0");
    expect(badge).not.toBeInTheDocument();
  });

  it("handles click events", () => {
    const cartItems = [
      {
        product: {
          id: 1,
          name: "Test",
          volume: "100ml",
          photo: "",
          description: "",
          sizes: {},
          type: "test"
        },
        quantity: 1
      }
    ];
    renderWithCartContext(cartItems, { onClick: mockOnClick });
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("applies custom className correctly", () => {
    const customClass = "custom-class";
    renderWithCartContext([], { className: customClass });
    const button = screen.getByRole("button");
    expect(button).toHaveClass(customClass);
  });

  it("is disabled when cart is empty", () => {
    renderWithCartContext([]);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveClass("disabled");
  });

  it("is enabled when cart has items", () => {
    const cartItems = [
      {
        product: {
          id: 1,
          name: "Test",
          volume: "100ml",
          photo: "",
          description: "",
          sizes: {},
          type: "test"
        },
        quantity: 1
      }
    ];
    renderWithCartContext(cartItems);
    const button = screen.getByRole("button");
    expect(button).not.toBeDisabled();
    expect(button).not.toHaveClass("disabled");
  });
});
