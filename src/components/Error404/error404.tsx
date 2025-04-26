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
        className={styles.backgroundCirclesLeft}
        aria-hidden="true"
      />

      <div className={styles.placeholder}>
        <div className={styles.title} role="heading" aria-level={1}>
          <span className={styles.four} aria-hidden="true">
            4
          </span>
          <picture>
            <Image
              src="/images/sections/error/reco-every_day-1x.png"
              alt="RECO продукція"
              className={styles.image}
              width={170}
              height={170}
              priority
              quality={90}
              sizes="(max-width: 768px) 100px, 170px"
            />
          </picture>
          <span className={styles.four} aria-hidden="true">
            4
          </span>
        </div>
        <p className={styles.text}>
          Ой! Ця сторінка явно переживає день неслухняного волосся!
        </p>
        <nav className={styles.btnContainer}>
          <Link href="/" className={styles.homeBtn}>
            <div className={styles.iconContainer}>
              <Icon
                name="icon-arrow-up-right2"
                fill="white"
                stroke="none"
                className={styles.homeBtnIcon}
                aria-hidden="true"
              />
            </div>
            <span className={styles.homeBtnText}>Назад до головної</span>
          </Link>
          <Link href="/catalog" className={styles.catalogBtn}>
            каталог
          </Link>
        </nav>
      </div>
      <BackgroundCircles
        className={styles.backgroundCirclesRight}
        aria-hidden="true"
      />
    </main>
  );
};

export default memo(Error404);
