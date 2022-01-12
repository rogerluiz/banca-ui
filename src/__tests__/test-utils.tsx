import React from 'react';
// import { createStore, applyMiddleware } from 'redux';
// import createSagaMiddleware from 'redux-saga';
// import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { render, RenderOptions, RenderResult } from '@testing-library/react';

import theme from 'styles';
import GlobalStyle from 'styles/global-style';

function WrapperThemeProvider({ children }: any) {
  return (
    <ThemeProvider theme={theme}>
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
