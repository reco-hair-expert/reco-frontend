import type React from "react";
import type { StaticImageData } from "next/image";
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: string | number;
  color?: string | undefined;
  className?: string;
  src1x?: StaticImageData;
  src2x?: StaticImageData;
  alt?: string;
}
