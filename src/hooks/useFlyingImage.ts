import { useEffect, useRef } from "react";

export function useFlyingImage() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.top = "0";
    container.style.left = "0";
    container.style.pointerEvents = "none";
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.zIndex = "9999";
    document.body.appendChild(container);
    containerRef.current = container;
    return () => {
      document.body.removeChild(container);
    };
  }, []);

  function flyToCart({ imageSrc, fromRect }: { imageSrc: string; fromRect: DOMRect }) {
    if (!containerRef.current) return;

    const image = document.createElement("img");
    image.src = imageSrc;
    image.style.position = "fixed";
    image.style.width = fromRect.width + "px";
    image.style.height = fromRect.height + "px";
    image.style.top = fromRect.top + "px";
    image.style.left = fromRect.left + "px";
    image.style.transition = "all 0.8s cubic-bezier(0.65, -0.2, 0.35, 1.5)";
    image.style.zIndex = "99999";

    containerRef.current.appendChild(image);

    const cart = document.querySelector("#cart-icon");
    const cartRect = cart?.getBoundingClientRect();
    if (!cartRect) return;

    requestAnimationFrame(() => {
      image.style.top = cartRect.top + "px";
      image.style.left = cartRect.left + "px";
      image.style.width = "20px";
      image.style.height = "20px";
      image.style.opacity = "0.2";
    });

    image.addEventListener("transitionend", () => {
      image.remove();
      new Audio("/chponk.mp3").play();
    });
  }

  return { flyToCart };
}

// Пример использования внутри компонента:
// const { flyToCart } = useFlyingImage();
// const handleClick = (e) => {
//   const rect = e.target.getBoundingClientRect();
//   flyToCart({ imageSrc: product.image, fromRect: rect });
// }
