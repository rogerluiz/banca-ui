import React, { useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import { CSSTransition } from 'react-transition-group';

import { Sizes } from 'types';
import Portal from 'elements/portal';
import Button from 'elements/button';

enum ModalSize {
  sm = '400px',
  md = '600px',
  lg = '800px',
  xl = '968px',
}

interface ActionsType {
  text: string;
  onClick?: (event: React.SyntheticEvent<any>) => void;
}

interface ModalProps extends React.ComponentPropsWithoutRef<'div'> {
  open?: boolean;
  heading?: React.ReactNode;
  size?: Sizes;
  actions?: ActionsType[];
  scrollPos?: string;
  onClose?: () => void;
  children?: React.ReactNode;
}

const PositionerAbsolute = styled.div<Pick<ModalProps, 'size'>>`
  top: 60px;
  left: 0px;
  right: 0px;
  width: 100%;
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  pointer-events: none;
  position: absolute;
  z-index: 510;

  ${(props) =>
    props.size &&
    css`
      max-width: ${ModalSize[props.size as keyof typeof ModalSize]};
    `};
`;
const Dialog = styled.div`
  background-color: var(--white);
  border-radius: 3px;
  box-shadow: rgba(9, 30, 66, 0.08) 0px 0px 0px 1px,
    rgba(9, 30, 66, 0.08) 0px 2px 1px, rgba(9, 30, 66, 0.31) 0px 0px 20px -6px;
  color: var(--gray70);
  display: flex;
  flex-direction: column;
  height: auto;
  max-height: 100%;
  outline: currentcolor none 0px;
  pointer-events: auto;
  transition: all 300ms ease;
`;

const Overlay = styled.div`
  top: 0;
  left: 0;
  background: rgba(9, 30, 66, 0.54);
  opacity: 1;
  width: 100%;
  height: 100%;
  pointer-events: initial;
  position: fixed;
  transition: opacity 220ms ease 0s;
  z-index: 500;
`;

const ModalContainer = styled.div<Pick<ModalProps, 'scrollPos'>>`
  top: ${(props) => props.scrollPos};
  left: 0;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  position: absolute;
  z-index: 510;
  transition: all 300ms ease;

  &.fade-enter,
  &.fade-appear {
    opacity: 0;

    ${Dialog} {
      transform: translateY(40px);
    }
  }

  &.fade-enter-active,
  &.fade-appear-active {
    opacity: 1;
    transition: opacity 300ms ease;

    ${Dialog} {
      transform: translateY(0);
    }
  }

  &.fade-exit {
    opacity: 1;

    ${Dialog} {
      transform: translateY(0);
    }
  }

  &.fade-exit-active {
    opacity: 0;
    transition: opacity 300ms ease;

    ${Dialog} {
      transform: translateY(-40px);
    }
  }
`;

const DialogHeader = styled.header`
  display: flex;
  flex: 0 0 auto;
  position: relative;
  align-items: center;
  justify-content: space-between;
  padding: 24px 24px 22px;

  h4 {
    font-size: 20px;
    font-weight: 500;
    line-height: 1;
  }
`;
const DialogContent = styled.div`
  flex: 1 1 auto;
  overflow: hidden auto;
  position: relative;
  padding: 4px 24px;
`;
const DialogFooter = styled.footer`
  position: relative;
  align-items: center;
  display: flex;
  flex: 0 0 auto;
  justify-content: flex-end;
  padding: 22px 24px 24px;
`;
const Inline = styled.div`
  display: inline-flex;
  margin: 0px -4px;
`;
const FlexDiv = styled.div`
  flex: 1 0 auto;
  margin: 0px 4px;
`;

function Modal(
  {
    heading,
    actions,
    size = 'md',
    open = false,
    onClose,
    children,
    ...rest
  }: ModalProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const [exited, setExited] = useState(true);
  const [scrollPos, setScrollPos] = useState('0px');

  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  const handleExited = () => {
    setExited(true);
    document.body.classList.remove('overflow-hide');
  };

  const handleEnter = () => {
    setExited(false);
    document.body.classList.add('overflow-hide');
    setScrollPos(`${window.scrollY}px`);
  };

  if (!open && exited) {
    return null;
  }

  return (
    <Portal>
      <CSSTransition
        in={open}
        appear
        timeout={300}
        classNames="fade"
        unmountOnExit
        onEnter={handleEnter}
        onExited={handleExited}
      >
        <ModalContainer ref={ref} scrollPos={scrollPos} {...rest}>
          <PositionerAbsolute size={size}>
            <Dialog role="dialog" aria-modal="true">
              {heading && (
                <DialogHeader>
                  <h4>{heading}</h4>
                </DialogHeader>
              )}

              <DialogContent>{children}</DialogContent>

              {actions && (
                <DialogFooter>
                  <Inline>
                    {actions.map(({ text, onClick }) => (
                      <FlexDiv key={text.replace(' ', '-').toLowerCase()}>
                        <Button
                          isText={onClick === undefined}
                          onClick={onClick}
                        >
                          {text}
                        </Button>
                      </FlexDiv>
                    ))}
                  </Inline>
                </DialogFooter>
              )}
            </Dialog>
          </PositionerAbsolute>
          <Overlay onClick={handleClose} />
        </ModalContainer>
      </CSSTransition>
    </Portal>
  );
}
export default React.forwardRef(Modal);
