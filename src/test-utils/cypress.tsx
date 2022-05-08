import { mount as cyMount, MountOptions } from '@cypress/react';
import React from 'react';
import { ThemeProvider } from 'test-utils/render';

import '../theme/assets/banca-icon.css';

export function mount(ui: React.ReactNode, options?: MountOptions) {
  return cyMount(<ThemeProvider>{ui}</ThemeProvider>, options);
}

export * from '@cypress/react';
