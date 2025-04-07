import {ReactNode, useEffect, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';

import {getSlideVariants} from '../../shared/utils';
import {TTvModelKey} from '../../shared/types';

import s from './background-slider.module.scss';

interface BackgroundSliderProps {
  selectedModel: TTvModelKey;
  children?: ReactNode;
}

export const BackgroundSlider = ({
  children,
  selectedModel,
}: BackgroundSliderProps) => {
  const [prevBackground, setPrevBackground] = useState<TTvModelKey | null>(null);
  const [currentBackground, setCurrentBackground] = useState<TTvModelKey | null>(null);

  useEffect(() => {
    if (selectedModel !== currentBackground) {
      setPrevBackground(currentBackground);
      setCurrentBackground(selectedModel);
    }
  }, [selectedModel]);

  return (
    <div className={s.background}>
      {/* Анимированный слой для текущего фона */}
      <AnimatePresence initial={false} mode='sync'>
        {currentBackground && (
          <motion.div
            key={currentBackground}
            variants={getSlideVariants({
              prevBackground,
              currentBackground,
            })}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{
              backgroundImage: `url(/assets/${currentBackground}/background.png)`,
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