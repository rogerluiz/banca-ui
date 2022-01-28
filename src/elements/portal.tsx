import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  /**
   * O Conteudo do component
   */
  children?: React.ReactNode;
  /**
   * Id ou Class do container para o portal
   * @default 'vr-portal-container'
   */
  container?: string;
}

interface RootElement {
  content: HTMLDivElement;
  root: HTMLDivElement;
}

function createRootElement(container: string): RootElement {
  const rootContainer = document.createElement('div');
  rootContainer.className = container
    ? `${container}-container`
    : 'portal-container';
  rootContainer.style.display = 'flex';
  rootContainer.setAttribute('data-testid', 'portal-container');

  const defaultElement = document.createElement('div');
  defaultElement.className = container || 'banca-portal';
  defaultElement.style.zIndex = '510';
  defaultElement.setAttribute('data-testid', 'banca-portal');
  return { content: defaultElement, root: rootContainer };
}

function Portal({ children, container }: PortalProps): JSX.Element {
  const [rootElem, setRootElem] = useState<HTMLDivElement | null>();

  useEffect(() => {
    const { content, root } = createRootElement(container as string);

    document.body.appendChild(root);
    root.appendChild(content);

    setRootElem(content);

    return () => {
      document.body.removeChild(root);
    };
  }, [container]);

  if (rootElem) {
    return createPortal(children, rootElem);
  }

  return <div />;
}

export default Portal;
