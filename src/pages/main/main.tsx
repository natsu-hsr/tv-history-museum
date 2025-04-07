import {useState} from 'react';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import CircularProgress from '@mui/material/CircularProgress';

import {BackgroundSlider} from '../../components/background-slider/background-slider';
import {normalizeLoaderValueArgs} from '../../shared/utils';
import {TvModels} from '../../shared/constants';
import {TTvModelKey} from '../../shared/types';
import {useBackgroundsLoader} from '../../shared/hooks';

import s from './main.module.scss';

export const Main = () => {
  const [model, setModel] = useState<TTvModelKey>(TvModels.geOctagon);

  const {
    isLoading,
    loadedCount,
  } = useBackgroundsLoader();
  console.log('isLoading=', isLoading);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setModel((event.target as HTMLInputElement).value as TTvModelKey);
  };

  return (
    <div className={s.wrapper}>
      {(() => {
        if (isLoading) {
          return (
            <CircularProgress
              variant="determinate"
              value={normalizeLoaderValueArgs({
                value: loadedCount,
                max: Object.keys(TvModels).length,
                min: 0,
              })}
            />
          );
        }

        return (
          <BackgroundSlider
            selectedModel={model}
          >
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={handleChange}
              value={model}
            >
              <FormControlLabel value={TvModels.geOctagon} control={<Radio />} label="GE Octagon 1928" />
              <FormControlLabel value={TvModels.test} control={<Radio />} label="another" />
            </RadioGroup>
          </BackgroundSlider>
        )
      })()}
    </div>
  )
};
