import { useEffect, useRef, useCallback } from "react";

declare global {
  interface Window {
    Image: typeof HTMLImageElement;
  }
}

export function useFlyingImage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const imageCache = useRef<Map<string, HTMLImageElement>>(new Map());

  useEffect(() => {
    const cache = imageCache.current;
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.top = "0";
    container.style.left = "0";
    container.style.pointerEvents = "none";
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.zIndex = "9999";
    // Включаем аппаратное ускорение
    container.style.transform = "translateZ(0)";
    container.style.backfaceVisibility = "hidden";
    container.style.perspective = "1000px";
    document.body.appendChild(container);
    containerRef.current = container;

    // Создаем аудио элемент
    const audio = new Audio();
    const audioPath = `${window.location.origin}/sound/cponk.mp3`;
    audio.src = audioPath;
    audio.preload = "auto";
    
    audio.addEventListener('canplaythrough', () => {
      audioRef.current = audio;
    });

    return () => {
      document.body.removeChild(container);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      cache.clear();
    };
  }, []);

  const preloadImage = useCallback((src: string) => {
    if (imageCache.current.has(src)) return;

    const img = document.createElement('img');
    img.src = src;
    img.style.display = "none";
    document.body.appendChild(img);
    imageCache.current.set(src, img);
  }, []);

  const playSound = useCallback(() => {
    if (!audioRef.current) return;

    try {
      audioRef.current.currentTime = 0;
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          const playAudioOnInteraction = () => {
            if (audioRef.current) {
              audioRef.current.play()
                .then(() => {
                  document.removeEventListener('click', playAudioOnInteraction);
                });
            }
          };
          document.addEventListener('click', playAudioOnInteraction);
        });
      }
    } catch (error) {
      console.error('Error in audio playback:', error);
    }
  }, []);

  const flyToCart = useCallback(({
    imageSrc,
    fromRect
  }: {
    imageSrc: string;
    fromRect: DOMRect;
  }) => {
    if (!containerRef.current) return;

    const cart = document.querySelector("#cart-icon");
    if (!cart) return;

    // Предзагрузка изображения
    preloadImage(imageSrc);

    const image = document.createElement("img");
    image.src = imageSrc;
    image.alt = "Flying product image";
    image.style.position = "fixed";
    image.style.width = fromRect.width + "px";
    image.style.height = fromRect.height + "px";
    image.style.top = fromRect.top + "px";
    image.style.left = fromRect.left + "px";
    image.style.transition = "all 2s cubic-bezier(0.65, -0.2, 0.35, 1.5)";
    image.style.zIndex = "99999";
    image.style.willChange = "transform, opacity";
    image.style.opacity = "0.9";
    image.style.objectFit = "contain";
    // Оптимизация изображения
    image.style.imageRendering = "optimizeSpeed";
    image.style.transform = "scale(0.9) translateZ(0)";
    image.style.transformOrigin = "top left";
    image.style.filter = "blur(0.5px)";
    // Включаем аппаратное ускорение
    image.style.backfaceVisibility = "hidden";
    image.style.perspective = "1000px";

    containerRef.current.appendChild(image);

    const cartRect = cart.getBoundingClientRect();
    if (!cartRect) {
      image.remove();
      return;
    }

    // Запускаем анимацию в следующем кадре
    requestAnimationFrame(() => {
      // Воспроизводим звук
      playSound();
      
      // Запускаем анимацию
      requestAnimationFrame(() => {
        image.style.top = cartRect.top + "px";
        image.style.left = cartRect.left + "px";
        image.style.width = "20px";
        image.style.height = "20px";
        image.style.opacity = "0.2";
      });
    });

    const handleTransitionEnd = () => {
      image.remove();
      image.removeEventListener("transitionend", handleTransitionEnd);
    };

    image.addEventListener("transitionend", handleTransitionEnd);
  }, [playSound, preloadImage]);

  return { flyToCart };
}

// Пример использования внутри компонента:
// const { flyToCart } = useFlyingImage();
// const handleClick = (e) => {
//   const rect = e.target.getBoundingClientRect();
//   flyToCart({ imageSrc: product.image, fromRect: rect });
// }
