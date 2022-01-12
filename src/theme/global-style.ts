import { createGlobalStyle } from 'styled-components';

import Colors from './colors';
import Fonts from './fonts';

export default createGlobalStyle`
  :root {
    ${Fonts};
    ${Colors};
  }
`;
