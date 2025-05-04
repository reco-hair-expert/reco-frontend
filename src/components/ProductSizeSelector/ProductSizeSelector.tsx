// components/ProductSizeSelector.tsx
import React from "react";
import styles from "./ProductSizeSelector.module.scss";

interface ProductSizeSelectorProps {
  sizes: { size: string; price: number }[];
  selectedSize: string | null;
  onSizeChange: (size: string) => void;
}

const ProductSizeSelector: React.FC<ProductSizeSelectorProps> = ({
  sizes,
  selectedSize,
  onSizeChange
}) => {
  if (!sizes.length) {
    return <div>Розміри не доступні для цього товару.</div>;
  }

  const selectedIndex = sizes.findIndex(({ size }) => size === selectedSize);
  const selectionWidth =
    selectedIndex >= 0
      ? `${((selectedIndex + 1) / sizes.length) * 100}%`
      : "0%";
  const selectionLeft = selectedIndex >= 0 ? "0%" : "0%";

  return (
    <div className={styles.radioInput}>
      {sizes.map(({ size }) => (
        <label
          key={size}
          className={selectedSize === size ? styles.filled : ""}
        >
          <input
            checked={selectedSize === size}
            name="size"
            type="radio"
            value={size}
            onChange={() => onSizeChange(size)}
          />
          <span>{size}</span>
        </label>
      ))}
      <div
        className={styles.selection}
        style={{ width: selectionWidth, left: selectionLeft }}
      />
    </div>
  );
};
export default ProductSizeSelector;
