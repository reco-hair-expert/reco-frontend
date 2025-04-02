import Image from "next/image";
import styles from "./CatalogCard.module.scss";
import Link from "next/link";
import Icon from "../Icon/Icon";
import { CatalogCardProps } from "./types/CatalogCard.types";

const CatalogCard = ({ perRow, product }: CatalogCardProps) => {
  const renderSizes = () => (
    <>
      {Object.keys(product.sizes || {}).length ? (
        Object.keys(product.sizes).map((size) => (
          <label className={styles.productSizeFormLabel} key={size}>
            <input
              type="radio"
              name="size"
              value={size}
              className={styles.sizeInput}
            />
            {size}
          </label>
        ))
      ) : (
        <div>Розміри не доступні для цього товару.</div>
      )}
    </>
  );
  return (
    <div
      className={styles.card}
      style={{
        width: `calc((100% - 20px * ${perRow - 1}) / ${perRow})`
      }}
    >
      <div className={styles.imageContainer}>
        <Image
          src={product.photoProduct || "/fallback-image.jpg"}
          alt="reco"
          width={400}
          height={300}
        />
      </div>
      <div className={styles.badgeContainer}>
        <span className={styles.saleBadge}>bestseller</span>
        <span className={styles.typeBadge}>Сухе</span>
      </div>

      <Link href="/" className={styles.infoBtn}>
        <Icon name="icon-info" className={styles.infoBtnIcon} />
      </Link>

      <div className={styles.productDetailsContainer}>
        <header className={styles.infoContainer}>
          <h3 className={styles.productName}>{product.name} </h3>
          <span className={styles.productPrice}>{product.price}грн</span>
        </header>
        <div className={styles.productAction}>
          <p className={styles.productType}>Спрей - реконструктор</p>
          <form className={styles.productSizeForm}>{renderSizes()}</form>
          <div className={styles.productBtnContainer}>
            <button className={styles.buyBtn}>Купити</button>
            <button className={styles.toCartBtn}>В кошик</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogCard;
