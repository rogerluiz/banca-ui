import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';
import GlobalStyle from './theme/global-style';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
