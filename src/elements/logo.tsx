import React, { forwardRef, Ref } from 'react';
import styled from 'styled-components';
import { ColorVariant, Sizes } from 'types';

import Icon, { LogoIconProps } from './logo-icon';
import Wordmark, { LogoWordmarkProps } from './logo-wordmark';

enum SizesWidth {
  xs = 70,
  sm = 100,
  md = 150,
  lg = 200,
  xl = 280,
}

enum SizesHeight {
  xs = 15,
  sm = 21,
  md = 31,
  lg = 42,
  xl = 58,
}

interface LogoProps extends React.HtmlHTMLAttributes<HTMLElement> {
  /**
   * Tamanho do icone `Sizes`
   * @default 'md'
   */
  size?: Sizes;
  /**
   * Cor do icone
   * @default 'gray100'
   */
  color?: ColorVariant;
}

const Container = styled.div<LogoProps>`
  display: inline-block;
  position: relative;
  user-select: none;
  width: ${({ size }) => SizesWidth[size as keyof typeof SizesWidth]}px;
  height: ${({ size }) => SizesHeight[size as keyof typeof SizesHeight]}px;
`;

const SVG = styled.svg<LogoProps>`
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  fill-rule: evenodd;
  clip-rule: evenodd;
  stroke-linejoin: round;
  stroke-miterlimit: 2;
  fill: var(--${({ color }) => color});
  position: absolute;
`;

function Logo(
  { size = 'md', color = 'gray100', ...rest }: LogoProps,
  ref: Ref<HTMLDivElement>,
) {
  return (
    <Container size={size} role="presentation" ref={ref} {...rest}>
      <SVG
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 41"
        aria-hidden="true"
        focusable="false"
        color={color}
      >
        <g transform="matrix(.119669 0 0 .183381 -1463.95 -427.512)">
          <path d="M12626.127 2533.164h-146.204c-15.9 2.353-25.355 8.937-26.498 20.994h-46.24c-2.182-10.924-10.703-18.14-26.498-20.994h-146.308v-.034h-.416v-196.58h159.4c14.132.414 24.108 4.123 35.954 14.816 8.625-10.483 25.355-14.694 39.798-14.816h157v196.614zm-345.923-30.155h113.16c15.17 1.092 24.108 4.123 35.954 14.816 7.586-8.45 25.355-14.694 39.798-14.816h110.77v-136.304h-99.963c-11.742.32-25.355 6.903-26.498 20.994h-46.24c-1.143-14.315-15.9-20.85-26.498-20.994h-100.483v136.304zm483.808-149.63v-16.3h76.234c50.054 0 91.25 13.568 91.25 49.246v5.026c0 22.1-18.478 34.422-44.666 40.45 30.42 6.03 52.368 19.35 52.368 44.474v5.026c0 37.183-42.352 51.76-92.795 51.76h-82.4v-16.4l27.717.074h56.6c33.882 0 62.375-10.554 62.375-36.18v-3.77c0-25.626-28.494-36.18-62.375-36.18h-84.317v-16.334h77.4c33.494 0 61.6-9.044 61.6-33.42v-4.018c0-24.375-28.106-33.42-61.6-33.42h-49.674l-27.717-.02z" />
          <path
            d="M13076.27 2355.9l-76.234 178.143h-30.03l86.63-197.994h39.658l86.63 197.994h-30.03l-76.622-178.143zm722.318 0l-76.234 178.143h-30.03l86.63-197.994h39.658l86.63 197.994h-30.03L13798.6 2355.9z"
            fillRule="nonzero"
          />
          <path d="M13459.328 2431.276c.06-3.894.228-8.73.6-13.26 1.85-22.066 9.414-40.635 23.85-55.802 17.23-18.107 49.065-25.62 81.638-27.365 44.62-2.4 89.773 5.776 89.773 5.776l-7.458 17.546s-40.252-7.306-80.032-5.175c-23.7 1.27-47.68 5.652-60.222 18.827-12.184 12.803-18.128 28.557-19.688 47.185-.487 5.845-.594 12.242-.6 16.14.015 3.9.122 10.295.6 16.14 1.56 18.63 7.504 34.382 19.688 47.185 12.542 13.176 36.523 17.556 60.222 18.827 39.78 2.13 80.032-5.175 80.032-5.175l7.458 17.546s-45.153 8.165-89.773 5.776c-32.573-1.743-64.407-9.257-81.638-27.365-14.437-15.167-22.002-33.736-23.85-55.802-.38-4.53-.548-9.372-.6-13.26h-.023l-.015-3.874.015-3.874h.023zm-236.63-39.622c.122-8.468.5-15.942 2.085-22.428 2.626-10.822 8.5-19.225 19.8-25.512 13.5-7.5 36.104-12.093 74.796-12.416 48.25-.397 72.4 6.85 85.16 18.117 11.8 10.43 14.087 25.348 14.597 44.052h.183v139.585h-25.13l.107-30.657-1.157-45.477v-48.968h-.152l.068-8.537-.015-2.736c-.282-15.763.205-28.507-9.536-37.1-9.422-8.3-28.212-11.492-63.8-11.2-29.864.248-47.748 2.558-58.175 8.348-6.63 3.685-9.384 8.835-10.93 15.182-1.994 8.22-1.773 18.172-1.82 29.853l-.038 8.537h-.038l.038 2.9v119.853h-26.18v-141.397h.114z" />
        </g>
      </SVG>
    </Container>
  );
}

export function LogoIcon(props: LogoIconProps) {
  return <Icon {...props} />;
}
export function LogoWordmark(props: LogoWordmarkProps) {
  return <Wordmark {...props} />;
}

export default forwardRef(Logo);
