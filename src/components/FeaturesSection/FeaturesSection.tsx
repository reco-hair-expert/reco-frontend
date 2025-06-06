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
            <h3>Ефективність</h3>
            <p className={styles.featuresArticleLeftText}>
              <HighlightText>Ефективність </HighlightText>
              навіть для волосся з 5 ступенем пошкодження
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
          />
        </div>

        <div className={styles.featuresRightSide}>
          <article className={styles.featuresArticleRightTop}>
            <h3>Простота у використанні</h3>
            <p className={styles.featuresArticleRightTopText}>
              Простота у використанні: ідеально підходить як{" "}
              <HighlightText>для професійних майстрів</HighlightText>, так і
              <HighlightText> для домашнього догляду</HighlightText>
            </p>
          </article>

          <article className={styles.featuresArticleRightBottom}>
            <h3>Комплексний підхід</h3>
            <p className={styles.featuresArticleRightBottomText}>
              Комплексний підхід : RECO не лише відновлює, але й забезпечує{" "}
              <HighlightText>захист, зволоження та живлення</HighlightText>{" "}
              завдяки лінійці продуктів
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
