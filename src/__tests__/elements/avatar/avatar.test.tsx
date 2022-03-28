import { render } from '__tests__/test-utils';

import Avatar from 'elements/avatar';

describe('Elements Avatar', () => {
  it('should render', () => {
    const { container } = render(<Avatar data-testid="avatar" />);
    expect(container).toBeDefined();
  });
});
