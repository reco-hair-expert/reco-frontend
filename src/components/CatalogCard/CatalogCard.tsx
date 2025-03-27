// import Image from "next/image";
import styles from "./CatalogCard.module.scss";
import Link from "next/link";
import Icon from "../Icon/Icon";
import { CatalogCardProps } from "./types/CatalogCard.types";

const CatalogCard = ({ perRow }: CatalogCardProps) => {
  return (
    <div
      className={styles.card}
      style={{
        width: `calc((100% - 20px * ${perRow - 1}) / ${perRow})`
      }}
    >
      {/* <div className={styles.imageContainer}>
        <Image src="/asd.png" alt="reco" width="400" height="300" />
      </div> */}
      <div className={styles.badgeContainer}>
        <span className={styles.saleBadge}>bestseller</span>
        <span className={styles.typeBadge}>Сухе</span>
      </div>

      <Link href="/" className={styles.infoBtn}>
        <Icon name="icon-info" className={styles.infoBtnIcon} />
      </Link>

      <div className={styles.productDetailsContainer}>
        <header className={styles.infoContainer}>
          <h3 className={styles.productName}>REC ON Booster </h3>
          <span className={styles.productPrice}>2600грн</span>
        </header>
        <div>
          <p className={styles.productType}>Спрей - реконструктор</p>
          <form className={styles.productSizeForm}>
            <label className={styles.productSizeFormLabel}>
              <input
                type="radio"
                name="size"
                value="300"
                className={styles.sizeInput}
              />
              300 ml
            </label>
            <label className={styles.productSizeFormLabel}>
              <input
                type="radio"
                name="size"
                value="400"
                className={styles.sizeInput}
              />
              400 ml
            </label>
            <label className={styles.productSizeFormLabel}>
              <input
                type="radio"
                name="size"
                value="100"
                className={styles.sizeInput}
              />
              100 ml
            </label>
            <label className={styles.productSizeFormLabel}>
              <input
                type="radio"
                name="size"
                value="200"
                className={styles.sizeInput}
              />
              200 ml
            </label>
          </form>
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
