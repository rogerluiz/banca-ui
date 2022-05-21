import React, { forwardRef, Ref } from 'react';
import styled from 'styled-components';

type IconType = {
  prefix: string;
  iconName: any;
};
interface IconProps extends React.HtmlHTMLAttributes<HTMLElement> {
  size?:
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | '1x'
    | '2x'
    | '3x'
    | '4x'
    | '5x'
    | '6x'
    | '7x'
    | '8x'
    | '9x'
    | '10x';
  color?: string;
  fixedWidth?: boolean;
  inverse?: boolean;
  spin?: boolean;
  border?: boolean;
  pulse?: boolean;
  pull?: 'right' | 'left';
  rotation?: 90 | 180 | 270;
  flip?: 'horizontal' | 'vertical' | 'both';
  name?: string | string[] | object;
  className?: string;
}

const normalizeIcon = (icon: any) => {
  let classes: IconType = { prefix: '', iconName: '' };

  if (typeof icon === 'object' && icon.prefix && icon.iconName) {
    classes = icon;
  }

  if (Array.isArray(icon) && icon.length === 2) {
    const [prefix, iconName] = icon;
    classes = { prefix, iconName };
  }

  if (typeof icon === 'string') {
    classes = { prefix: 'fa-solid', iconName: icon };
  }

  return `${classes.prefix} fa-${classes.iconName}`;
};

const normalizeClassName = (className: string) =>
  className ? className.split(' ') : [];

const classList = (properties: any) => {
  const classes = {
    'fa-spin': properties.spin,
    'fa-inverse': properties.inverse,
    'fa-fw': properties.fixedWidth,
    'fa-border': properties.border,
    'fa-pulse': properties.pulse,
    [`fa-flip-${properties.flip}`]: properties.flip,
    [`fa-rotate-${properties.rotation}`]: properties.rotation,
    [`fa-pull-${properties.pull}`]: properties.pull,
    [`fa-${properties.size}`]: properties.size,
  };

  return Object.keys(classes)
    .map((key) => (classes[key] ? key : null))
    .filter((key) => key);
};

const Container = styled.i<IconProps>`
  color: ${(props) => props.color};
  vertical-align: baseline;
`;

function Icon(
  {
    size = 'md',
    color = 'inherit',
    fixedWidth = false,
    inverse = false,
    spin = false,
    border = false,
    pulse = false,
    pull,
    rotation,
    flip,
    name,
    className = '',
    ...rest
  }: IconProps,
  ref: Ref<HTMLElement>,
): JSX.Element {
  const mergeProps = {
    ...rest,
    size,
    fixedWidth,
    inverse,
    spin,
    border,
    pulse,
    pull,
    rotation,
    flip,
  };

  return (
    <Container
      ref={ref}
      className={[
        normalizeIcon(name),
        ...classList(mergeProps),
        ...normalizeClassName(className),
      ].join(' ')}
      color={color}
      aria-hidden="true"
    />
  );
}

export default forwardRef(Icon);
