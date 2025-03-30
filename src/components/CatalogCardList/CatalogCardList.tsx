import CatalogCard from "../CatalogCard/CatalogCard";
import { CatalogCardListProps } from "./types/CatalogCardList.types";

const CatalogCardList = ({ products, perRow }: CatalogCardListProps) => {
  return (
    <>
      {products.map((product) => {
        return (
          <CatalogCard perRow={perRow} product={product} key={product.id} />
        );
      })}
    </>
  );
};

export default CatalogCardList;
