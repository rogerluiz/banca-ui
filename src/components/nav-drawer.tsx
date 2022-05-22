import React, { forwardRef, useCallback, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { CSSTransition } from 'react-transition-group';

import Button from 'elements/button';
import Icon from 'elements/icon';
// enum FlexDirection {
//   left = 'flex-start',
//   right = 'flex-end',
//   bottom = 'flex-end',
//   top = 'flex-start',
// }

export type DrawerWidth = 'wide' | 'extended' | 'medium' | 'narrow' | 'full';
export type DrawerDirection = 'left' | 'right' | 'bottom' | 'top';
interface NavDrawerProps extends React.ComponentPropsWithoutRef<'div'> {
  /**
   * If `true` open the drawer
   * @default false
   */
  isOpen?: boolean;
  /**
   * Direction of drawer when opened
   * @default 'left'
   */
  direction?: DrawerDirection;
  /**
   *Callback function called when the drawer is closed.
   */
  onClose?: (event: React.SyntheticEvent<any>) => void;
  /**
   * Available drawer sizes
   * @default 'narrow'
   */
  width?: DrawerWidth;
  offsetHeight?: number | string;
  fullWidth?: boolean;
}

type DrawerContainerType = Pick<
  NavDrawerProps,
  'offsetHeight' | 'direction' | 'width'
>;
type DrawerContentType = Pick<
  NavDrawerProps,
  'offsetHeight' | 'fullWidth' | 'width' | 'direction'
>;

const setDrawerDirection = (direction: string) => {
  if (['top', 'bottom'].includes(direction)) {
    return css`
      transform: ${direction === 'top'
        ? 'translate(0, -100vh)'
        : 'translate(0, 100vh)'};
    `;
  }

  return css`
    transform: ${direction === 'left'
      ? 'translate(-100vw, 0)'
      : 'translate(100vw, 0)'};
  `;
};

const setSize = (direction: string, width: string) => {
  // 'wide' | 'extended' | 'medium' | 'narrow' | 'full'
  const widths = {
    narrow: '360px',
    medium: '480px',
    wide: '600px',
    extended: '95vw',
    full: '100vw',
  };
  const heights = {
    narrow: '50vh',
    medium: '60vh',
    wide: '80vh',
    extended: '95vw',
    full: '100vw',
  };

  if (['top', 'bottom'].includes(direction)) {
    return css`
      height: ${heights[width as keyof typeof heights]};
      max-width: 100vw;
    `;
  }

  return css`
    max-width: ${widths[width as keyof typeof widths]};
    height: 100vh;
  `;
};

const setStartDirection = (direction: string) => {
  const justify = ['left', 'top'].includes(direction)
    ? 'flex-start'
    : 'flex-end';

  const align = ['bottom', 'right'].includes(direction)
    ? 'flex-end'
    : 'flex-start';

  return css`
    justify-content: ${justify};
    align-items: ${align};
  `;
};

const DrawerDialog = styled.div<DrawerContentType>`
  width: 100%;
  background: var(--white);
  ${({ direction, width }) => setSize(direction as string, width as string)};
  display: flex;
  z-index: 0;
`;

const Overlay = styled.div`
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

const drawerActiveExit = css`
  &.drawer-appear-active {
    ${Overlay} {
      opacity: 1;
      transition: opacity 300ms ease;
    }

    ${DrawerDialog} {
      transform: translate(0, 0);
      transition: transform 300ms ease;
    }
  }

  &.drawer-exit {
    ${Overlay} {
      opacity: 1;
    }

    ${DrawerDialog} {
      transform: translate(0, 0);
    }
  }
`;

const DrawerContainer = styled.div<DrawerContainerType>`
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 900;
  display: flex;
  ${({ direction }) => setStartDirection(direction as string)}

  ${(props) =>
    props.direction &&
    css`
      &.drawer-appear {
        ${Overlay} {
          opacity: 0;
        }

        ${DrawerDialog} {
          ${setDrawerDirection(props.direction)};
        }
      }

      ${drawerActiveExit};

      &.drawer-exit-active {
        ${Overlay} {
          opacity: 0;
          transition: opacity 300ms ease;
        }

        ${DrawerDialog} {
          ${setDrawerDirection(props.direction)};
          transition: transform 300ms ease;
        }
      }
    `};
`;

const Sidebar = styled.div``;

const Content = styled.div``;

function NavDrawer(
  {
    isOpen = false,
    direction = 'left',
    offsetHeight,
    fullWidth = false,
    width = 'medium',
    onClose,
    children,
    ...rest
  }: NavDrawerProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const overlayRef = useRef<HTMLDivElement>(null);
  // const contentRef = useRef<HTMLDivElement>(null);

  const [exited, setExited] = useState(true);

  const handleClose = useCallback(
    (event: React.MouseEvent<any>) => {
      onClose?.(event);
    },
    [onClose],
  );

  const handleExited = useCallback(() => {
    setExited(true);
  }, []);

  const handleEnter = useCallback(() => {
    setExited(false);
    // contentRef.current?.focus();
  }, []);

  if (!isOpen && exited) {
    return null;
  }

  return (
    <CSSTransition
      appear
      in={isOpen}
      timeout={350}
      classNames="drawer"
      unmountOnExit
      onEnter={handleEnter}
      onExited={handleExited}
    >
      <DrawerContainer ref={ref} direction={direction} width={width} {...rest}>
        <DrawerDialog
          role="dialog"
          tabIndex={-1}
          aria-modal="true"
          direction={direction}
          width={width}
        >
          <Sidebar>
            <Button isText onClick={handleClose}>
              <Icon name="xmark" color="gray" />
            </Button>
          </Sidebar>
          <Content>{children || null}</Content>
        </DrawerDialog>
        <Overlay ref={overlayRef} onClick={handleClose} aria-hidden="true" />
      </DrawerContainer>
    </CSSTransition>
  );
}

export default forwardRef(NavDrawer);
