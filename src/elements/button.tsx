import React, { forwardRef, ButtonHTMLAttributes, Ref } from 'react';
import styled, { css } from 'styled-components';
import { darken, lighten } from 'polished';

import { Sizes, ColorVariant } from '../types';
import { difference, getCssColor } from '../helpers/colors';

interface SizesProps {
  height: string;
  padding: string;
  fontSize: string;
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Desabilita o botão
   * @default false
   */
  disabled?: boolean;
  /**
   * Caso `true` deixa o botão em block e com a largura em 100%
   * @default false
   */
  block?: boolean;
  /**
   * Tamanho do botão
   * @default 'md'
   */
  size?: Omit<Sizes, 'xs' | 'xl'>;
  /**
   * Tipo do botão
   * @default 'button'
   */
  type?: 'button' | 'reset' | 'submit';
  /**
   * Cor do background do botão
   * @default 'primary'
   */
  variant?: ColorVariant;
  /**
   * Color do texto do botão
   * @default 'white'
   */
  color?: ColorVariant;
  /**
   * Caso `true` deixa o botão em mode texto
   * @default false
   */
  isText?: boolean;
  /**
   * Caso `true` ativa o modo outline
   * @default falseß
   */
  outline?: boolean;
  /**
   * Referencia para o botão
   */
  ref?: React.Ref<HTMLButtonElement>;
  /**
   * O Conteudo do component
   */
  children?: React.ReactNode;
}

const setSizes = (size: keyof { [key: string]: SizesProps }) => {
  const sizes: Record<string, any> = {
    sm: { height: '30px', padding: '0 12px', fontSize: '13px' },
    md: { height: '40px', padding: '0 16px', fontSize: '16px' },
    lg: { height: '50px', padding: '0 20px', fontSize: '18px' },
  };

  return css`
    height: ${sizes[size].height};
    padding: ${sizes[size].padding};
    font-size: ${sizes[size].fontSize};
  `;
};

const setVariant = (variant = 'primary', color = 'white') => {
  return css`
    border: none;
    background-color: var(--${variant});
    color: var(--${color});

    &:focus,
    &:hover {
      background-color: var(--${variant}-dark);
      color: ${difference(getCssColor(`--${variant}-dark`))};
    }
  `;
};

const setTextVariant = (color = 'gray500') => {
  return css`
    border: none;
    background-color: transparent;
    color: var(--${color});
    transition: background-color 300ms ease-in-out, color 300ms ease-in-out;

    &:focus,
    &:hover {
      background-color: transparent;
      color: var(--${color}-dark);
    }

    &:disabled {
      color: var(--gray30);
      background-color: var(--gray10);
      pointer-events: none;
    }
  `;
};

const setOutline = (variant = 'primary', color = 'gray90') => {
  return css`
    background-color: transparent;
    color: var(--${color});
    border: 1px solid var(--${variant});

    &:hover {
      background-color: ${lighten(0.6, getCssColor(`--${variant}-lither`))};
      color: ${darken(0.5, getCssColor(`--${color}`))};
    }
  `;
};

const setBlock = () => {
  return css`
    display: block;
    width: 100%;
  `;
};

const DefaultButton = styled.button<ButtonProps>`
  height: 35px;
  border-radius: 4px;
  padding: 0 16px 0 16px;
  transition: background-color 300ms ease-in-out, color 300ms ease-in-out;
  outline: none;
  cursor: pointer;
  box-sizing: border-box;
  user-select: none;
  text-transform: none;
  font-size: 16px;
  font-weight: 300;

  &:disabled {
    color: var(--gray30);
    background-color: var(--gray10);
    pointer-events: none;
  }

  ${({ block }) => block && setBlock()};
  ${({ size }) => size && setSizes(size as string)};
  ${({ variant, color }) => variant && setVariant(variant, color)};
  ${({ isText, color }) => isText && setTextVariant(color)};
  ${({ outline, variant, color }) => outline && setOutline(variant, color)}
`;

function Button(
  {
    size = 'md',
    type = 'button',
    disabled = false,
    variant = 'primary',
    color = 'white',
    block = false,
    isText = false,
    children,
    ...rest
  }: ButtonProps,
  ref?: Ref<HTMLButtonElement>,
): JSX.Element {
  return (
    <DefaultButton
      ref={ref}
      size={size}
      type={type}
      disabled={disabled}
      variant={variant}
      color={color}
      block={block}
      isText={isText}
      {...rest}
    >
      {children}
    </DefaultButton>
  );
}

export default forwardRef(Button);
