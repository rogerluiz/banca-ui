import React, { HTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

interface GridProps extends HTMLAttributes<HTMLElement> {
  display?: 'grid' | 'inline-grid';
  /**
   * Especifica áreas do grid nomeadas, estabelecendo
   * as células no grid e atribuindo nomes a elas.
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-areas
   */
  areas?: string;
  /**
   * Define o nome das linhas e funções de dimensionamento do rows
   * @see https://developer.mozilla.org/pt-BR/docs/Web/CSS/grid-template-rows
   * @default 'initial'
   */
  rows?: string;
  /**
   * Define os nomes das linhas e funções de dimensionamento da coluna
   * @see https://developer.mozilla.org/pt-BR/docs/Web/CSS/grid-template-columns
   * @default 'initial'
   */
  columns?: string;
  /**
   * Define as lacunas (gutter) entre linhas e colunas.
   * É uma abreviatura para `row-gap` e `column-gap`.
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/gap
   */
  gap?: number;
  /**
   * Define o tamanho da lacuna (gutter) entre as linhas dp grid de um elemento.
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/column-gap
   */
  rowGap?: number;
  /**
   * Define o tamanho da lacuna (gutter) entre as colunas de um elemento
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/column-gap
   */
  columnGap?: number;
  columnStart?: string;
  columnEnd?: string;
  rowStart?: string;
  rowEnd?: string;
  flow?: 'initial' | 'row' | 'column' | 'dense' | 'row dense' | 'column dense';
  /**
   * O Conteudo do component
   */
  children?: React.ReactNode;
}

const Template = styled.div<GridProps>`
  display: ${(props) => props.display};

  ${(props) =>
    props.areas &&
    css`
      grid-template-areas: ${props.areas};
    `};

  ${(props) =>
    props.rows &&
    css`
      grid-template-rows: ${props.rows};
    `};

  ${(props) =>
    props.columns &&
    css`
      grid-template-columns: ${props.columns};
    `};

  ${(props) =>
    props.gap &&
    css`
      grid-gap: ${props.gap * 10}px;
    `};

  ${(props) =>
    props.rowGap &&
    css`
      grid-row-gap: ${props.rowGap * 10}px;
    `};

  ${(props) =>
    props.columnGap &&
    css`
      grid-column-gap: ${props.columnGap * 10}px;
    `};

  ${(props) =>
    props.flow &&
    css`
      grid-auto-flow: ${props.flow};
    `};

  ${(props) =>
    props.columnStart &&
    css`
      grid-column-start: ${props.columnStart};
    `};

  ${(props) =>
    props.columnEnd &&
    css`
      grid-column-end: ${props.columnEnd};
    `};

  ${(props) =>
    props.rowStart &&
    css`
      grid-row-start: ${props.rowStart};
    `};

  ${(props) =>
    props.rowEnd &&
    css`
      grid-row-end: ${props.rowEnd};
    `};
`;

function Grid({
  flow = 'initial',
  display = 'grid',
  areas,
  rows,
  columns,
  gap,
  rowGap,
  columnGap,
  columnStart,
  columnEnd,
  rowStart,
  rowEnd,
  children,
  ...rest
}: GridProps): JSX.Element {
  return (
    <Template
      flow={flow}
      display={display}
      areas={areas}
      rows={rows}
      columns={columns}
      gap={gap}
      rowGap={rowGap}
      columnGap={columnGap}
      columnStart={columnStart}
      columnEnd={columnEnd}
      rowStart={rowStart}
      rowEnd={rowEnd}
      {...rest}
    >
      {children}
    </Template>
  );
}

export default Grid;
