import React, { forwardRef, Ref } from 'react';
import styled from 'styled-components';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  defaultValue?: any;
}

const BaseInput = styled.input<InputProps>`
  color: inherit;
  width: 100%;
  border: 0;
  height: 100%;
  margin: 0;
  display: block;
  padding: 0 7px;
  min-width: 0;
  font-size: inherit;
  background: none;
  font-weight: 400;
  letter-spacing: inherit;
  -webkit-tap-highlight-color: transparent;
  border-radius: 4px;
  background: var(--white);

  &[type='number']::-webkit-inner-spin-button,
  &[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }

  &:focus {
    outline: 0;
  }
`;

function Input(
  { defaultValue, ...rest }: InputProps,
  ref?: Ref<HTMLInputElement>,
): JSX.Element {
  return <BaseInput ref={ref} defaultValue={defaultValue} {...rest} />;
}

export default forwardRef(Input);
