import {ANIMATION_TRANSITION} from "../constants";
import {TTvModelKey} from "../types";
import {getSlideDirection} from "./tv-models";

interface GetSlideVariantsArgs {
  prevBackground: TTvModelKey | null;
  currentBackground: TTvModelKey | null;
}
export const getSlideVariants = ({
  prevBackground,
  currentBackground,
}: GetSlideVariantsArgs) => {
  const direction = getSlideDirection({prev: prevBackground, current: currentBackground});
  const xPosition = direction === 'right' ? '100%' : '-100%';

  return ({
    initial: {
      x: xPosition,
      filter: 'blur(5px)',
      scale: 1.1,
    },
    animate: {
      x: 0,
      filter: 'blur(0px)',
      scale: 1,
      transition: ANIMATION_TRANSITION,
    },
    exit: {
      x: xPosition,
      filter: 'blur(5px)',
      scale: 1.1,
      transition: ANIMATION_TRANSITION,
    },
  });
};