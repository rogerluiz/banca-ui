import React, {
  Children,
  forwardRef,
  useCallback,
  PropsWithChildren,
  ReactElement,
  useRef,
  useState,
  useMemo,
} from 'react';
import styled, { css } from 'styled-components';

import {
  // SPACEBAR_KEY_CODE,
  ENTER_KEY_CODE,
  DOWN_ARROW_KEY_CODE,
  UP_ARROW_KEY_CODE,
  ESCAPE_KEY_CODE,
} from 'constants/keyboarding';
import { useMergeRefs, useOutsideClick } from 'hooks';
import { Sizes } from 'types';
import Icon from './icon';
import SelectOption, { SelectOptionProps } from './select-option';

enum SizesEnum {
  sm = '35px',
  md = '45px',
  lg = '55px',
}

enum FontSizes {
  sm = '14px',
  md = '16px',
  lg = '17px',
}

export type SelectOptions = {
  id: number;
  value: string;
  label: string;
};

export interface SelectProps extends React.ComponentPropsWithoutRef<'div'> {
  id?: string;
  name?: string;
  isDisabled?: boolean;
  isReadyOnly?: boolean;
  fullWidth?: boolean;
  isRequired?: boolean;
  isOpen?: boolean;
  value?: string;
  label?: string;
  width?: string | number;
  direction?: 'bottom' | 'top';
  color?: 'primary' | 'secondary';
  size?: Sizes;
  onChange?: (event: any) => void;
  children: React.ReactNode | React.ReactNode[];
}

type SelectButtonType = Pick<
  SelectProps,
  'isOpen' | 'size' | 'width' | 'direction'
>;

const Container = styled.div`
  height: 45px;
  max-width: 250px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  position: relative;
  box-sizing: border-box;
  padding: 0px;
  outline: 0px !important;

  &:focus {
    outline: none;
  }
`;

const Button = styled.button<SelectButtonType>`
  width: 100%;
  min-width: 150px;
  border: none;
  border-radius: 4px;
  outline: none;
  display: flex;
  justify-content: start;
  align-items: center;
  color: var(--gray40);
  font-size: 16px;
  box-sizing: border-box;
  padding: 3px 10px;
  background: var(--white);
  border: 1px solid var(--gray40);
  height: 45px;
  flex: 1 0 auto;
  cursor: pointer;
  transition: border-radius 0ms ease-in-out 300ms, border 0ms ease 300ms;

  &:focus {
    outline: none;
    border-color: var(--secondary);
  }

  ${(props) =>
    props.width &&
    css`
      width: ${props.width};
    `};

  ${(props) =>
    props.size &&
    css`
      font-size: ${FontSizes[props.size as keyof typeof FontSizes]};
      height: ${SizesEnum[props.size as keyof typeof SizesEnum]};
    `};

  ${(props) =>
    props.isOpen &&
    css`
      border-color: var(--secondary);
      transition: border-radius 0ms ease-in-out, border 0ms ease;

      i {
        color: var(--secondary);
        transform: rotate(180deg);
      }

      &:before {
        content: '';
        display: block;
        position: absolute;
        height: 1px;
        width: 99%;
        box-shadow: 0 6px 5px rgba(0, 0, 0, 0.2);
        top: 41px;
        z-index: 120;
        background: white;
        left: 0;
        right: 0;
        margin: auto;
      }

      ${props.direction === 'bottom' &&
      css`
        border-bottom: 1px solid transparent;
        border-radius: 4px 4px 0 0;
      `};

      ${props.direction === 'top' &&
      css`
        border-top: 1px solid transparent;
        border-radius: 0 0 4px 4px;
      `};
    `};

  i {
    margin-left: auto;
    transform-origin: center center;
    transition: all 300ms ease;
  }
`;

const Pooper = styled.div<Pick<SelectProps, 'isOpen' | 'direction'>>`
  max-height: 0;
  top: calc(100% + 3px);
  min-width: 100%;
  width: auto;
  overflow: hidden;
  position: absolute;
  display: flex;
  flex-direction: column;
  background: var(--white);
  border-radius: 4px;
  border: 1px solid transparent;
  transition: max-height 300ms ease-in-out, border 0ms ease 300ms,
    visibility 0ms ease 300ms;
  z-index: 100;
  visibility: hidden;

  ${(props) =>
    props.isOpen &&
    css`
      max-height: 220px;
      visibility: visible;
      border-color: var(--secondary);
      transition: max-height 300ms ease-in-out, border 0ms ease,
        visibility 0ms ease;
    `};

  ${(props) =>
    props.direction === 'bottom' &&
    css`
      top: 44px;
      border-top: 0;
      border-radius: 0 0 4px 4px;
    `};

  ${(props) =>
    props.direction === 'top' &&
    css`
      bottom: 44px;
      border-bottom: 0;
      border-radius: 4px 4px 0 0;
    `};
`;

const OptionList = styled.ul`
  width: 100%;
  display: flex;
  max-width: 250px;
  max-height: 220px;
  flex-direction: column;
  list-style: none;
  flex: 1 0 auto;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
`;

function Select(props: SelectProps, ref: React.Ref<HTMLDivElement>) {
  const {
    id,
    isOpen,
    name,
    size = 'md',
    isDisabled,
    label = 'Selecione',
    value,
    onChange,
    direction = 'bottom',
    children,
    ...rest
  } = props;

  // color = '',
  // options = [],
  // isDisabled = false,
  // isReadyOnly = false,

  const [open, setOpen] = useState(isOpen);
  const [optionValue, setOptionValue] = useState(value || '');
  const [placeholder, setPlaceholder] = useState(label);

  // refs
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const combineRef = useMergeRefs<HTMLDivElement>(wrapperRef, ref);

  const focusNextListItem = useCallback(
    (keyDirection: number) => {
      if (listRef && listRef?.current) {
        const activeElementId =
          document.activeElement && document.activeElement.id;
        const listArray = [...listRef.current.childNodes];

        if (activeElementId === `${id}-button`) {
          (listRef.current.childNodes[0] as HTMLElement)?.focus();
        } else {
          const currentActiveElementIndex = listArray.indexOf(
            document.activeElement as HTMLElement,
          );

          if (keyDirection === DOWN_ARROW_KEY_CODE) {
            const currentActiveElementIsNotLastItem =
              currentActiveElementIndex < listArray.length - 1;

            if (currentActiveElementIsNotLastItem) {
              (
                listRef.current.childNodes[
                  currentActiveElementIndex + 1
                ] as HTMLElement
              )?.focus();
            }
          }

          if (keyDirection === UP_ARROW_KEY_CODE) {
            const currentActiveElementIsNotLastItem =
              currentActiveElementIndex > 0;

            if (currentActiveElementIsNotLastItem) {
              (
                listRef.current.childNodes[
                  currentActiveElementIndex - 1
                ] as HTMLElement
              )?.focus();
            }
          }
        }
      }
    },
    [listRef, id],
  );

  const handleClickToggle = useCallback(() => {
    setOpen(!open);
  }, [open]);

  const handleToggle = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      if (event.keyCode === ESCAPE_KEY_CODE) {
        setOpen(false);
      }

      if (event.keyCode === ENTER_KEY_CODE) {
        setOpen(!open);
      }

      if (event.keyCode === DOWN_ARROW_KEY_CODE) {
        focusNextListItem(DOWN_ARROW_KEY_CODE);
      }

      if (event.keyCode === UP_ARROW_KEY_CODE) {
        focusNextListItem(UP_ARROW_KEY_CODE);
      }
    },
    [open, focusNextListItem],
  );

  const handleOptionClick = useCallback(
    (
      target: React.ReactNode | React.ReactElement | EventTarget,
      optValue: string,
      optLabel: string,
      index: number,
    ) => {
      setOptionValue(optValue);
      setOpen(false);
      setPlaceholder(optLabel);

      onChange?.({ target, value: optValue, index });
    },
    [onChange],
  );

  const closeAndFocus = useCallback(() => {
    setOpen(false);

    window.setTimeout(() => {
      if (buttonRef && buttonRef?.current) {
        buttonRef?.current.focus();
      }
    }, 100);
  }, []);

  const handleKeyDown = useCallback(
    (
      event: React.KeyboardEvent,
      optValue: string,
      optLabel: string,
      index: number,
    ) => {
      switch (event.keyCode) {
        case ENTER_KEY_CODE:
          setOptionValue(optValue);
          setPlaceholder(optLabel);
          closeAndFocus();
          onChange?.({ target: event.target, value: optValue, index });
          break;
        case ESCAPE_KEY_CODE:
          closeAndFocus();
          break;
        case DOWN_ARROW_KEY_CODE:
          event.preventDefault();
          focusNextListItem(DOWN_ARROW_KEY_CODE);
          break;
        case UP_ARROW_KEY_CODE:
          event.preventDefault();
          focusNextListItem(UP_ARROW_KEY_CODE);
          break;
        default:
          break;
      }
    },
    [focusNextListItem, onChange, closeAndFocus],
  );

  useOutsideClick({
    enabled: open,
    ref: wrapperRef,
    handler: (event: any) => {
      if (!wrapperRef.current?.contains(event.target as HTMLElement)) {
        setOpen(false);
      }
    },
  });

  const renderOption = useMemo(() => {
    return Children.map(children, (child, i) => {
      const childElement = child as ReactElement<
        PropsWithChildren<SelectOptionProps>
      >;
      if (childElement.type === SelectOption) {
        const optValue = childElement.props.value as string;
        const optLabel = childElement.props.children as string;
        const onClick = (event: React.MouseEvent) => {
          handleOptionClick(event.target, optValue, optLabel, i);

          childElement.props.onClick?.(event);
        };

        const onKeyDown = (event: React.KeyboardEvent) => {
          handleKeyDown(event, optValue, optLabel, i);
        };

        return React.cloneElement(childElement, {
          id: `option-${optValue}`,
          onKeyDown,
          onClick,
        });
      }

      return child;
    });
  }, [children, handleKeyDown, handleOptionClick]);

  return (
    <Container ref={combineRef} id={id} tabIndex={-1} {...rest}>
      <Button
        ref={buttonRef}
        type="button"
        size={size}
        role="button"
        isOpen={open}
        // width={width}
        direction={direction}
        tabIndex={0}
        id={`${id}-button`}
        onClick={handleClickToggle}
        onKeyDown={handleToggle}
      >
        {placeholder}
        <Icon name="arrow-ios-downward" />

        <input
          id={id && `${id}-input`}
          type="hidden"
          name={name}
          value={optionValue}
        />
      </Button>
      <Pooper
        ref={innerRef}
        isOpen={open}
        direction={direction}
        aria-hidden={!open}
        aria-expanded={open}
      >
        <OptionList
          ref={listRef}
          role="listbox"
          aria-activedescendant={`option-${optionValue}`}
          tabIndex={-1}
        >
          {renderOption}
        </OptionList>
      </Pooper>
    </Container>
  );
}

// interface SelectNotationType {
//   Option: typeof SelectOption;
// }

// type SelectComponent = React.ForwardRefExoticComponent<SelectProps> &
//   SelectNotationType;

Select.Option = SelectOption;

// export default forwardRef(Select) as SelectComponent;
export default Object.assign(forwardRef(Select), {
  Option: SelectOption,
});
