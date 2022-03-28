import React, { MouseEventHandler, useCallback } from 'react';
import styled, { css } from 'styled-components';

import type { Sizes as DefaultSize } from 'types';
import { difference } from 'helpers/colors';
import Icon from './icon';

enum Sizes {
  xs = 16,
  sm = 24,
  md = 32,
  lg = 40,
  xl = 96,
}

enum FontSizes {
  xs = 16,
  sm = 24,
  md = 28,
  lg = 35,
  xl = 90,
}

export interface AvatarProps extends React.HtmlHTMLAttributes<HTMLElement> {
  /**
   * O Conteudo do component
   */
  children?: React.ReactNode;
  /**
   * Define a aparecia do avatar
   * @default 'circle'
   */
  appearance?: 'circle' | 'square';
  /**
   * Define o tamanho
   * @default 'md'
   */
  size?: DefaultSize;
  /**
   * Cor da borda
   */
  borderColor?: string;
  /**
   * Hiperlink
   */
  href?: string;
  /**
   * Define um nome
   */
  name?: string;
  /**
   * Path da imagem
   */
  src?: string;
  /**
   * Cor de fundo
   */
  backgroundColor?: string;
  /**
   * Metodo de evento
   */
  onClick?: MouseEventHandler;
}

const setAppearance = (appearance: string | undefined) => {
  return (
    appearance === 'square' &&
    css`
      border-radius: 4px;
    `
  );
};

const setBackground = (backgroundColor: string | undefined) => {
  return (
    backgroundColor &&
    css`
      background-color: ${backgroundColor};
      color: ${difference(backgroundColor)};
    `
  );
};

const setImage = (src: string | undefined) => {
  return (
    src &&
    css`
      background-image: ${`url(${src})`};
      background-size: contain;
      background-repeat: no-repeat;
    `
  );
};

const Container = styled.div<AvatarProps>`
  width: ${(props) => Sizes[props.size as keyof typeof Sizes]}px;
  height: ${(props) => Sizes[props.size as keyof typeof Sizes]}px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  box-sizing: content-box;
  cursor: inherit;
  background: var(--white);
  margin: 2px;
  padding: 0;
  position: relative;
  border: 2px solid white;

  ${(props) =>
    props.href &&
    css`
      cursor: pointer;
    `};

  ${({ appearance }) => setAppearance(appearance)};
`;

const Image = styled.div<AvatarProps>`
  width: 100%;
  height: 100%;
  background-color: var(--gray30);
  display: flex;
  border-radius: 50%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  color: var(--gray90);

  ${({ appearance }) => setAppearance(appearance)};
  ${({ backgroundColor }) => setBackground(backgroundColor)};
  ${({ src }) => setImage(src)};

  i {
    font-size: ${(props) => FontSizes[props.size as keyof typeof FontSizes]}px;
    color: var(--white);
  }
`;

const Text = styled.span<AvatarProps>`
  width: 100%;
  height: 100%;
  display: flex;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  color: inherit;
`;

function Avatar({
  src,
  size = 'md',
  href,
  name,
  onClick,
  borderColor,
  backgroundColor,
  appearance = 'circle',
  ...rest
}: AvatarProps) {
  const handleOnClick = useCallback(
    (event: React.MouseEvent<Element, MouseEvent>) => {
      if (onClick) {
        onClick(event);
      }
    },
    [onClick],
  );

  const render = useCallback(() => {
    return name ? (
      <Text>{name}</Text>
    ) : (
      <Icon role="img" aria-label={name} name="person" />
    );
  }, [name]);

  return (
    <Container
      href={href}
      size={size}
      as={href ? 'a' : undefined}
      appearance={appearance}
      role="presentation"
      borderColor={borderColor}
      onClick={handleOnClick}
      {...rest}
    >
      <Image
        src={src}
        size={size}
        role="img"
        aria-label={name}
        backgroundColor={backgroundColor}
        appearance={appearance}
      >
        {!src ? render() : null}
      </Image>
    </Container>
  );
}

export default Avatar;
