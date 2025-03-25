import { ProductCard } from "@/components/ProductCard/ProductCard";
import { products } from "@/constants/products";

export default function Catalog() {
  return (
    <div>
      <ProductCard products={products} />
    </div>
  );
}
