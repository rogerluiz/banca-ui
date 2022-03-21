import styled from 'styled-components';

import Block from 'components/block';
import Code from 'components/code';
import Container from 'elements/container';
import Row from 'elements/row';
import Col from 'elements/col';

const Box = styled.div`
  background: #ffc845;
  padding: 10px;
`;

function GridSystem(): JSX.Element {
  return (
    <Block
      page="/grid-system"
      title="Grid System"
      legend="Responsive layout grid adapts to screen size and orientation, ensuring consistency across layouts."
    >
      <Code code={require('examples/grid/system.mdx')}>
        <Container>
          <Row>
            <Col>
              <Box>1 of 1</Box>
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
              <Box>2 of 1</Box>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
              <Box>2 of 2</Box>
            </Col>
          </Row>
        </Container>
      </Code>
    </Block>
  );
}

export default GridSystem;
