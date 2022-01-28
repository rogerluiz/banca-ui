import React from 'react';
import styled, { css } from 'styled-components';

import { ColorVariant } from 'types';

interface ButtonGroupProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  gap?: boolean;
  variant?: ColorVariant;
}

const Group = styled.div<ButtonGroupProps>`
  position: relative;
  display: inline-flex;
  vertical-align: middle;

  div {
    button {
      position: relative;
      flex: 1 1 auto;
    }

    ${(props) =>
      !props.gap &&
      css`
        &:not(:last-child) {
          button {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }
        }

        &:not(:first-child) {
          button {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
          }
        }
      `};
  }

  ${(props) =>
    props.gap &&
    css`
      margin-left: -4px;
      margin-right: -4px;

      div {
        padding-left: 4px;
        padding-right: 4px;
      }
    `};
`;

export const groupItemStyles = {
  flex: '1 0 auto',
  display: 'flex',

  '& + &::before': {
    content: `''`,
    display: 'inline-block',
  },
};

const GroupItem = styled.div`
  flex: '1 0 auto';
  display: 'flex';
`;

function ButtonGroup({
  gap,
  variant = 'primary',
  children,
  ...rest
}: ButtonGroupProps) {
  return (
    <Group role="group" gap={gap} {...rest}>
      {React.Children.map(children, (child, idx) => {
        if (!child) {
          return null;
        }
        return (
          // eslint-disable-next-line react/no-array-index-key
          <GroupItem key={idx}>
            {variant
              ? React.cloneElement(child as JSX.Element, { variant })
              : child}
          </GroupItem>
        );
      })}
    </Group>
  );
}

export default ButtonGroup;
