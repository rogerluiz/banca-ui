import { render } from 'test-utils/render';

import Avatar from 'elements/avatar';

describe('Elements Avatar', () => {
  it('should render', () => {
    const { container } = render(<Avatar data-testid="avatar" />);
    expect(container).toBeDefined();
  });

  it('should have the prop name', () => {
    const { getByText } = render(<Avatar name="Roger Luiz" data-testid="avatar" />);
    expect(getByText('RL')).toBeDefined();
  });

  it('should have the background-color prop', () => {
    const { getByTestId } = render(
      <Avatar backgroundColor="#2e7eff" data-testid="avatar" />
    );

    expect(getByTestId('avatar'))
      .toHaveStyle('background-color: rgb(46, 126, 255)');
  });

  it('should have the size prop', () => {
    const { getByTestId } = render(
      <Avatar size="lg" data-testid="avatar" />
    );

    expect(getByTestId('avatar'))
      .toHaveStyle('width: 40px');
  });

  it('should have the size prop', () => {
    const { getByTestId } = render(
      <Avatar size="lg" data-testid="avatar" />
    );

    expect(getByTestId('avatar'))
      .toHaveStyle('width: 40px');
  });
});
