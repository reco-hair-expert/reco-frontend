import React from "react";
import { render, screen } from "@testing-library/react";
import CatalogCardList from "./CatalogCardList";

// Mock the CatalogCard component
jest.mock("../CatalogCard/CatalogCard", () => {
  return function MockCatalogCard({ product, perRow }: any) {
    return (
      <div
        data-testid="catalog-card"
        data-product-id={product.id}
        data-per-row={perRow}
      >
        {product.name}
      </div>
    );
  };
});

describe("CatalogCardList Component", () => {
  const mockProducts = [
    {
      id: 1,
      name: "Product 1",
      photo: "/product1.jpg",
      sizes: { S: 100, M: 120, L: 140 },
      volume: "500ml",
      description: "Product 1 description",
      type: "Сухе"
    },
    {
      id: 2,
      name: "Product 2",
      photo: "/product2.jpg",
      sizes: { S: 150, M: 170, L: 190 },
      volume: "750ml",
      description: "Product 2 description",
      type: "Сухе"
    },
    {
      id: 3,
      name: "Product 3",
      photo: "/product3.jpg",
      sizes: { S: 200, M: 220, L: 240 },
      volume: "1L",
      description: "Product 3 description",
      type: "Сухе"
    }
  ];

  it("renders the correct number of catalog cards", () => {
    render(<CatalogCardList products={mockProducts} perRow={3} />);

    const cards = screen.getAllByTestId("catalog-card");
    expect(cards).toHaveLength(mockProducts.length);
  });

  it("passes the correct perRow prop to each card", () => {
    render(<CatalogCardList products={mockProducts} perRow={4} />);

    const cards = screen.getAllByTestId("catalog-card");
    cards.forEach((card) => {
      expect(card).toHaveAttribute("data-per-row", "4");
    });
  });

  it("passes the correct product data to each card", () => {
    render(<CatalogCardList products={mockProducts} perRow={3} />);

    const cards = screen.getAllByTestId("catalog-card");

    cards.forEach((card, index) => {
      const product = mockProducts[index];
      expect(card).toHaveAttribute("data-product-id", product.id.toString());
      expect(card).toHaveTextContent(product.name);
    });
  });

  it("renders an empty list when no products are provided", () => {
    render(<CatalogCardList products={[]} perRow={3} />);

    const cards = screen.queryAllByTestId("catalog-card");
    expect(cards).toHaveLength(0);
  });
});
