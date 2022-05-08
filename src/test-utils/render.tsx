import React from 'react';
import { ThemeProvider } from 'styled-components';
import {
  render as rtlRender,
  RenderOptions,
  RenderResult,
} from '@testing-library/react';

import GlobalStyle from 'theme/global-style';

function WrapperThemeProvider({ children }: any) {
  return (
    <ThemeProvider theme={{}}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}

export function render(
  ui: React.ReactElement,
  options = {} as RenderOptions,
): RenderResult {
  return rtlRender(ui, { wrapper: WrapperThemeProvider, ...options });
}

export * from '@testing-library/react';
export { WrapperThemeProvider as ThemeProvider };
