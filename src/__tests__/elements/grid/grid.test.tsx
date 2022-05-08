import { render } from 'test-utils/render';
import Grid from 'elements/grid';

describe('Elements Grid', () => {
  it('should render', () => {
    const { container } = render(<Grid>Text</Grid>);
    expect(container).toBeDefined();
  });

  it('Should have the prosp column and rows', () => {
    const { container } = render(
      <Grid columns="100px auto 200px" rows="auto">Text</Grid>
    );
    expect(container.firstChild)
      .toHaveStyleRule('grid-template-rows', 'auto');
    expect(container.firstChild)
      .toHaveStyleRule('grid-template-columns', '100px auto 200px');
  });

  it('Should the prop gap to be 10px', () => {
    const { container } = render(
      <Grid gap={1}>Text</Grid>
    );
    expect(container.firstChild)
      .toHaveStyleRule('grid-gap', '10px');
  });

  it('Should have column-gap prop', () => {
    const { container } = render(
      <Grid columnGap={1} rowGap={1}>Text</Grid>
    );
    expect(container.firstChild)
      .toHaveStyleRule('grid-row-gap', '10px');
    expect(container.firstChild)
      .toHaveStyleRule('grid-column-gap', '10px');
  });

  it('Should have column-start prop', () => {
    const { container } = render(
      <Grid columnStart="1" rowStart="1">Text</Grid>
    );
    expect(container.firstChild)
      .toHaveStyleRule('grid-column-start', '1');
    expect(container.firstChild)
      .toHaveStyleRule('grid-row-start', '1');
  });

  it('Shaould have column-end prop', () => {
    const { container } = render(
      <Grid columnEnd="1" rowEnd="1">Text</Grid>
    );
    expect(container.firstChild)
      .toHaveStyleRule('grid-column-end', '1');
    expect(container.firstChild)
      .toHaveStyleRule('grid-row-end', '1');
  });

  it('should have areas prop', () => {
    const { container } = render(
      <Grid areas={
        `
          header
          content
          footer
        `
      }>Text</Grid>
    );
    expect(container.firstChild)
      .toHaveStyleRule('grid-template-areas', 'header content footer');
  });
});
