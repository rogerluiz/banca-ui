import React from 'react';
import {
  CSSObject,
  SimpleInterpolation,
  FlattenSimpleInterpolation,
} from 'styled-components';

export type RGB = {
  r: number;
  g: number;
  b: number;
};

export type Sizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type ColorVariant =
  | 'primary'
  | 'secondary'
  | 'institucional'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'dark'
  | 'light'
  | 'black'
  | 'white'
  | 'cancel'
  | 'negative'
  | 'red'
  | 'yellow'
  | 'gold'
  | 'gray100'
  | 'gray200'
  | 'gray300'
  | 'gray400'
  | 'gray500'
  | string;

export type FontVariant =
  | 'light'
  | 'regular'
  | 'medium'
  | 'semi-bold'
  | 'bold'
  | 'extra-bold';

export type Align = 'auto' | 'left' | 'right' | 'center' | 'justify';

export type Justify =
  | 'start'
  | 'end'
  | 'left'
  | 'right'
  | 'center'
  | 'between'
  | 'around'
  | 'evenly'
  | 'stretch';

export type AlignItems = 'start' | 'end' | 'center' | 'normal' | 'stretch';

export type FlexDirection =
  | 'row'
  | 'column'
  | 'row-reverse'
  | 'column-reverse'
  | 'reverse';

export type ObjectMap<T> = { [key: string]: T };

export type ActionType<T = unknown> = {
  type: string;
  payload: T;
};

export type StatusType = {
  [key: string]: string | number;
};

export interface RoutesType {
  key?: string;
  path?: string;
  index?: boolean;
  element?: JSX.Element | React.ReactElement;
  children?: RoutesType[];
}

export interface SidebarType {
  label: string;
  to: string;
}

export interface StyleConfig {
  gridSize: number;
  gutterWidth: number;
  outerMargin: number;
  mediaQuery: string;
  container: ObjectMap<number>;
  breakpoints: ObjectMap<number>;
  media?: Media;
}

export type Media = {
  [key: string]: (
    first: TemplateStringsArray | CSSObject,
    ...interpolations: SimpleInterpolation[]
  ) => FlattenSimpleInterpolation;
};
