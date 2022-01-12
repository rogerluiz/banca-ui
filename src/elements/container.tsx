import React, { HTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

import { BASE_CONF, DIMENSION_NAMES } from 'constants/base';
import { createMediaQuerys } from 'helpers/media-queries';

interface ContainerProps extends HTMLAttributes<HTMLElement> {
  /**
   * O Conteudo do component
   */
  children?: React.ReactNode;
  /**
   * Margin top
   */
  marginTop?: number;
  /**
   * Margin bottom
   */
  marginBottom?: number;
  /**
   * Padding Vertical
   * @default 15
   */
  paddingVertical?: number;
  /**
   * Caso `true` deixa o container com 100% do tamanho
   * @default false
   */
  fluid?: string;
}
const media = createMediaQuerys(BASE_CONF);

const setPadding = (padding: number) =>
  padding ? `${padding}px` : 'var(--outer-margin, 15px)';
const setMargin = (margin: number, isTop = false) => {
  if (isTop) {
    return css`
      margin-top: ${margin}px;
    `;
  }

  return css`
    margin-bottom: ${margin}px;
  `;
};

const setFluid = css`
  ${DIMENSION_NAMES.map(
    (t) =>
      BASE_CONF.container[t] &&
      media[t]`
        max-width: ${BASE_CONF.container[t]}px;
      `,
  )};
`;

const Box = styled.div<ContainerProps>`
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-right: ${({ paddingVertical }) =>
    setPadding(paddingVertical as number)};
  padding-left: ${({ paddingVertical }) =>
    setPadding(paddingVertical as number)};

  ${({ marginTop }) => marginTop && setMargin(marginTop, true)};
  ${({ marginBottom }) => marginBottom && setMargin(marginBottom)};
  ${({ fluid }) => !fluid && setFluid};
`;

function Container({
  fluid,
  marginBottom,
  marginTop,
  paddingVertical,
  children,
  ...rest
}: ContainerProps): JSX.Element {
  return (
    <Box
      fluid={fluid}
      marginTop={marginTop}
      marginBottom={marginBottom}
      paddingVertical={paddingVertical}
      {...rest}
    >
      {children}
    </Box>
  );
}

export default Container;
