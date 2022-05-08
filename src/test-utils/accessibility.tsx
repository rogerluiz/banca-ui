import * as React from 'react';
import { RenderOptions } from '@testing-library/react';
import { axe, JestAxeConfigureOptions } from 'jest-axe';
import { render } from './render';

export async function testA11y(
  ui: React.ReactElement | HTMLElement,
  options: RenderOptions & { axeOptions?: JestAxeConfigureOptions } = {},
) {
  const { axeOptions, ...rest } = options;
  const container = React.isValidElement(ui) ? render(ui, rest).container : ui;
  const results = await axe(container, axeOptions);
  expect(results).toHaveNoViolations();
}
