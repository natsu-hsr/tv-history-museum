import {ReactNode, useEffect, useRef, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';

import s from './background.module.scss';

interface BackgroundSliderProps {
  backgroundUrl: string;
  children?: ReactNode;
}

export const BackgroundSlider = ({
  children,
  backgroundUrl,
}: BackgroundSliderProps) => {
  const prevBackgroundRef = useRef<string | null>(null);
  const [currentBackground, setCurrentBackground] = useState<string | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  // Предзагрузка изображений
  useEffect(() => {
    const preloadImage = (url: string) => {
      const img = new Image();
      img.src = `/src/assets/${url}/background.png`;
      img.onload = () => {
        setLoadedImages((prev) => new Set(prev).add(url));
      };
    };

    // Предзагружаем текущее изображение, если его ещё нет в loadedImages
    if (!loadedImages.has(backgroundUrl)) {
      preloadImage(backgroundUrl);
    }

    // Обновляем текущий фон после загрузки
    if (loadedImages.has(backgroundUrl) || !loadedImages.size) {
      if (prevBackgroundRef.current !== backgroundUrl) {
        setCurrentBackground(backgroundUrl);
        prevBackgroundRef.current = backgroundUrl;
      }
    }
  }, [backgroundUrl, loadedImages]);

  const slideVariants = {
    initial: {x: "100%", opacity: 1},
    animate: {x: 0, opacity: 1, transition: {duration: 0.5, ease: "easeInOut"}},
    exit: {x: "-100%", opacity: 1, transition: {duration: 0.5, ease: "easeInOut"}},
  };

  return (
    <div className={s.background}>
      {/* Слой для предыдущего фона */}
      {prevBackgroundRef.current && (
        <div
          style={{
            backgroundImage: `url(/assets/${prevBackgroundRef.current}/background.png)`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
          }}
        />
      )}

      {/* Анимированный слой для текущего фона */}
      <AnimatePresence initial={false}>
        {currentBackground && loadedImages.has(currentBackground) && (
          <motion.div
            key={currentBackground}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{
              backgroundImage: `url(/src/assets/${currentBackground}/background.png)`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 1,
            }}
          />
        )}
      </AnimatePresence>

      {/* Дочерние элементы */}
      <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
    </div>
  );
}