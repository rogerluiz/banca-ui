import React, { forwardRef, Ref, useCallback, useState } from 'react';
import styled, { css } from 'styled-components';

import Input from 'elements/input';
import MessageError from 'elements/message-error';
import { ColorVariant, Sizes } from 'types';

enum InputSizes {
  sm = '35px',
  md = '45px',
  lg = '55px',
}

enum LabelSizes {
  sm = '9px 7px',
  md = '13px 7px',
  lg = '18px 7px',
}

enum FontSizes {
  sm = '14px',
  md = '16px',
  lg = '17px',
}

export interface TextFieldProps extends React.HtmlHTMLAttributes<HTMLElement> {
  /**
   * Texto para o label do text field
   */
  label?: string;
  /**
   * Caso `true` foca o input
   * @default false
   */
  isFocus?: boolean;
  /**
   * Caso `true` mostra que o input esta vazio
   * @default false
   */
  isEmpty?: boolean;
  /**
   * Caso `true` deixa o input em modo somente leitura
   * @default false
   */
  isReadyOnly?: boolean;
  /**
   * Caso `true` mostra uma msg de erro
   * @default false
   */
  error?: string;
  /**
   * Caso `true` desabilitado o input
   */
  disabled?: boolean;
  /**
   * Especifica que um campo de entrada deve ser preenchido antes de enviar o formulário
   * @default false
   */
  isRequired?: boolean;
  /**
   * Especifica o nome do <input>
   */
  name?: string;
  /**
   * Especifica o valor do <input>
   */
  value?: any;
  /**
   * Especifica o valor default do <input>
   */
  defaultValue?: any;
  /**
   * Especifica uma dica curta que descreve o valor esperado do <input>
   */
  placeholder?: string;
  /**
   * Especifica o número máximo de caracteres permitidos no <input>
   */
  maxLength?: number;
  /**
   * Especifica o elemento tipo <input> a ser exibido
   * @default 'text'
   */
  type?: 'text' | 'password' | 'number' | 'tel' | 'email';
  /**
   * Caso `true` o preenchimento automático ativado
   * @default 'off'
   */
  autoComplete?: 'on' | 'off';
  /**
   * Caso `true` deve obter foco automaticamente quando for carregado
   * @default false
   */
  autoFocus?: boolean;
  /**
   * Cor do input
   * @default 'primary'
   */
  color?: ColorVariant;
  /**
   * Define o tamaho do input
   * @default 'md'
   */
  size?: Omit<Sizes, 'xs' | 'xl'>;
}

const Base = styled.div<TextFieldProps>`
  width: 100%;
  height: auto;
  border: 0;
  margin: 0;
  display: inline-flex;
  padding: 0;
  position: relative;
  min-width: 0;
  flex-direction: column;
  vertical-align: top;
  border-radius: 4px;
  cursor: text;
  font-size: 16px;
  border: 1px solid var(--gray40);
  color: var(--gray60);
  box-sizing: border-box;
  transition: border 200ms cubic-bezier(0, 0, 0.2, 1) 0ms,
    box-shadow 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;

  ${({ isFocus }) =>
    isFocus &&
    css`
      border: 1px solid var(--info);
      box-shadow: 0 0 0px 1px var(--info);
    `};

  ${({ disabled }) =>
    disabled &&
    css`
      border: 1px solid var(--gray20);
      background: var(--gray10);
    `};

  &:hover {
    ${({ isFocus, disabled }) =>
      !isFocus &&
      !disabled &&
      css`
        border: 1px solid var(--black);
      `};
  }

  ${({ size }) =>
    size &&
    css`
      height: ${InputSizes[size as keyof typeof InputSizes]};
    `};
`;

const Label = styled.label<TextFieldProps>`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 15px 7px;
  position: absolute;
  color: var(--gray40);
  pointer-events: none;
  z-index: 1;
  transform-origin: 0 center;
  transform: translate(0, 0) scale(1);
  transition: color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms,
    transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;

  ${({ size }) =>
    size &&
    css`
      font-size: ${FontSizes[size as keyof typeof FontSizes]};
    `};

  ${({ isFocus }) =>
    isFocus &&
    css`
      width: auto;
      height: 20px;
      padding: 2px 7px;
      display: inline-block;
      color: var(--info);
      background: var(--white);
      transform: translate(10px, -11px) scale(0.8);
    `};

  ${({ isEmpty, isFocus }) =>
    isEmpty &&
    !isFocus &&
    css`
      width: auto;
      height: 20px;
      padding: 2px 7px;
      display: inline-block;
      color: var(--gray40);
      background: var(--white);
      transform: translate(10px, -11px) scale(0.8);
    `};

  ${({ size, isFocus }) =>
    size &&
    css`
      padding: ${LabelSizes[size as keyof typeof LabelSizes]};

      ${isFocus &&
      css`
        height: 20px;
        padding: 2px 7px;
      `};
    `};
`;

function TextField(
  {
    id = undefined,
    onBlur,
    onFocus,
    onChange,
    onInput,
    value,
    name,
    defaultValue,
    placeholder,
    isRequired,
    maxLength,
    autoFocus,
    autoComplete = 'off',
    size = 'md',
    type = 'text',
    disabled = false,
    label = '',
    isEmpty = false,
    isFocus = false,
    error,
    ...rest
  }: TextFieldProps,
  ref?: Ref<HTMLInputElement>,
) {
  const [focused, setFocused] = useState(isFocus);
  const [hasValue, setHasValue] = useState(isEmpty);
  // const [hasError, setHasError] = useState(error);

  const handleInputBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      setHasValue(event.target.value !== '');
      setFocused(false);

      if (onBlur) {
        onBlur(event);
      }
    },
    [onBlur],
  );

  const handleInputFocus = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      setFocused(true);

      if (onFocus) {
        onFocus(event);
      }
    },
    [onFocus],
  );

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(event);
      }
    },
    [onChange],
  );

  const handleOnInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.type === 'number' && event.target.maxLength > -1) {
        if (event.target.value.length > event.target.maxLength) {
          // eslint-disable-next-line no-param-reassign
          event.target.value = event.target.value.slice(
            0,
            event.target.maxLength,
          );
        }
      }

      if (onInput) {
        onInput(event);
      }
    },
    [onInput],
  );

  return (
    <>
      <Base
        id={id}
        name={name}
        size={size}
        isFocus={focused || hasValue}
        isEmpty={!hasValue}
        disabled={disabled}
        error={error}
        ref={ref}
        {...rest}
      >
        <Label
          isFocus={focused || hasValue}
          isEmpty={!hasValue}
          disabled={disabled}
          size={size}
          id={id ? `${id}-label` : undefined}
          htmlFor={id ? `${id}-input` : undefined}
        >
          {label}
        </Label>
        <Input
          id={id ? `${id}-input` : undefined}
          type={type}
          name={name}
          onBlur={handleInputBlur}
          onFocus={handleInputFocus}
          onChange={handleInputChange}
          onInput={handleOnInput}
          value={value}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          defaultValue={defaultValue}
          placeholder={placeholder}
          maxLength={maxLength}
          required={isRequired}
          disabled={disabled}
          aria-invalid="false"
        />
      </Base>
      {error && !focused && <MessageError>{error}</MessageError>}
    </>
  );
}

export default forwardRef(TextField);
