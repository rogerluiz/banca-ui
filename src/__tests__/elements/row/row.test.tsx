import { render } from '__tests__/test-utils';

import Row from 'elements/row';

describe('Elements Row', () => {
  it('should render', () => {
    const { container } = render(<Row data-testid="row">Teste</Row>);
    expect(container).toBeDefined();
  });

  it('Direction should be column', () => {
    const { getByTestId } = render(
      <Row data-testid="row" direction="column">
        Teste
      </Row>,
    );

    expect(getByTestId('row')).toHaveStyle('flex-direction: column');
  });

  it('Justify should be center', () => {
    const { getByTestId } = render(
      <Row data-testid="row" justify="center">
        Teste
      </Row>,
    );

    expect(getByTestId('row')).toHaveStyle('justify-content: center');
  });

  it('Align items should be center', () => {
    const { getByTestId } = render(
      <Row data-testid="row" align="center">
        Teste
      </Row>,
    );

    expect(getByTestId('row')).toHaveStyle('align-items: center');
  });

  it('Flex order should be igual to -1', () => {
    const { getByTestId } = render(
      <Row data-testid="row" first>
        Teste
      </Row>,
    );

    expect(getByTestId('row')).toHaveStyle('order: -1');
  });

  it('Flex order should be igual to 1', () => {
    const { getByTestId } = render(
      <Row data-testid="row" last>
        Teste
      </Row>,
    );

    expect(getByTestId('row')).toHaveStyle('order: 1');
  });
});
