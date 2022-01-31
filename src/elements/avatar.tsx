import React, { MouseEventHandler, useCallback } from 'react';
import styled, { css } from 'styled-components';

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

interface AvatarProps extends React.HtmlHTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  appearance?: 'circle' | 'square';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  borderColor?: string;
  href?: string;
  name?: string;
  src?: string;
  backgroundColor?: string;
  onClick?: MouseEventHandler;
}

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

  ${(props) =>
    props.appearance === 'square' &&
    css`
      border-radius: 4px;
    `};
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

  ${(props) =>
    props.appearance === 'square' &&
    css`
      border-radius: 4px;
    `};

  ${(props) =>
    props.backgroundColor &&
    css`
      background-color: ${props.backgroundColor};

      color: ${difference(props.backgroundColor)};
    `};

  ${(props) =>
    props.src &&
    css`
      background-image: ${`url(${props.src})`};
      background-size: contain;
      background-repeat: no-repeat;
    `};

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

/*
const Avatar: React.FC<AvatarProps> = ({
  src,
  size = 'md',
  href,
  name,
  onClick,
  children,
  borderColor,
  backgroundColor,
  appearance = 'circle',
  ...rest
}) => {
  function handleOnClick(event) {
    if (onClick) {
      onClick(event);
    }
  }

  return (
    <Container
      href={href}
      size={size}
      as={href ? 'a' : undefined}
      appearance={appearance}
      role="presentation"
      onClick={handleOnClick}
      {...rest}
    >
      <Image
        src={src}
        size={size}
        backgroundColor={backgroundColor}
        appearance={appearance}
      >
        {!src ? name ? <Text>{name}</Text> : <Icon icon="person" /> : null}
      </Image>
    </Container>
  );
};

export default Avatar;
*/

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
    return name ? <Text>{name}</Text> : <Icon name="person" />;
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
        backgroundColor={backgroundColor}
        appearance={appearance}
      >
        {!src ? render() : null}
      </Image>
    </Container>
  );
}

export default Avatar;
