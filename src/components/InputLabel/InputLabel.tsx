import Icon from "@/components/Icon/Icon";
import styles from "./InputLabel.module.scss";
import type { InputLabelProps } from "./types/InputLabel.types";

const InputLabel = ({ htmlFor, children, required }: InputLabelProps) => {
  return (
    <label className={styles.inputLabel} htmlFor={htmlFor}>
      {children}
      {required && (
        <Icon
          className={styles.inputIconStar}
          name="icon-star"
          size={20}
          stroke="#fbc000"
        />
      )}
    </label>
  );
};

export default InputLabel;
