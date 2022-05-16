import {
  forwardRef,
  MouseEventHandler,
  ReactNode,
  HtmlHTMLAttributes,
  ReactElement,
  MouseEvent as ReactMouseEvent,
  Ref,
  useCallback,
} from 'react';
import styled, { css } from 'styled-components';

import type { Sizes as DefaultSize } from 'types';
import { difference } from 'helpers/colors';
import { useImage } from 'hooks';

import Icon from './icon';
import Image from './image';

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

export interface AvatarProps extends HtmlHTMLAttributes<HTMLElement> {
  /**
   * The badge in the bottom right corner of the avatar.
   */
  children?: ReactNode;
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
   * If `true`, the `Avatar` will show a border around it.
   *
   * Best for a group of avatars
   */
  showBorder?: boolean;
  /**
   * Cor da borda
   */
  borderColor?: string;
  /**
   * Define um nome
   */
  name?: string;
  /**
   * Caminho da imagem
   */
  src?: string;
  /**
   * Cor de fundo
   */
  backgroundColor?: string;
  /**
   * The default avatar used as fallback when `name`, and `src`
   * is not specified.
   * @type React.ReactElement
   */
  icon?: ReactElement;
  iconLabel?: string;
  /**
   * Defines loading strategy
   */
  loading?: 'eager' | 'lazy';
  /**
   * If `true`, opt out of the avatar's `fallback` logic and
   * renders the `img` at all times.
   */
  ignoreFallback?: boolean;
  /**
   * Function to get the initials to display
   */
  getInitials?: (name: string) => string;
  /**
   * Funcyion called when clicked
   */
  onClick?: MouseEventHandler;
  /**
   * Function called when image failed to load
   */
  onError?: () => void;
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

const Container = styled.span<AvatarProps>`
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
  background: var(--gray30);
  margin: 2px;
  padding: 0;
  position: relative;
  border: 2px solid transparent;

  ${({ showBorder, borderColor }) =>
    showBorder &&
    css`
      border: 2px solid var(--${borderColor});
    `};

  i {
    font-size: ${(props) => FontSizes[props.size as keyof typeof FontSizes]}px;
    color: ${({ backgroundColor }) => difference(backgroundColor as string)};
  }

  ${({ appearance }) => setAppearance(appearance)};
  ${({ backgroundColor }) => setBackground(backgroundColor)};
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

function initials(name: string) {
  const [firstName, lastName] = name.split(' ');

  return firstName && lastName
    ? `${firstName.charAt(0)}${lastName.charAt(0)}`
    : firstName.charAt(0);
}

function Avatar(
  {
    src,
    size = 'md',
    name,
    onClick,
    borderColor = 'white',
    backgroundColor,
    appearance = 'circle',
    ignoreFallback,
    onError,
    icon,
    iconLabel = 'person',
    showBorder = true,
    loading,
    ...rest
  }: AvatarProps,
  ref?: Ref<HTMLSpanElement>,
) {
  // const [loading, setLoading] = useState<boolean>(false);

  const handleOnClick = useCallback(
    (event: ReactMouseEvent<Element, MouseEvent>) => {
      if (onClick) {
        onClick(event);
      }
    },
    [onClick],
  );

  /**
   * use the image hook to only show the image when it has loaded
   */
  const status = useImage({ src, onError, ignoreFallback });

  const hasLoaded = status === 'loaded';
  const showFallback = !src || !hasLoaded;

  const renderFallback = useCallback(() => {
    return name ? (
      <Text role="img" aria-label={name}>
        {initials?.(name)}
      </Text>
    ) : (
      icon || <Icon role="img" aria-label={name} name={iconLabel} />
    );
  }, [name, iconLabel, icon]);

  return (
    <Container
      ref={ref}
      size={size}
      appearance={appearance}
      role="presentation"
      showBorder={showBorder}
      borderColor={borderColor}
      backgroundColor={backgroundColor}
      onClick={handleOnClick}
      {...rest}
    >
      {!showFallback ? (
        <Image
          src={src}
          alt={name || ''}
          loading={loading}
          data-testid="avatar-image"
          roundedCircle={appearance === 'circle'}
          rounded={appearance === 'square'}
        />
      ) : (
        renderFallback()
      )}
    </Container>
  );
}

export default forwardRef(Avatar);
