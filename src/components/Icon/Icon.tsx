import React from "react";
import type { IconProps } from "./types/Icon.types";

const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  stroke = "currentColor",
  fill = "none",
  className
}) => {
  return (
    <svg
      className={className}
      fill={fill}
      height={size}
      stroke={stroke}
      width={size}
    >
      <use href={`/sprite.svg#${name}`} />
    </svg>
  );
};

export default Icon;
