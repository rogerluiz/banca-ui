import React, { forwardRef } from 'react';
import styled, { keyframes } from 'styled-components';

import { ColorVariant, Sizes } from 'types';

enum LoadingSize {
  sm = 20,
  md = 40,
  lg = 80,
}

enum Offset {
  sm = 85,
  md = 185,
  lg = 410,
}

enum Stroke {
  sm = 5,
  md = 8,
  lg = 12,
}

interface CircularLoaderProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  size?: Omit<Sizes, 'xs' | 'xl'>;
  isInline?: boolean;
  color?: ColorVariant;
}
function widthAnim(size: Sizes) {
  return keyframes`
    0% {
      stroke-dashoffset: ${Offset[size as keyof typeof Offset]};
    }
    50% {
      stroke-dashoffset: 0;
    }
    100% {
      stroke-dashoffset: ${Offset[size as keyof typeof Offset] * -1};
    }
  `;
}

const rotateAnim = keyframes`
  0% {
    transform: rotate(0) translate3d(0, 0, 0);
  }

  100% {
    transform: rotate(360deg) translate3d(0, 0, 0);
  }
`;

const Container = styled.div<CircularLoaderProps>`
  width: ${({ size }) => LoadingSize[size as keyof typeof LoadingSize]}px;
  height: ${({ size }) => LoadingSize[size as keyof typeof LoadingSize]}px;
  display: ${({ isInline }) => (isInline ? 'inline-flex' : 'flex')};
  justify-content: center;
  align-items: center;
`;

const Circle = styled.circle<CircularLoaderProps>`
  fill: none;
  stroke-linecap: round;
  animation: ${({ size }) => widthAnim(size as Sizes)} 2s linear infinite,
    ${rotateAnim} 2s linear infinite;
  transform-origin: 50% 50%;
  stroke: var(--${({ color }) => color || 'info'});
  stroke-dasharray: ${(props) => Offset[props.size as keyof typeof Offset]};
`;

const CircularLoader = forwardRef<HTMLDivElement, CircularLoaderProps>(
  function CircularLoader(
    { color, isInline = false, size = 'md', ...rest },
    ref,
  ) {
    const boxSize = LoadingSize[size as keyof typeof LoadingSize];

    function getStrokeSize() {
      return Stroke[size as keyof typeof Stroke];
    }

    return (
      <Container
        ref={ref}
        size={size}
        isInline={isInline}
        role="progressbar"
        {...rest}
      >
        <svg
          width={boxSize}
          height={boxSize}
          viewBox={`0 0 ${boxSize * 2} ${boxSize * 2}`}
        >
          <Circle
            size={size}
            color={color}
            cx={boxSize}
            cy={boxSize}
            r={boxSize - getStrokeSize()}
            strokeWidth={getStrokeSize()}
          />
        </svg>
      </Container>
    );
  },
);

export default CircularLoader;
