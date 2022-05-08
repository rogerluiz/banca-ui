import { css } from 'styled-components';
import { FlexDirection, Justify, AlignItems } from 'types';

// TODO: Mudar mome do arquivo

enum justifyMap {
  start = 'flex-start',
  end = 'flex-end',
  left = 'left',
  right = 'right',
  center = 'center',
  between = 'space-between',
  around = 'space-around',
  evenly = 'space-evenly',
  stretch = 'stretch',
}

enum alignMap {
  start = 'flex-start',
  end = 'flex-end',
  normal = 'normal',
  center = 'center',
  stretch = 'stretch',
}

export function setDirection(direction: FlexDirection) {
  return css`
    flex-direction: ${direction};
  `;
}

export function setJustify(justify: Justify) {
  return css`
    justify-content: ${justifyMap[justify]};
  `;
}

export function setAlign(align: AlignItems) {
  return css`
    align-items: ${alignMap[align]};
  `;
}
