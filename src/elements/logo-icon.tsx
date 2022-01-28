import React from 'react';
import styled from 'styled-components';
import { ColorVariant, Sizes } from 'types';

enum SizesWidth {
  xs = 19,
  sm = 24,
  md = 36,
  lg = 50,
  xl = 67,
}

enum SizesHeight {
  xs = 15,
  sm = 21,
  md = 31,
  lg = 41,
  xl = 56,
}

export interface LogoIconProps extends React.HtmlHTMLAttributes<HTMLElement> {
  size?: Sizes;
  color?: ColorVariant;
}
// React.SVGAttributes<SVGElement> {

const Container = styled.div<LogoIconProps>`
  display: inline-block;
  position: relative;
  user-select: none;
  width: ${({ size }) => SizesWidth[size as keyof typeof SizesWidth]}px;
  height: ${({ size }) => SizesHeight[size as keyof typeof SizesHeight]}px;
`;

const SVG = styled.svg<LogoIconProps>`
  top: 0.04rem;
  left: 0;
  width: 100%;
  height: 100%;
  fill-rule: evenodd;
  clip-rule: evenodd;
  stroke-linejoin: round;
  stroke-miterlimit: 2;
  fill: var(--${({ color }) => color});
  position: absolute;
`;
function LogoIcon({
  size = 'md',
  color = 'gray100',
  ...rest
}: LogoIconProps): JSX.Element {
  return (
    <Container size={size} role="presentation" {...rest}>
      <SVG
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 170"
        aria-hidden="true"
        focusable="false"
        color={color}
      >
        <path d="M199.9 153.707h-74.563c-8.108 1.84-12.93 6.985-13.514 16.407H88.24c-1.113-8.537-5.458-14.176-13.514-16.407H.112v-.026H-.1V.05h81.293C88.4.374 93.488 3.273 99.53 11.63c4.4-8.193 12.93-11.484 20.297-11.58H199.9v153.657zM23.482 130.14h57.71c7.737.853 12.295 3.222 18.336 11.58 3.87-6.603 12.93-11.484 20.297-11.58h56.492V23.617h-50.98c-5.988.25-12.93 5.395-13.514 16.407H88.24c-.583-11.187-8.108-16.296-13.514-16.407H23.482V130.14z" />
      </SVG>
    </Container>
  );
}

export default LogoIcon;
