import FeedbackForm from "../FeedbackForm/FeedbackForm";
import "@/styles/index.scss";
import styles from "./FeedbackSection.module.scss";
import BackgroundCircles from "../BackgroundCircles/BackgroundCircles";
import Image from "next/image";

const FeedbackSection = () => {
  return (
      <div className={styles.feedbackSection}>
        <div className={styles.formCirclesContainer}>
          <div className={styles.formCircles} />
        </div>
        <BackgroundCircles className={styles.backgroundCircles} />
        <div className={styles.feedbackArrow} />
        <h2 className={styles.feedbackTitle}>
          Залиште свої дані, щоб отримати більше інформації
        </h2>
        <div className={styles.feedbackContent}>
          <FeedbackForm />
          <div className={styles.feedbackImgContainer}>
            <Image
              alt="recoil"
              className={styles.feedbackImg}
              fill={true}
              src="/images/sections/feedback/recoil.png"
            />
          </div>
        </div>
      </div>
  );
};

export default FeedbackSection;
