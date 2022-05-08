import { render } from 'test-utils/render';

import Button from 'elements/button';

describe('Elements Button', () => {
  it('should render', () => {
    const { container } = render(<Button data-testid="button">Teste</Button>);
    expect(container).toBeDefined();
  });

  it('should click the button', () => {
    const click = jest.fn();
    const { getByTestId } = render(
      <Button data-testid="button" onClick={click}>
        Teste
      </Button>,
    );

    getByTestId('button').click();
    expect(click).toHaveBeenCalled();
  });

  it('size should be lg', () => {
    const { getByTestId } = render(
      <Button data-testid="button" size="lg">
        Teste
      </Button>,
    );

    expect(getByTestId('button')).toHaveStyle('height: 50px');
  });

  it('should have color and variant secondary', () => {
    const { getByTestId } = render(
      <Button data-testid="button" variant="secondary">
        Teste
      </Button>,
    );

    expect(getByTestId('button')).toHaveStyleRule(
      'background-color',
      'var(--secondary)',
    );
  });

  it('block should be true', () => {
    const { getByTestId } = render(
      <Button data-testid="button" block>
        Teste
      </Button>,
    );

    expect(getByTestId('button')).toHaveStyleRule('display', 'block');
    expect(getByTestId('button')).toHaveStyleRule('width', '100%');
  });

  it('isText should be true', () => {
    const { getByTestId } = render(
      <Button data-testid="button" isText color="gray400">
        Teste
      </Button>,
    );

    expect(getByTestId('button')).toHaveStyleRule(
      'background-color',
      'transparent',
    );
  });
});
