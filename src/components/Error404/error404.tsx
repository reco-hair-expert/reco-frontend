import styles from "./error404.module.scss";
import Link from "next/link"; 
import Icon from "@/components/Icon/Icon";
import Image from "next/image"; 
import BackgroundCircles from "../BackgroundCircles/BackgroundCircles";

const Error404 = () => {
  return (
    <div className={styles.container}>
      <BackgroundCircles className={styles.backgroundCirclesLeft} />

      <div className={styles.placeholder}>
        <div className={styles.title}>
          <span className={styles.four}>4</span>
          <picture>
            <Image
              src="/images/sections/error/reco-every_day-1x.png"
              alt="RECO продукція"
              className={styles.image}
              width={500} // Указываем размеры изображения
              height={500} // Указываем размеры изображения
              sizes="(max-width: 768px) 100vw, 500px" // Для оптимизации под разные экраны
            />
          </picture>
          <span className={styles.four}>4</span>
        </div>
        <p className={styles.text}>
          Ой! Ця сторінка явно переживає день неслухняного волосся!
        </p>
        <div className={styles.btnContainer}>
          <Link href="/" passHref>
            <div className={styles.homeBtn}>
              <div className={styles.iconContainer}>
                <Icon
                  name="icon-arrow-up-right2"
                  fill="white"
                  stroke="none"
                  className={styles.homeBtnIcon}
                />
              </div>
              <span className={styles.homeBtnText}> Назад до головної</span>
            </div>
          </Link>
          <Link href="/catalog" passHref>
            <p className={styles.catalogBtn}>каталог</p>
          </Link>
        </div>
      </div>
      <BackgroundCircles className={styles.backgroundCirclesRight} />
    </div>
  );
};

export default Error404;
