import classNames from "classnames";
import type { FeaturesSectionProps } from "./types/FeaturesSection.types";
import Image from "next/image";
import styles from "./FeaturesSection.module.scss";
import HighlightText from "../HighLightText/HighLightText";
import BackgroundCircles from "../BackgroundCircles/BackgroundCircles";

const FeaturesSection = ({ className }: FeaturesSectionProps) => {
  const classes = classNames(styles.featuresSection, className);

  return (
    <section className="container" data-testid="features-section">
      <div className={classes}>
        <BackgroundCircles className={styles.backgroundCircles} />
        <h2>Особливості продукту</h2>

        <div className={styles.featuresLeftSide}>
          <article className={styles.featuresArticleLeft}>
            <h3>Турбота</h3>
            <p className={styles.featuresArticleLeftText}>
              <HighlightText>Турбота </HighlightText>
              про волосся навіть у разі сильного пошкодження.
            </p>
          </article>

          {/* <a href="/about">Про нас</a> */}
        </div>

        <div className={styles.featuresImgContainer}>
          <Image
            fill
            alt="recoil"
            src="/images/sections/features/recoil.png"
            style={{ objectFit: "contain" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className={styles.featuresRightSide}>
          <article className={styles.featuresArticleRightTop}>
            <h3>Простота у використанні</h3>
            <p className={styles.featuresArticleRightTopText}>
              Ідеальний вибір як{" "}
              <HighlightText>для професійних майстрів</HighlightText>, так і{" "}
              <HighlightText>для домашнього догляду</HighlightText>. Зручне та
              зрозуміле використання без зайвих зусиль.
            </p>
          </article>

          <article className={styles.featuresArticleRightBottom}>
            <p className={styles.featuresArticleRightBottomText}>
              Комплексний догляд RECO — це{" "}
              <HighlightText>захист, зволоження та живлення</HighlightText>{" "}
              волосся щодня.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
