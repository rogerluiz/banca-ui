import { ReactNode, HTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

import { FontVariant, Align } from 'types';
import { setVariant } from 'helpers/text';

interface TextProps extends HTMLAttributes<HTMLElement> {
  /**
   * O Conteudo do component
   */
  children: ReactNode;
  /**
   * Cor do texto
   * @default 'gray500'
   */
  color?: string;
  /**
   * Tamanho do texto
   * @default 14
   */
  size?: number;
  /**
   * Espaçamento entre linhas do texto
   * @default 18
   */
  lineHeight?: number;
  /**
   * Peso da fonte
   * @default 'regular'
   */
  variant?: FontVariant;
  /**
   * Caso `true` deixa o texto em italico
   * @default false
   */
  italic?: boolean;
  /**
   * Caso `true` coloca o texto em caixa alta
   * @default false
   */
  uppercase?: boolean;
  /**
   * Alinha o texto
   * @default 'auto'
   */
  textAlign?: Align;
}

const Paragraph = styled.p<TextProps>`
  color: var(--${({ color }) => color});
  font-size: ${({ size }) => size}px;
  font-weight: ${({ variant }) => setVariant(variant as string)};

  ${({ lineHeight }) =>
    lineHeight &&
    css`
      line-height: ${lineHeight}px;
    `};

  ${({ italic }) =>
    italic &&
    css`
      font-style: italic;
    `};

  ${({ uppercase }) =>
    uppercase &&
    css`
      text-transform: uppercase;
    `};

  ${({ textAlign }) =>
    textAlign &&
    css`
      text-align: ${textAlign};
    `};
`;

function Text({
  color = 'gray500',
  size = 14,
  lineHeight = 18,
  variant = 'regular',
  italic,
  uppercase,
  textAlign = 'auto',
  children,
  ...rest
}: TextProps): JSX.Element {
  return (
    <Paragraph
      color={color}
      size={size}
      lineHeight={lineHeight}
      variant={variant}
      italic={italic}
      uppercase={uppercase}
      textAlign={textAlign}
      {...rest}
    >
      {children}
    </Paragraph>
  );
}

export default Text;
