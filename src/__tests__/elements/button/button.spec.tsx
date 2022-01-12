import React from 'react';
import { mount } from '@cypress/react';
import { ThemeProvider } from '__tests__/test-utils';

import Button from 'elements/button';

describe('Button', () => {
  const obj = {
    // eslint-disable-next-line
    click() {},
  };

  it('should render', () => {
    mount(
      <ThemeProvider>
        <Button data-testid="default">Teste</Button>
      </ThemeProvider>,
    );

    cy.viewport(300, 300);
    cy.findByTestId('default').should('be.visible');
  });

  it('should click the button and trigger a function', () => {
    cy.spy(obj, 'click').as('spyOn');

    mount(
      <ThemeProvider>
        <Button data-testid="button-event" onClick={obj.click}>
          Teste
        </Button>
      </ThemeProvider>,
    );

    cy.viewport(300, 300);
    cy.findByTestId('button-event')
      .click()
      .get('@spyOn')
      .should('to.be.called');
  });

  it('should have color and variant secondary', () => {
    mount(
      <ThemeProvider>
        <Button data-testid="button" variant="secondary">
          Teste
        </Button>
      </ThemeProvider>,
    );

    cy.viewport(300, 300);
    cy.findByTestId('button').should(
      'have.css',
      'background-color',
      'rgb(255, 198, 0)',
    );
  });

  it('block should be true', () => {
    mount(
      <ThemeProvider>
        <Button data-testid="button" block>
          Teste
        </Button>
      </ThemeProvider>,
    );

    cy.viewport(300, 300);
    cy.findByTestId('button').should('have.css', 'display', 'block');
    cy.findByTestId('button').should('have.css', 'width', '300px');
  });

  it('isText should be true', () => {
    mount(
      <ThemeProvider>
        <Button data-testid="button" isText color="gray400">
          Teste
        </Button>
      </ThemeProvider>,
    );

    cy.viewport(300, 300);
    cy.findByTestId('button').should(
      'have.css',
      'background-color',
      'rgba(0, 0, 0, 0)',
    );
  });

  it('size should be lg', () => {
    mount(
      <ThemeProvider>
        <Button data-testid="button" size="lg">
          Teste
        </Button>
      </ThemeProvider>,
    );

    cy.viewport(300, 300);
    cy.findByTestId('button').should('have.css', 'height', '50px');
  });
});
