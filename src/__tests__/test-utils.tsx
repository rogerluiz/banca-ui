import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render, RenderOptions, RenderResult } from '@testing-library/react';

import GlobalStyle from 'theme/global-style';

function WrapperThemeProvider({ children }: any) {
  return (
    <ThemeProvider theme={{}}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}

function customRender(
  ui: React.ReactElement<any>,
  options = {} as RenderOptions,
): RenderResult {
  return render(ui, { wrapper: WrapperThemeProvider, ...options });
}

export * from '@testing-library/react';
export { customRender as render };

export { WrapperThemeProvider as ThemeProvider };
