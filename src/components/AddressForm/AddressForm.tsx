import styles from "./AddressForm.module.scss";
import type { AddressFormProps } from "./types/AddressForm.types";
import Image from "next/image";

const PAYMENT_ICON = {
  src: "/images/sections/footer/visa-mastercard.svg",
  alt: "Visa and Mastercard payment options",
  width: 100,
  height: 40
};

const AddressForm = ({
  className,
  phoneNumber,
  email,
  address
}: AddressFormProps) => {
  const combinedClass = className
    ? `${styles.header} ${className}`
    : styles.header;

  return (
    <div className={`${combinedClass} ${styles.address_form_container}`}>
      <div className={styles.info_item}>{address}</div>

      <div className={styles.info_item}>
        <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
      </div>

      <div className={styles.info_item}>
        <a href={`mailto:${email}`}>{email}</a>
      </div>

      <div className={styles.payment_icon_container}>
        <Image
          alt={PAYMENT_ICON.alt}
          className={styles.payment_icon}
          height={PAYMENT_ICON.height}
          src={PAYMENT_ICON.src}
          width={PAYMENT_ICON.width}
        />
      </div>
    </div>
  );
};

export default AddressForm;
