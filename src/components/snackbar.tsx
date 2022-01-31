import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  forwardRef,
} from 'react';
import styled, { css } from 'styled-components';
import { CSSTransition } from 'react-transition-group';

import Portal from 'elements/portal';
import Button from 'elements/button';
import useCombinedRefs from 'hooks/use-combined-refs';

interface Actions {
  /**
   * Texto da ação
   */
  text: string;
  /**
   * Evento para a ação
   */
  onClick?: (event: React.SyntheticEvent<any>) => void;
}
interface SnackbarOrigin {
  /**
   * Posição vertical
   */
  vertical: 'top' | 'bottom';
  /**
   * Posição horizontal
   */
  horizontal: 'left' | 'center' | 'right';
}

type SnackbarCloseReason = 'timeout' | 'clickaway';

interface SnackbarProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  message?: React.ReactNode;
  onClose?: (
    event: React.SyntheticEvent<any>,
    reason: SnackbarCloseReason,
  ) => void;
  anchorOrigin?: SnackbarOrigin;
  open?: boolean;
  autoHideDuration?: number | null;
  resumeHideDuration?: number;
  disableWindowBlurListener?: boolean;
  actions?: Actions[];
  transition?: 'fade' | 'slide';
  onMouseLeave?: React.MouseEventHandler;
  onMouseEnter?: React.MouseEventHandler;
}

function addTransitions({ vertical, horizontal }: SnackbarOrigin) {
  const hasCenter = horizontal === 'center';
  const hasTop = vertical === 'top';

  return css`
    /* FADE */
    &.fade-appear {
      opacity: 0;
    }
    &.fade-appear-active {
      opacity: 1;
      transition: opacity 300ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    &.fade-exit {
      opacity: 1;
    }

    &.fade-exit-active {
      opacity: 0;
      transition: opacity 300ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* SLIDE */
    &.slide-appear {
      opacity: 0;
      transform: translateX(${hasCenter ? '-50%' : '0'})
        translateY(${hasTop ? '-100%' : '100%'});
    }

    &.slide-appear-active {
      opacity: 1;
      transform: translateX(${hasCenter ? '-50%' : '0'}) translateY(0);
      transition: opacity 300ms cubic-bezier(0.4, 0, 0.2, 1),
        transform 300ms cubic-bezier(0.4, 0, 0.2, 1) 50ms;
    }

    &.slide-exit {
      opacity: 1;
      transform: translateX(${hasCenter ? '-50%' : '0'}) translateY(0);
    }

    &.slide-exit-active {
      opacity: 0;
      transform: translateX(${hasCenter ? '-50%' : '0'})
        translateY(${hasTop ? '-100%' : '100%'});
      transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1),
        opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 100ms;
    }
  `;
}

function setAnchorOriginCss(origin: SnackbarOrigin) {
  const { vertical, horizontal } = origin;
  const hasLeft = horizontal === 'left';
  const hasRight = horizontal === 'right';
  const hasCenter = horizontal === 'center';
  const hasTop = vertical === 'top';
  const hasBottom = vertical === 'bottom';

  const isLeft = hasLeft ? '15px' : 'auto';
  const isRight = hasRight ? '15px' : 'auto';
  return css`
    left: ${hasCenter ? '50%' : isLeft};
    right: ${hasCenter ? 'auto' : isRight};
    top: ${hasTop ? '15px' : 'auto'};
    bottom: ${hasBottom ? '15px' : 'auto'};
    transform: ${hasCenter ? 'translateX(-50%)' : 'translateX(0)'};
    ${addTransitions(origin)}
  `;
}

const Container = styled.div<SnackbarProps>`
  width: 100%;
  min-width: 288px;
  max-width: 600px;
  background: var(--gray-dark);
  border-radius: 4px;
  display: flex;
  padding: 6px 16px;
  flex-grow: 1;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    opacity 300ms cubic-bezier(0.4, 0, 0.2, 1);
  position: fixed;
  z-index: 1500;

  ${(props) => props.anchorOrigin && setAnchorOriginCss(props.anchorOrigin)};
`;

const Text = styled.div`
  padding: 8px 0;
  font-size: 15px;
  align-items: center;
  font-weight: 400;
  line-height: 20px;
  color: var(--white);
`;
const Action = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: -8px;
  padding-left: 16px;

  button {
    background: transparent;
  }
`;

function Snackbar(props: SnackbarProps, ref: React.Ref<HTMLDivElement>) {
  const {
    open,
    message,
    actions,
    onClose,
    transition = 'fade',
    autoHideDuration = null,
    resumeHideDuration,
    onMouseEnter,
    onMouseLeave,
    disableWindowBlurListener = true,
    ...rest
  } = props;

  const timerAutoHide: any = useRef();
  const wrapperRef: any = useRef();
  const combineRef: any = useCombinedRefs(ref, wrapperRef);

  const [exited, setExited] = useState(true);

  const handlePause = () => {
    clearTimeout(timerAutoHide.current);
  };

  const handleClose = useCallback(
    (event, reason: SnackbarCloseReason) => {
      if (onClose) {
        onClose(event, reason);
      }
    },
    [onClose],
  );

  const setAutoHideTimer = useCallback(
    (autoHideDurationParam) => {
      if (!onClose || autoHideDurationParam == null) {
        return;
      }

      clearTimeout(timerAutoHide.current);
      timerAutoHide.current = setTimeout(() => {
        handleClose(null, 'timeout');
      }, autoHideDurationParam);
    },
    [onClose, handleClose],
  );

  useEffect(() => {
    if (open) {
      setAutoHideTimer(autoHideDuration);
    }

    return () => {
      clearTimeout(timerAutoHide.current);
    };
  }, [open, autoHideDuration, setAutoHideTimer]);

  const handleResume = useCallback(() => {
    if (autoHideDuration != null) {
      setAutoHideTimer(
        resumeHideDuration != null
          ? resumeHideDuration
          : autoHideDuration * 0.5,
      );
    }
  }, [autoHideDuration, resumeHideDuration, setAutoHideTimer]);

  const handleMouseEnter = (event: React.MouseEvent<Element, MouseEvent>) => {
    if (onMouseEnter) {
      onMouseEnter(event);
    }
    handlePause();
  };

  const handleMouseLeave = (event: React.MouseEvent<Element, MouseEvent>) => {
    if (onMouseLeave) {
      onMouseLeave(event);
    }
    handleResume();
  };

  const handleClickAway = useCallback(
    (event) => {
      if (wrapperRef && !wrapperRef.current.contains(event.target)) {
        if (onClose) {
          onClose(event, 'clickaway');
        }
      }
    },
    [onClose],
  );

  const handleExited = () => {
    setExited(true);
  };

  const handleEnter = () => {
    setExited(false);
  };

  useEffect(() => {
    if (!disableWindowBlurListener && open) {
      window.addEventListener('focus', handleResume);
      window.addEventListener('blur', handlePause);

      return () => {
        window.removeEventListener('focus', handleResume);
        window.removeEventListener('blur', handlePause);
      };
    }

    return undefined;
  }, [disableWindowBlurListener, handleResume, open]);

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickAway);
    }

    return () => {
      if (open) {
        document.removeEventListener('mousedown', handleClickAway);
      }
    };
  }, [open, handleClickAway]);

  if (!open && exited) {
    return null;
  }

  return (
    <Portal>
      <CSSTransition
        appear
        in={open}
        timeout={350}
        classNames={transition}
        unmountOnExit
        onEnter={handleEnter}
        onExited={handleExited}
      >
        <Container
          ref={combineRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          {...rest}
        >
          <Text>{message}</Text>
          {actions && (
            <Action>
              {actions.map(({ text, onClick }) => (
                <Button
                  key={text}
                  variant="primary"
                  color="white"
                  isText
                  size="sm"
                  onClick={onClick}
                >
                  {text}
                </Button>
              ))}
            </Action>
          )}
        </Container>
      </CSSTransition>
    </Portal>
  );
}

export default forwardRef(Snackbar);
