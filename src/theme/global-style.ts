import { createGlobalStyle } from 'styled-components';

import Colors from './colors';
import Fonts from './fonts';

export default createGlobalStyle`
  :root {
    ${Fonts};
    ${Colors};
  }

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  *:before, *:after {
    box-sizing: inherit;
  }
  html,
  body {
    width: 100%;
    min-height: 100%;
  }
  html {
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    -ms-overflow-style: scrollbar;
    -webkit-tap-highlight-color: transparent;
    -webkit-font-smoothing: antialiased;
    height: 100%;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: var(--font-primary);
    font-size: var(--textBaseSize);
    overflow-x: hidden;

    &.overflow-hide {
      overflow: hidden;
    }
  }
  #root {
    width: 100%;
    height: 100%;
    min-height: 100%;
  }
  p, ol, ul, span {
    font-weight: 400;
  }
  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 700;
  }
  ol, ul {
    list-style: none;
  }
  article,aside,details,figcaption,figure,
  footer,header,hgroup,menu,nav,section {
    display: block;
  }
  abbr[title] {
    border-bottom: none;
    text-decoration: underline;
    text-decoration: underline dotted;
  }
  img {
    max-width: 100%;
    height: auto;
  }

  [type=button],
  [type=reset],
  [type=submit],
  button {
    -webkit-appearance: button;
  }
`;
