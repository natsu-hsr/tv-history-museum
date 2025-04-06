import {TvModels} from "../constants";

export type TTvModelKey = keyof typeof TvModels;

export type TTvModels = Record<TTvModelKey, string>;

export type TSlideDirection = 'left' | 'right' | 'initial';