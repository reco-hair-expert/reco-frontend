import styles from "./AddressForm.module.scss";
import type { AddressFormProps } from "./types/AddressForm.types";

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
    </div>
  );
};

export default AddressForm;
