"use client";

import Image from "next/image";
import type { HeroSectionProps } from "./types/HeroSection.types";
import styles from "./HeroSection.module.scss";
import RecoBg from "../RecoBg/RecoBg";
import HeroButtons from "../HeroButtons/HeroButtons";
import HighlightText from "../HighLightText/HighLightText";

const HeroSection = ({ className }: HeroSectionProps) => {
  const combinedClass = className
    ? `${styles.heroSection} ${className}`
    : styles.heroSection;

  return (
    <section className="container">
      <div className={combinedClass} data-testid="hero-section">
        <RecoBg />
        <article className={styles.mainContent}>
          <div className={styles.textField}>
            <h1 className={styles.slogan}>
              <HighlightText>RECO</HighlightText> —  бренд створений з любов'ю
              до волосся
            </h1>
            <div className={styles.imageContainer}>
              <Image
                priority
                alt="RECO продукція"
                className={styles.heroImage}
                height={400}
                quality={85}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                src="/images/sections/hero/hero-desc-1x.png"
                width={600}
              />
            </div>

            <p className={styles.text}>
              Кожен заслуговує на здорове, сильне та блискуче волосся
              <HighlightText> RECO</HighlightText> —  інструмент, який дарує
              нове життя вашому волоссю
            </p>
            <HeroButtons />
          </div>
        </article>
      </div>
    </section>
  );
};

export default HeroSection;
