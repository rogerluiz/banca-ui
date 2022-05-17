import React from 'react';
import styled from 'styled-components';

export interface SelectOptionProps
  extends React.ComponentPropsWithoutRef<'li'> {
  children: React.ReactNode | React.ReactNode[];
  onKeyDown?: (event: React.KeyboardEvent) => void;
  value?: string;
  onClick?: (event: React.MouseEvent) => void;
}

const Option = styled.li`
  color: var(--gray40);
  display: block;
  height: 40px;
  font-size: 16px;
  line-height: 30px;
  padding: 5px 15px;
  white-space: nowrap;
  cursor: pointer;
  transition: all 300ms ease;

  &:focus {
    background-color: var(--gray10);
  }

  &:hover {
    background-color: var(--gray10);
  }

  &.selected {
    color: var(--white);
    background-color: var(--secondary);
  }
`;

function SelectOption({
  children,
  onKeyDown,
  onClick,
  value,
  ...rest
}: SelectOptionProps) {
  return (
    <Option
      tabIndex={0}
      role="option"
      onKeyDown={onKeyDown}
      onClick={onClick}
      value={value}
      {...rest}
    >
      {children}
    </Option>
  );
}

export default SelectOption;
