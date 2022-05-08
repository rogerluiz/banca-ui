import { render } from 'test-utils/render';

import Text from 'elements/text';

describe('Elements Text', () => {
  it('should render', () => {
    const { getByTestId, container } = render(
      <Text data-testid="text">Teste</Text>,
    );
    expect(container).toBeDefined();
    expect(getByTestId('text')).toHaveStyle('color: var(--gray500)');
  });

  it('should render with color primary', () => {
    const { getByTestId } = render(
      <Text data-testid="text" color="primary">
        Teste
      </Text>,
    );

    expect(getByTestId('text')).toHaveStyle('color: var(--primary)');
  });

  it('should render with font-size 14px', () => {
    const { getByTestId } = render(
      <Text data-testid="text" size={14}>
        Teste
      </Text>,
    );

    expect(getByTestId('text')).toHaveStyle('font-size: 14px');
  });

  it('should render with font-weight 400', () => {
    const { getByTestId } = render(
      <Text data-testid="text" variant="regular">
        Teste
      </Text>,
    );

    expect(getByTestId('text')).toHaveStyle('font-weight: 400');
  });

  it('should render with text-align center', () => {
    const { getByTestId } = render(
      <Text data-testid="text" textAlign="center">
        Teste
      </Text>,
    );

    expect(getByTestId('text')).toHaveStyle('text-align: center');
  });

  it('should render with uppercase', () => {
    const { getByTestId } = render(
      <Text data-testid="text" uppercase>
        Teste
      </Text>,
    );

    expect(getByTestId('text')).toHaveStyle('text-transform: uppercase');
  });

  it('should render with bold italic', () => {
    const { getByTestId } = render(
      <Text data-testid="text" variant="bold" italic>
        Teste
      </Text>,
    );

    expect(getByTestId('text')).toHaveStyle('font-weight: 700');
    expect(getByTestId('text')).toHaveStyle('font-style: italic');
  });
});
