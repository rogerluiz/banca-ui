import React, { forwardRef, useCallback, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { CSSTransition } from 'react-transition-group';

enum FlexDirection {
  left = 'flex-start',
  right = 'flex-end',
  bottom = 'flex-end',
  top = 'flex-end',
}

interface NavDrawerProps extends React.ComponentPropsWithoutRef<'div'> {
  open?: boolean;
  direction?: 'left' | 'right' | 'bottom' | 'top';
  onClose?: (event: React.SyntheticEvent<any>) => void;
  offsetHeight?: number | string;
  fullWidth?: boolean;
}

const Content = styled.div<NavDrawerProps>`
  width: 100%;
  max-width: 300px;
  height: calc(100% - ${(props) => props.offsetHeight || 0}px);
  background: var(--white);
  z-index: 0;

  ${(props) =>
    (props.fullWidth || props.offsetHeight) &&
    css`
      max-width: 100%;
    `};
`;

const Overlay = styled.div<NavDrawerProps>`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  z-index: -1;
  position: fixed;
  align-items: center;
  justify-content: center;
  background-color: rgba(3, 3, 33, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const Container = styled.div<NavDrawerProps>`
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 900;
  display: flex;
  justify-content: ${(props) =>
    FlexDirection[props.direction as keyof typeof FlexDirection]};
  align-items: ${(props) => (props.offsetHeight ? 'flex-end' : 'flex-start')};

  ${(props) =>
    props.direction &&
    css`
      &.drawer-appear {
        ${Overlay} {
          opacity: 0;
        }

        ${Content} {
          ${props.offsetHeight
            ? css`
                transform: ${props.direction === 'left'
                  ? 'translate(0, 100%)'
                  : 'translate(0, 100%)'};
              `
            : css`
                transform: ${props.direction === 'left'
                  ? 'translate(-100%, 0)'
                  : 'translate(100%, 0)'};
              `};
        }
      }

      &.drawer-appear-active {
        ${Overlay} {
          opacity: 1;
          transition: opacity 300ms ease;
        }

        ${Content} {
          transform: translate(0, 0);
          transition: transform 300ms ease;
        }
      }

      &.drawer-exit {
        ${Overlay} {
          opacity: 1;
        }

        ${Content} {
          transform: translate(0, 0);
        }
      }

      &.drawer-exit-active {
        ${Overlay} {
          opacity: 0;
          transition: opacity 300ms ease;
        }

        ${Content} {
          ${props.offsetHeight
            ? css`
                transform: ${props.direction === 'left'
                  ? 'translate(0, 100%)'
                  : 'translate(0, 100%)'};
              `
            : css`
                transform: ${props.direction === 'left'
                  ? 'translate(-100%, 0)'
                  : 'translate(100%, 0)'};
              `};
          transition: transform 300ms ease;
        }
      }
    `};
`;

function NavDrawer(
  {
    open = false,
    direction = 'left',
    offsetHeight,
    fullWidth = false,
    onClose,
    children,
    ...rest
  }: NavDrawerProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const overlayRef = useRef<HTMLDivElement>(null);

  const [exited, setExited] = useState(true);

  const handleClose = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      onClose?.(event);
    },
    [onClose],
  );

  const handleExited = useCallback(() => {
    setExited(true);
  }, []);

  const handleEnter = useCallback(() => {
    setExited(false);
  }, []);

  if (!open && exited) {
    return null;
  }

  return (
    <CSSTransition
      appear
      in={open}
      timeout={350}
      classNames="drawer"
      unmountOnExit
      onEnter={handleEnter}
      onExited={handleExited}
      offsetHeight={offsetHeight}
    >
      <Container ref={ref} direction={direction} {...rest}>
        <Content
          role="dialog"
          tabIndex={-1}
          aria-modal="true"
          fullWidth={fullWidth}
          offsetHeight={offsetHeight}
        >
          {children || null}
        </Content>
        <Overlay ref={overlayRef} onClick={handleClose} aria-hidden="true" />
      </Container>
    </CSSTransition>
  );
}

export default forwardRef(NavDrawer);
