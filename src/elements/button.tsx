import React, { forwardRef, ButtonHTMLAttributes, Ref, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { darken, lighten } from 'polished';

import { Sizes, ColorVariant } from '../types';
import { difference, getCssColor } from '../helpers/colors';
import CircularLoader from './circular-loader';

interface SizesProps {
  height: string;
  padding: string;
  fontSize: string;
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * If `true`, the button will be disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Caso `true` deixa o botão em block e com a largura em 100%
   * @default false
   */
  block?: boolean;
  /**
   * The size of button
   * @default 'md'
   */
  size?: Omit<Sizes, 'xs' | 'xl'>;
  /**
   * The html button type to use.
   * @default 'button'
   */
  type?: 'button' | 'reset' | 'submit';
  /**
   * The button color variant
   * @default 'primary'
   */
  variant?: ColorVariant;
  /**
   * The text color
   * @default 'white'
   */
  color?: ColorVariant;
  /**
   * if `true` deixa o botão em mode texto
   * @default false
   */
  isText?: boolean;
  /**
   * Caso `true` ativa o modo outline
   * @default false
   */
  outline?: boolean;
  /**
   * Referencia para o botão
   */
  ref?: React.Ref<HTMLButtonElement>;
  /**
   * If added, the button will show an icon before the button's label.
   * @type React.ReactElement
   */
  leftIcon?: React.ReactElement;
  /**
   * If added, the button will show an icon after the button's label.
   * @type React.ReactElement
   */
  rightIcon?: React.ReactElement;
  /**
   * If `true`, the button will show a spinner.
   */
  isLoading?: boolean;
  /**
   * The label to show in the button when `isLoading` is true
   * If no text is passed, it only shows the spinner
   */
  loadingText?: string;
  /**
   * It determines the placement of the spinner when isLoading is true
   * @default "start"
   */
  spinnerPlacement?: 'start' | 'end';
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
  display: flex;
  justify-content: center;
  align-items: center;

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

const LeftIcon = styled.span`
  margin-right: 5px;
`;

const RightIcon = styled.span`
  margin-left: 5px;
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
    leftIcon,
    rightIcon,
    isLoading = false,
    loadingText,
    spinnerPlacement = 'start',
    children,
    ...rest
  }: ButtonProps,
  ref?: Ref<HTMLButtonElement>,
): JSX.Element {
  const contentProps = { rightIcon, leftIcon, children };

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
      {isLoading && spinnerPlacement === 'start' && (
        <CircularLoader
          color={color}
          style={{ marginRight: '5px' }}
          size="sm"
        />
      )}

      {isLoading ? loadingText || null : <ButtonContent {...contentProps} />}

      {isLoading && spinnerPlacement === 'end' && (
        <CircularLoader color={color} style={{ marginLeft: '5px' }} size="sm" />
      )}
    </DefaultButton>
  );
}

type ButtonContentProps = Pick<
  ButtonProps,
  'leftIcon' | 'rightIcon' | 'children'
>;

function ButtonContent(props: ButtonContentProps) {
  const { leftIcon, rightIcon, children } = props;

  const renderLeftIcon = useMemo(() => {
    return leftIcon && <LeftIcon>{leftIcon}</LeftIcon>;
  }, [leftIcon]);

  const renderRightIcon = useMemo(() => {
    return rightIcon && <RightIcon>{rightIcon}</RightIcon>;
  }, [rightIcon]);

  return (
    <>
      {renderLeftIcon}
      {children}
      {renderRightIcon}
    </>
  );
}

export default forwardRef(Button);
