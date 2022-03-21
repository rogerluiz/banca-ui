import { mount } from '@cypress/react';
import { ThemeProvider } from '__tests__/test-utils';

import Row from 'elements/row';
import Col from 'elements/col';

const ColTest = () => (
  <ThemeProvider>
    <Row>
      <Col data-testid="col">
        <p>Col</p>
      </Col>
    </Row>
  </ThemeProvider>
);

describe('Col', () => {
  beforeEach(() => {
    mount(<ColTest />);
  });

  it('should render', () => {
    cy.viewport(300, 300);
    cy.findByTestId('col').should('be.visible');
    cy.contains('Col').should('be.visible');
  });
});
