import { render } from '__tests__/test-utils';

import Portal from 'elements/portal';

describe('Elements Portal', () => {
  it('should render', async () => {
    const { getByTestId } = render(
      <Portal>
        <p>Teste</p>
      </Portal>,
    );

    await getByTestId('portal-container');
    expect(getByTestId('portal-container')).toBeDefined();
  });
});
