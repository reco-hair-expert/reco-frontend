import { StaticImageData } from 'next/image'; // Ensure this is the correct module for StaticImageData

export interface ImageProps {
  src1x?: StaticImageData;
  src2x?: StaticImageData;
  alt: string;
  className?: string;
  size?: "small" | "medium" | "large";
  srcSet?: string;
}
