import { render } from 'test-utils/render';
import Col from 'elements/col';

describe('Elements Grid', () => {
  it('should render', () => {
    const { container } = render(<Col>Text</Col>);
    expect(container).toBeDefined();
  });

  it('Should have the prop reverse', () => {
    const { getByTestId } = render(
      <Col data-testid="col" reverse>Test</Col>
    );

    expect(getByTestId('col'))
      .toHaveStyleRule('flex-direction', 'column-reverse');
  });

  it('should render with media queries', () => {
    const { getByTestId } = render(
      <Col data-testid="col" xs={12} sm={12} md={6} lg={6} xl={6}>Text</Col>
    );
    expect(getByTestId('col')).toHaveStyleRule('max-width', '50%', {
      media: '(min-width: 1200px)',
    });
  });
});

