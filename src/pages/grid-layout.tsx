import styled from 'styled-components';

import Block from 'components/block';
import Code from 'components/code';
import Grid from 'elements/grid';

const Header = styled.header`
  background: #ffc845;
  grid-area: a;
  padding: 10px;
`;
const Aside = styled.aside`
  background: #ffc845;
  grid-area: b;
  padding: 10px;
`;
const Main = styled.main`
  background: #ffc845;
  grid-area: c;
  padding: 10px;
`;
const Footer = styled.footer`
  background: #ffc845;
  grid-area: d;
  padding: 10px;
`;

function GridLayoutPage(): JSX.Element {
  return (
    <Block
      page="/grid-layout"
      title="Grid Layout"
      legend="A grid is a set of intersecting horizontal and vertical lines defining columns and rows."
    >
      <Code code={require('examples/grid/layout.mdx')}>
        <Grid
          gap={1}
          areas={`
            "a a a"
            "b c c"
            "d d d"
          `}
        >
          <Header>Header</Header>
          <Aside>Aside</Aside>
          <Main>Main</Main>
          <Footer>Footer</Footer>
        </Grid>
      </Code>
    </Block>
  );
}

export default GridLayoutPage;
