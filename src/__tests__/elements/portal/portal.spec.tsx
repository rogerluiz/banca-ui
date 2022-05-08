import React from 'react';
import { mount } from '@cypress/react';
import Portal from 'elements/portal';

describe('Portal', () => {
  beforeEach(() => {
    mount(
      <Portal data-testid="portal">
        <p>Portal</p>
      </Portal>,
    );
  });

  it('renders content inside the portal', () => {
    cy.viewport(300, 300);
    cy.findByTestId('portal').should('be.visible');
  });
});
