import { mount } from '@cypress/react';

import Text from 'elements/text';

describe('Text', () => {
  beforeEach(() => {
    mount(<Text>Teste</Text>);
  });

  it('should render', () => {
    cy.viewport(500, 500);
    cy.findAllByText(/Teste/).should('be.visible');
  });
});
