import {TvModelsOrder} from "../constants";
import {TSlideDirection, TTvModelKey} from "../types"

interface GetSlideDirectionArgs {
  prev: TTvModelKey | null;
  current: TTvModelKey | null;
}
export const getSlideDirection = ({prev, current}: GetSlideDirectionArgs): TSlideDirection => {
  if (!prev || !current) {
    return 'left';
  }
  return TvModelsOrder[prev] < TvModelsOrder[current] ? 'right' : 'left';
}