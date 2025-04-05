import Icon from "@/components/Icon/Icon";
import styles from "./InputLabel.module.scss";
import { InputLabelProps } from "./types/InputLabel.types";

const InputLabel = ({ htmlFor, children, required }: InputLabelProps) => {
  return (
    <label htmlFor={htmlFor} className={styles.inputLabel}>
      {children}
      {required && (
        <Icon
          className={styles.inputIconStar}
          name="icon-star"
          stroke="#fbc000"
          size={20}
        />
      )}
    </label>
  );
};

export default InputLabel;
