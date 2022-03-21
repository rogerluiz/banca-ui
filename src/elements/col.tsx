import React, { HTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

import { createMediaQuerys } from 'helpers/media-queries';
import { BASE_CONF } from 'constants/base';

interface ColProps extends HTMLAttributes<HTMLElement> {
  /**
   * O número de colunas que você deseja abranger para mobile (<480px)
   */
  xs?: number;
  /**
   * O número de colunas que você deseja abranger para dispositivos pequenos e tablets
   */
  sm?: number;
  /**
   * O número de colunas que você deseja abranger para desktops de dispositivos médios
   */
  md?: number;
  /**
   * O número de colunas que você deseja abranger para desktops de dispositivos grandes (≥ 1200px)
   */
  lg?: number;
  /**
   * O número de colunas que você deseja abranger para desktops de dispositivos grandes (≥ 1300px)
   */
  xl?: number;
  /**
   * Move as colunas a direita para dispositivos extra pequenos mobiles
   */
  xsOffset?: number;
  /**
   * Move as colunas a direita para dispositivos pequenos e tablets
   */
  smOffset?: number;
  /**
   * Move as colunas a direita para desktops e dispositivos médios
   */
  mdOffset?: number;
  /**
   * Move as colunas a direita para desktops e dispositivos grandes
   */
  lgOffset?: number;
  /**
   * Move as colunas a direita para desktops e dispositivos extra grandes
   */
  xlOffset?: number;
  /**
   * Reverte a posicão do elemento
   * @default false
   */
  reverse?: boolean;
  /**
   * O Conteudo do component
   */
  children?: React.ReactNode;
}

const media = createMediaQuerys(BASE_CONF);

const gridCofig = (size: number) => {
  return css`
    flex-basis: ${(100 / BASE_CONF.gridSize) * size}%;
    max-width: ${(100 / BASE_CONF.gridSize) * size}%;
    display: block;
  `;
};

const setOffset = (offset: number, type: string) => media[type]`
  margin-left: ${(100 / BASE_CONF.gridSize) * offset}%;
`;

const setSize = (size: number, type: string) => media[type]`
  ${gridCofig(size)}
`;

const setReverce = css`
  flex-direction: column-reverse;
`;

const Content = styled.div<ColProps>`
  box-sizing: border-box;
  flex: 0 0 auto;
  padding-right: calc(var(--gutter-width, 30px) / 2);
  padding-left: calc(var(--gutter-width, 30px) / 2);
  flex-grow: 1;
  flex-basis: 0;
  max-width: 100%;
  display: block;

  ${({ reverse }) => reverse && setReverce};
  ${({ xs }) => xs && setSize(xs, 'xs')};
  ${({ sm }) => sm && setSize(sm, 'sm')};
  ${({ md }) => md && setSize(md, 'md')};
  ${({ lg }) => lg && setSize(lg, 'lg')};
  ${({ xl }) => xl && setSize(xl, 'xl')};
  ${({ xsOffset }) => xsOffset && setOffset(xsOffset, 'xs')};
  ${({ smOffset }) => smOffset && setOffset(smOffset, 'sm')};
  ${({ mdOffset }) => mdOffset && setOffset(mdOffset, 'md')};
  ${({ lgOffset }) => lgOffset && setOffset(lgOffset, 'lg')};
  ${({ xlOffset }) => xlOffset && setOffset(xlOffset, 'xl')};
`;

function Col({
  xs = 12,
  sm = 12,
  md = 12,
  lg = 12,
  xl = 12,
  xsOffset,
  smOffset,
  mdOffset,
  lgOffset,
  xlOffset,
  reverse = false,
  children,
  ...rest
}: ColProps): JSX.Element {
  return (
    <Content
      xs={xs}
      sm={sm}
      md={md}
      lg={lg}
      xl={xl}
      xsOffset={xsOffset}
      smOffset={smOffset}
      mdOffset={mdOffset}
      lgOffset={lgOffset}
      xlOffset={xlOffset}
      reverse={reverse}
      {...rest}
    >
      {children}
    </Content>
  );
}

export default Col;
