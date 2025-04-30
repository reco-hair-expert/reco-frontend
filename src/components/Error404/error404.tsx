import styles from "./error404.module.scss";
import Link from "next/link";
import Icon from "@/components/Icon/Icon";
import Image from "next/image";
import BackgroundCircles from "../BackgroundCircles/BackgroundCircles";
import { memo } from "react";

const Error404 = () => {
  return (
    <main className={styles.container} role="main">
      <BackgroundCircles
        aria-hidden="true"
        className={styles.backgroundCirclesLeft}
      />

      <div className={styles.placeholder}>
        <div aria-level={1} className={styles.title} role="heading">
          <span aria-hidden="true" className={styles.four}>
            4
          </span>
          <picture>
            <Image
              priority
              alt="RECO продукція"
              className={styles.image}
              height={170}
              quality={90}
              sizes="(max-width: 768px) 100px, 170px"
              src="/images/sections/error/reco-every_day-1x.png"
              width={170}
            />
          </picture>
          <span aria-hidden="true" className={styles.four}>
            4
          </span>
        </div>
        <p className={styles.text}>
          Ой! Ця сторінка явно переживає день неслухняного волосся!
        </p>
        <nav className={styles.btnContainer}>
          <Link className={styles.homeBtn} href="/">
            <div className={styles.iconContainer}>
              <Icon
                aria-hidden="true"
                className={styles.homeBtnIcon}
                fill="white"
                name="icon-arrow-up-right2"
                stroke="none"
              />
            </div>
            <span className={styles.homeBtnText}>Назад до головної</span>
          </Link>
          <Link className={styles.catalogBtn} href="/catalog">
            каталог
          </Link>
        </nav>
      </div>
      <BackgroundCircles
        aria-hidden="true"
        className={styles.backgroundCirclesRight}
      />
    </main>
  );
};

export default memo(Error404);
