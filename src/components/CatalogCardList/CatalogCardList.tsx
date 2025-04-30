import CatalogCard from "../CatalogCard/CatalogCard";
import type { CatalogCardListProps } from "./types/CatalogCardList.types";

const CatalogCardList = ({ products, perRow }: CatalogCardListProps) => {
  return (
    <>
      {products.map((product) => {
        return (
          <CatalogCard key={product.id} perRow={perRow} product={product} />
        );
      })}
    </>
  );
};

export default CatalogCardList;
