import FeedbackForm from "../FeedbackForm/FeedbackForm";
import "@/styles/index.scss";
import styles from "./FeedbackSection.module.scss";
import BackgroundCircles from "../BackgroundCircles/BackgroundCircles";
import Image from "next/image";

const FeedbackSection = () => {
  return (
    <section className="container" data-testid="feedback-section">
      <div className={styles.feedbackSection}>
        <div className={styles.formCirclesContainer}>
          <div className={styles.formCircles}></div>
        </div>
        <BackgroundCircles className={styles.backgroundCircles} />
        <div className={styles.feedbackArrow}></div>
        <h2 className={styles.feedbackTitle}>
          Залиште свої дані, щоб отримати більше інформації
        </h2>
        <div className={styles.feedbackContent}>
          <FeedbackForm />
          <div className={styles.feedbackImgContainer}>
            <Image
              src="/images/sections/feedback/recoil.png"
              alt="recoil"
              fill
              className={styles.feedbackImg}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;
