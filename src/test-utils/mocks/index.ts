import { mockCookieStorage } from './cookie';
import { mockImage } from './image';
import { mockLocalStorage } from './local-storage';
import { mockMatchMedia } from './mach-media';

export const mocks = {
  image: mockImage,
  cookie: mockCookieStorage,
  localStorage: mockLocalStorage,
  matchMedia: mockMatchMedia,
};
