import {useState} from 'react';

import {BackgroundSlider} from '../../components/background-slider/background-slider';

import s from './main.module.scss';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

const TvModels = {
  geOctagon: 'geOctagon',
  test: 'test',
}

export const Main = () => {
  const [model, setModel] = useState<string>(TvModels.geOctagon);

  console.log('model value=', model);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setModel((event.target as HTMLInputElement).value);
  };

  return (
    <div className={s.wrapper}>
      <BackgroundSlider
        backgroundUrl={model}
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
    </div>
  )
};
