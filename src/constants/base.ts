import { StyleConfig } from 'types';

export const BASE_CONF: StyleConfig = {
  gridSize: 12,
  gutterWidth: 30,
  outerMargin: 15,
  mediaQuery: '',
  container: {
    sm: 540,
    md: 720,
    lg: 960,
    xl: 1140,
  },
  breakpoints: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
  },
};

export const DIMENSION_NAMES: Array<string> = ['xs', 'sm', 'md', 'lg', 'xl'];
