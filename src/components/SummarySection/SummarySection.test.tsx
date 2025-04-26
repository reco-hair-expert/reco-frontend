import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import SummarySection from "./SummarySection";

// Mock the next/navigation module
jest.mock("next/navigation", () => ({
  useRouter: jest.fn()
}));

// Mock the CartContext
jest.mock("@/context/CartContext", () => ({
  useCart: jest.fn()
}));

describe("SummarySection Component", () => {
  const mockRouter = {
    push: jest.fn()
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useCart as jest.Mock).mockReturnValue({
      cartItems: []
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders empty cart message when cart is empty", () => {
    render(<SummarySection />);
    expect(screen.getByText("ЗАМОВЛЕННЯ ВІДСУТНЄ")).toBeInTheDocument();
  });

  it("renders cart items when cart is not empty", () => {
    const mockCartItems = [
      {
        product: {
          id: "1",
          name: "Test Product",
          photo: "/test.jpg",
          sizes: {
            M: 100
          }
        },
        size: "M",
        quantity: 2
      }
    ];

    (useCart as jest.Mock).mockReturnValue({
      cartItems: mockCartItems
    });

    render(<SummarySection />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("M")).toBeInTheDocument();
    expect(screen.getByText("Кількість: 2")).toBeInTheDocument();
    expect(screen.getByText("100 грн")).toBeInTheDocument();
  });

  it("calculates and displays total correctly", () => {
    const mockCartItems = [
      {
        product: {
          id: "1",
          name: "Test Product",
          photo: "/test.jpg",
          sizes: {
            M: 100
          }
        },
        size: "M",
        quantity: 2
      }
    ];

    (useCart as jest.Mock).mockReturnValue({
      cartItems: mockCartItems
    });

    render(<SummarySection />);
    expect(screen.getByText("₴200")).toBeInTheDocument();
  });

  it("navigates to catalog when continue shopping button is clicked", () => {
    render(<SummarySection />);
    const continueButton = screen.getByText("ПРОДОВЖИТИ ПОКУПКИ");
    fireEvent.click(continueButton);
    expect(mockRouter.push).toHaveBeenCalledWith("/catalog");
  });

  it("shows alert when confirm order button is clicked", () => {
    const mockAlert = jest.spyOn(window, "alert").mockImplementation(() => {});
    render(<SummarySection />);
    const confirmButton = screen.getByText("Підтвердити замовлення");
    fireEvent.click(confirmButton);
    expect(mockAlert).toHaveBeenCalledWith("Замовлення підтверджено!");
    mockAlert.mockRestore();
  });
});
