import { mount, unmount } from 'test-utils/cypress';
import Avatar from 'elements/avatar';

describe('Avatar', () => {
  afterEach(() => {
    unmount();
  });

  it('should render', () => {
    mount(
      <Avatar data-testid="avatar" />
    );

    cy.viewport(300, 300);
    cy.findByTestId('avatar').should('be.visible');
  });

  it('should have prop name', () => {
    mount(
       <Avatar name="Roger Luiz" data-testid="avatar" />
    );

    cy.viewport(300, 300);
    cy.findByText('RL').should('be.visible');
  });

  it('should change the background color', () => {
    mount(
      <Avatar backgroundColor="#2e7eff" data-testid="avatar" />
    );

    cy.viewport(300, 300);
    cy.findByTestId('avatar')
      .should(
        'have.css',
        'background-color',
        'rgb(46, 126, 255)'
      );
  });

  it('should load src image', () => {
    mount(
      <Avatar src="https://via.placeholder.com/150x150" data-testid="avatar" />
    );

    cy.viewport(300, 300);
    cy.findByTestId('avatar-image')
      .invoke('attr', 'src')
      .then(nextSrc => {
        expect(nextSrc).to.equal('https://via.placeholder.com/150x150')
      });
  });

  it('should show the fallback when not load a image', () => {
    mount(
      <Avatar src="https://via.placeholder.com/" data-testid="avatar" />
    );

    cy.viewport(300, 300);
    cy.findByTestId('avatar')
      .get('i')
      .should('be.visible');
  });

  it('should have the borderColor', () => {
    mount(
      <Avatar borderColor="secondary" data-testid="avatar" />
    );

    cy.viewport(300, 300);
    cy.findByTestId('avatar')
      .should(
        'have.css',
        'border-color',
        'rgb(106, 77, 255)'
      );
  });

});
