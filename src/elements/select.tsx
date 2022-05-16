import React, { forwardRef, useCallback, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

import {
  // SPACEBAR_KEY_CODE,
  ENTER_KEY_CODE,
  DOWN_ARROW_KEY_CODE,
  UP_ARROW_KEY_CODE,
  ESCAPE_KEY_CODE,
} from 'constants/keyboarding';
import { useMergeRefs } from 'hooks';
import { Sizes } from 'types';
import Icon from './icon';

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
  size?: Sizes;
  isDisabled?: boolean;
  isOpen?: boolean;
  label?: string;
  value?: string;
}

type SelectButtonType = Pick<SelectProps, 'isOpen' | 'size'>;

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
    `};

  i {
    margin-left: auto;
    transform-origin: center center;
    transition: all 300ms ease;
  }
`;

const Pooper = styled.div<Pick<SelectProps, 'isOpen'>>`
  max-height: 0;
  top: 100%;
  min-width: 100%;
  width: auto;
  overflow: hidden;
  position: absolute;
  display: flex;
  flex-direction: column;
  background: var(--white);
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
`;

function Select(props: SelectProps, ref: React.Ref<HTMLDivElement>) {
  const { id, isOpen, name, size, isDisabled, label, value, ...rest } = props;

  const [open, setOpen] = useState(isOpen);
  const [optionValue] = useState(value || '');
  const [placeholder] = useState(label);

  // refs
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const combineRef = useMergeRefs<HTMLDivElement>(wrapperRef, ref);

  const focusNextListItem = useCallback(
    (direction: number) => {
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

          if (direction === DOWN_ARROW_KEY_CODE) {
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

          if (direction === UP_ARROW_KEY_CODE) {
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

  const handleToggle = useCallback(
    (event) => {
      const openSelect = event.keyCode === ENTER_KEY_CODE;

      if (event.keyCode === ESCAPE_KEY_CODE) {
        setOpen(false);
      }

      if (event.type === 'click' || openSelect) {
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

  return (
    <Container ref={combineRef} id={id} tabIndex={-1} {...rest}>
      <Button
        type="button"
        size={size}
        role="button"
        isOpen={open}
        // width={width}
        // direction={direction}
        tabIndex={0}
        id={`${id}-button`}
        onClick={handleToggle}
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
        // direction={direction}
        aria-hidden={!open}
        aria-expanded={open}
      >
        <OptionList
          ref={listRef}
          role="listbox"
          // direction={direction}
          aria-activedescendant={optionValue}
          // onClick={handleToggle}
          tabIndex={-1}
        >
          <Option>Option</Option>
        </OptionList>
      </Pooper>
    </Container>
  );
}

export default forwardRef(Select);
