import { mount } from '@cypress/react';
import { ThemeProvider } from '__tests__/test-utils';

import Container from 'elements/container';
import Row from 'elements/row';

const RowTest = () => (
  <ThemeProvider>
    <Container>
      <Row data-testid="row">
        <p>Row</p>
      </Row>
      <Row data-testid="row-justify" justify="center">
        <p>Justify</p>
      </Row>
      <Row data-testid="row-direction" direction="column">
        <p>Direction</p>
        <p>Direction 2</p>
      </Row>
      <Row data-testid="row-align" align="center">
        <p>Align</p>
      </Row>
    </Container>
  </ThemeProvider>
);

describe('Row', () => {
  beforeEach(() => {
    mount(<RowTest />);
  });

  it('should render', () => {
    cy.viewport(300, 300);
    cy.findByTestId('row').should('be.visible');
    cy.contains('Row').should('be.visible');
  });

  it('should justify element to center', () => {
    cy.viewport(300, 300);
    cy.findByTestId('row-justify').should(
      'have.css',
      'justify-content',
      'center',
    );
  });

  it('Direction should be column', () => {
    cy.viewport(300, 300);
    cy.findByTestId('row-direction').should(
      'have.css',
      'flex-direction',
      'column',
    );
  });

  it('Align should be center', () => {
    cy.viewport(300, 300);
    cy.findByTestId('row-align').should('have.css', 'align-items', 'center');
  });
});
