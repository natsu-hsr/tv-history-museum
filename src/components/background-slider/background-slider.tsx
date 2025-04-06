import {ReactNode, useEffect, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';

import {getSlideDirection } from '../../shared/utils';
import {TTvModelKey} from '../../shared/types';
import {ANIMATION_DURATION} from '../../shared/constants';

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

  const getSlideVariants = (revert = false) => {
    const direction = getSlideDirection({prev: prevBackground, current: currentBackground});
    const initDirection = direction === 'right' ? '100%' : '-100%';
    const endDirection = direction === 'right' ? '-100%' : '100%';

    return ({
      initial: {x: revert ? endDirection : initDirection, opacity: 1},
      animate: {x: 0, opacity: 1, transition: {duration: ANIMATION_DURATION, ease: "easeInOut"}},
      exit: {x: revert ? initDirection : endDirection, opacity: 1, transition: {duration: ANIMATION_DURATION, ease: "easeInOut"}},
    });
  };

  return (
    <div className={s.background}>
      {/* {prevBackground && (
        <AnimatePresence initial={false} mode='sync'>
          {currentBackground && (
            <motion.div
              key={currentBackground}
              variants={getSlideVariants(true)}
              initial="initial"
              animate="animate"
              exit="exit"
              style={{
                backgroundImage: `url(/assets/${prevBackground}/background.png)`,
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
      )} */}
      {/* Анимированный слой для текущего фона */}
      <AnimatePresence initial={false} mode='sync'>
        {currentBackground && (
          <motion.div
            key={currentBackground}
            variants={getSlideVariants()}
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