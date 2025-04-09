"use client";

import Image from "next/image";
import { HeroSectionProps } from "./types/HeroSection.types";
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
              <HighlightText>RECO</HighlightText> <br /> бренд створений з
              любовью до волосся
            </h1>
            <div className={styles.imageContainer}>
              <Image
                src="/images/sections/hero/hero-desc-1x.png"
                alt="RECO продукція"
                width={600}
                height={400}
                priority
                quality={85}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSAkKCAkKCAkKCAkKCAkKCAkKCAkKCAkKCAkKCAkKCAkKCAkKCAkKCD/2wBDARUXFy4eHhs4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4OD/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={styles.heroImage}
              />
            </div>

            <p className={styles.text}>
              Кожен заслуговує на здорове, сильне та блискуче волосся <br />
              <HighlightText>RECO</HighlightText> — це інструмент, який дарує
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
