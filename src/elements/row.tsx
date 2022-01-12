import React from 'react';
import styled, { css } from 'styled-components';

import { setJustify, setDirection, setAlign } from 'theme/text';
import { FlexDirection, Justify, AlignItems } from 'types';

interface RowProps {
  /**
   * O Conteudo do component
   */
  children?: React.ReactNode;
  /**
   * Define como os flex items são colocados no
   * flex container definindo o eixo principal e a direção
   *
   * @default 'row'
   */
  direction?: FlexDirection;
  /**
   * Define como o navegador distribui o espaço entre e ao redor
   * dos itens de conteúdo ao longo do eixo principal de um flex container,
   *
   * @default 'normal'
   */
  justify?: Justify;
  /**
   * Define o valor de alinhamento próprio em todos os filhos diretos como um grupo
   *
   * @default 'normal'
   */
  align?: AlignItems;
  /**
   * Ordena o elemento usando flex-box para o inicio
   *
   * @default false
   */
  first?: boolean;
  /**
   * Ordena o elemento usando flex-box para o final
   *
   * @default false
   */
  last?: boolean;
}

const Content = styled.div<RowProps>`
  box-sizing: border-box;
  display: flex;
  flex: 0 1 auto;
  flex-direction: row;
  flex-wrap: wrap;
  margin-right: calc(var(--gutter-width, 30px) / 2 * -1);
  margin-left: calc(var(--gutter-width, 30px) / 2 * -1);

  ${({ justify }) => justify && setJustify(justify)};
  ${({ direction }) => direction && setDirection(direction)};
  ${({ align }) => align && setAlign(align)};

  ${({ first }) =>
    first &&
    css`
      order: -1;
    `}
  ${({ last }) =>
    last &&
    css`
      order: 1;
    `}
`;

function Row({
  justify,
  direction = 'row',
  align = 'normal',
  first = false,
  last = false,
  children,
  ...rest
}: RowProps): JSX.Element {
  return (
    <Content
      justify={justify}
      direction={direction}
      align={align}
      first={first}
      last={last}
      {...rest}
    >
      {children}
    </Content>
  );
}

export default Row;
