import React, { forwardRef, Ref } from 'react';
import styled, { css, keyframes } from 'styled-components';

interface IconProps extends React.HtmlHTMLAttributes<HTMLElement> {
  /**
   * Nome do icone
   */
  name?: string;
  /**
   * Define o tamaho do icone
   */
  size?:
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | '1x'
    | '2x'
    | '3x'
    | '4x'
    | '5x'
    | '6x'
    | '7x'
    | '8x'
    | '9x'
    | '10x';
  /**
   * Caso `true` gira o icone
   * @default false
   */
  spin?: boolean;
  /**
   * Caso `true` faz uma animação de pulse
   * @default false
   */
  pulse?: boolean;
  /**
   * Define para que lado o icone vai estar
   */
  pull?: 'left' | 'right';
  /**
   * Rotaciona o icone em graus
   */
  rotation?: string | number;
  /**
   * Vira o icone
   */
  flip?: 'vertical' | 'horizontal' | 'both';
}

interface Sizes {
  [key: string]: string;
}
// size:keyof { [key: string]: ISizes }
/**
 * Define o tamanho do icone
 * @param size:Sizes Tamanho do icone
 * @returns string
 */
function iconSizes(size: keyof { [key: string]: Sizes }) {
  const sizes: any = {
    xs: '10px',
    sm: '12px',
    md: '16px',
    lg: '22px',
    '1x': '16px',
    '2x': `${16 * 2}px`,
    '3x': `${16 * 3}px`,
    '4x': `${16 * 4}px`,
    '5x': `${16 * 5}px`,
    '6x': `${16 * 6}px`,
    '7x': `${16 * 7}px`,
    '8x': `${16 * 8}px`,
    '9x': `${16 * 9}px`,
    '10x': `${16 * 10}px`,
  };

  return sizes[size];
}

function iconFlip(flip: string) {
  if (flip === 'horizontal') {
    return 'scaleX(-1)';
  }

  if (flip === 'vertical') {
    return 'scaleY(-1)';
  }

  if (flip === 'both') {
    return 'scale(-1, -1)';
  }

  return 'scale(1, 1)';
}

const spinKeys = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(1turn);
  }
`;

const pulseKeys = keyframes`
  0% {
    transform: scale(.4);
  }

  70% {
    transform: scale(1);
  }

  100% {
    transform: scale(.4);
  }
`;

const Container = styled.i<IconProps>`
  color: inherit;
  font-size: inherit;
  user-select: none;
  display: inline-block;
  vertical-align: baseline;
  font-style: normal;
  font-variant: normal;
  text-rendering: auto;
  line-height: 1;
  -webkit-font-smoothing: antialiased;

  ${(props) =>
    props.rotation &&
    css`
      transform: ${`rotate(${props.rotation}deg)`};
    `};

  ${(props) =>
    props.flip &&
    css`
      transform: ${iconFlip(props.flip)};
    `};

  ${(props) =>
    props.size &&
    css`
      font-size: ${iconSizes(props.size)};
    `};

  ${(props) =>
    props.spin &&
    css`
      animation: ${spinKeys} 1s steps(8) infinite;
    `};

  ${(props) =>
    props.pulse &&
    css`
      animation: ${pulseKeys} 1s infinite;
    `};
`;

function Icon(
  { name, size = 'md', spin, pulse, pull, rotation, flip, ...rest }: IconProps,
  ref: Ref<HTMLElement>,
): JSX.Element {
  return (
    <Container
      className={`icon ${name}`}
      size={size}
      rotation={rotation}
      spin={spin}
      flip={flip}
      pull={pull}
      pulse={pulse}
      role="img"
      aria-hidden="true"
      ref={ref}
      {...rest}
    />
  );
}

export default forwardRef(Icon);
