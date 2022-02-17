import {
  forwardRef,
  Ref,
  ImgHTMLAttributes,
  useCallback,
  ReactEventHandler,
} from 'react';
import styled, { css } from 'styled-components';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /**
   * Especifica o caminho para a imagem
   */
  src: string;
  /**
   * Especifica um texto alternativo para uma imagem
   */
  alt: string;
  /**
   * Caso `true` deixa a imagem com 100% na largura
   * @default false
   */
  fluid?: boolean;
  /**
   * Caso `true` adiciona um border-radius na imagem
   * @default false
   */
  rounded?: boolean;
  /**
   * Caso `true` transforma a imagem em um circulo
   * @default false
   */
  roundedCircle?: boolean;
  /**
   * Display da imagem
   * @default 'block'
   */
  display?: 'inline-block' | 'block';
  /**
   * Chama o metodo quando a imagem for carregada
   * @default undefined
   */
  onLoad?: ReactEventHandler<HTMLImageElement> | undefined;
  /**
   * Chama o metodo quando um erro acontecer no carregamento
   * @default undefined
   */
  onError?: ReactEventHandler<HTMLImageElement> | undefined;
}

const Img = styled.img<ImageProps>`
  display: ${(props) => props.display};
  outline: none;
  border-style: none;

  ${({ rounded }) =>
    rounded &&
    css`
      border-radius: 4px;
    `};

  ${({ roundedCircle }) =>
    roundedCircle &&
    css`
      border-radius: 50%;
    `};

  ${({ fluid }) =>
    fluid &&
    css`
      width: 100%;
      display: block;
      max-width: 100%;
    `};
`;

function Image(
  {
    src,
    alt,
    fluid = false,
    rounded = false,
    roundedCircle = false,
    display = 'block',
    onLoad,
    onError,
    ...rest
  }: ImageProps,
  ref: Ref<HTMLImageElement>,
): JSX.Element {
  const onHandleLoad = useCallback(
    (event) => {
      if (onLoad) onLoad(event);
    },
    [onLoad],
  );

  const onHandleError = useCallback(
    (event) => {
      if (onError) onError(event);
    },
    [onError],
  );

  return (
    <Img
      ref={ref}
      src={src}
      alt={alt}
      fluid={fluid}
      rounded={rounded}
      roundedCircle={roundedCircle}
      display={display}
      onLoad={onHandleLoad}
      onError={onHandleError}
      {...rest}
    />
  );
}

export default forwardRef(Image);
