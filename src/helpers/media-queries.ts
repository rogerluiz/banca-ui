import { css } from 'styled-components';
import { StyleConfig, Media } from 'types';

// eslint-disable-next-line no-shadow
export enum SizesPoint {
  XS = '579px',
  SM = '768px',
  MD = '1024px',
  LG = '1200px',
}

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg';

export function createMediaQuerys(conf: StyleConfig) {
  return Object.keys(conf.breakpoints).reduce((media: Media, breakpoint) => {
    const breakpointWidth: number = conf.breakpoints[breakpoint];
    // const mediaOnly = [
    //   conf.mediaQuery,
    //   breakpointWidth !== 0 && `(min-width: ${breakpointWidth}px)`,
    // ].filter(Boolean);
    // .join(' and ');

    // eslint-disable-next-line no-param-reassign
    media[breakpoint] = (...args) => css`
      @media (min-width: ${breakpointWidth}px) {
        ${css(...args)};
      }
    `;
    return media;
  }, {});
}

export function isMinDevice(breakpoint: Breakpoint): boolean {
  const point = breakpoint.toUpperCase() as keyof typeof SizesPoint;
  return window.matchMedia(`(min-width: ${SizesPoint[point]})`).matches;
}

export function isMaxDevice(breakpoint: Breakpoint): boolean {
  const point = breakpoint.toUpperCase() as keyof typeof SizesPoint;
  return window.matchMedia(`(max-width: ${SizesPoint[point]})`).matches;
}
