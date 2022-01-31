import React from 'react';
import styled from 'styled-components';
import { ColorVariant, Sizes } from 'types';

enum SizesWidth {
  xs = 50,
  sm = 70,
  md = 105,
  lg = 142,
  xl = 202,
}

enum SizesHeight {
  xs = 13,
  sm = 21,
  md = 32,
  lg = 37,
  xl = 54,
}

export interface LogoWordmarkProps
  extends React.HtmlHTMLAttributes<HTMLElement> {
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

const Container = styled.div<LogoWordmarkProps>`
  display: inline-block;
  position: relative;
  user-select: none;
  width: ${(props) => SizesWidth[props.size as keyof typeof SizesWidth]}px;
  height: ${(props) => SizesHeight[props.size as keyof typeof SizesHeight]}px;
`;

const SVG = styled.svg<LogoWordmarkProps>`
  top: -2px;
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

function LogoWordmark({
  size = 'md',
  color = 'gray100',
  ...rest
}: LogoWordmarkProps) {
  return (
    <Container size={size} role="presentation" {...rest}>
      <SVG
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 55"
        aria-hidden="true"
        focusable="false"
        color={color}
      >
        <path d="M.045 5.927v-4.38h13.36c8.772 0 15.99 3.644 15.99 13.225v1.35c0 5.938-3.238 9.244-7.828 10.863 5.33 1.62 9.177 5.196 9.177 11.944v1.35c0 9.986-7.422 13.9-16.262 13.9H.045v-4.407l4.857.02h9.92c5.938 0 10.93-2.834 10.93-9.716v-1.012c0-6.882-4.993-9.716-10.93-9.716H.045V24.96h13.563c5.87 0 10.795-2.43 10.795-8.975v-1.08c0-6.546-4.925-8.975-10.795-8.975H4.902L.045 5.927z" />
        <path
          d="M54.767 6.607l-13.36 47.84h-5.263l15.182-53.17h6.95l15.182 53.172h-5.263L54.767 6.607zm126.586 0l-13.36 47.84h-5.263l15.182-53.172h6.95l15.182 53.172h-5.263l-13.428-47.84z"
          fillRule="nonzero"
        />
        <path d="M121.898 26.846l.107-3.56c.324-5.926 1.65-10.913 4.18-14.986 3.02-4.863 8.6-6.88 14.307-7.35 7.82-.642 15.733 1.55 15.733 1.55l-1.307 4.712s-7.054-1.962-14.026-1.4c-4.153.34-8.356 1.518-10.554 5.056-2.135 3.438-3.177 7.67-3.45 12.672-.085 1.57-.104 3.288-.107 4.335.003 1.047.02 2.765.107 4.335.273 5.003 1.315 9.233 3.45 12.672 2.198 3.538 6.4 4.715 10.554 5.056 6.97.572 14.026-1.4 14.026-1.4l1.307 4.712s-7.913 2.193-15.733 1.55c-5.708-.468-11.287-2.486-14.307-7.35-2.53-4.073-3.856-9.06-4.18-14.986a83.12 83.12 0 0 1-.107-3.561h-.004l-.003-1.04.003-1.04h.004zM80.43 16.206c.02-2.274.1-4.28.365-6.023.46-2.906 1.5-5.163 3.472-6.85 2.366-2.016 6.326-3.25 13.107-3.336 8.456-.107 12.686 1.84 14.924 4.865 2.07 2.8 2.47 6.807 2.558 11.83h.032v37.486h-4.404l.02-8.233-.203-12.213v-13.15h-.027l.012-2.293-.003-.735c-.05-4.233.036-7.656-1.67-9.966-1.65-2.23-4.944-3.086-11.18-3.008-5.234.067-8.368.687-10.195 2.242-1.162 1-1.644 2.373-1.915 4.077-.35 2.207-.3 4.88-.32 8.017l-.007 2.293H85l.007.782v32.187H80.4V16.206h.02z" />
      </SVG>
    </Container>
  );
}

export default LogoWordmark;
