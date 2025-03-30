import React from "react";
import { StaticImageData } from "next/image";
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: string | number;
  color?: string | undefined;
  className?: string;
  src1x?: StaticImageData;
  src2x?: StaticImageData;
  alt?: string;
}
