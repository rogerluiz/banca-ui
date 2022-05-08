import { render } from 'test-utils/render';

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
