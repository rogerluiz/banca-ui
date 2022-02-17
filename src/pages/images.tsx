import Block from 'components/block';
import Code from 'components/code';
import Title from 'elements/title';
import Row from 'elements/row';
import Col from 'elements/col';

import Image from 'elements/image';

function Images(): JSX.Element {
  return (
    <Block
      page="/image"
      title="Image"
      legend="Displaying related images and text with the figure"
    >
      <Row>
        <Col>
          <Title>Default</Title>
        </Col>
      </Row>

      <Row>
        <Col>
          <Code code={require('examples/image/default.mdx')}>
            <Image src="https://via.placeholder.com/150x150" alt="logo react" />
          </Code>
        </Col>
      </Row>

      <Row>
        <Col>
          <Title>Rounded</Title>
        </Col>
      </Row>

      <Row>
        <Col>
          <Code code={require('examples/image/rounded.mdx')}>
            <Image
              src="https://via.placeholder.com/150x150"
              alt="logo react"
              rounded
            />
          </Code>
        </Col>
      </Row>

      <Row>
        <Col>
          <Title>Circle</Title>
        </Col>
      </Row>

      <Row>
        <Col>
          <Code code={require('examples/image/circle.mdx')}>
            <Image
              src="https://via.placeholder.com/150x150"
              alt="logo react"
              roundedCircle
            />
          </Code>
        </Col>
      </Row>

      <Row>
        <Col>
          <Title>Fluid</Title>
        </Col>
      </Row>

      <Row>
        <Col>
          <Code code={require('examples/image/fluid.mdx')}>
            <Image
              src="https://via.placeholder.com/800x130"
              alt="logo react"
              fluid
            />
          </Code>
        </Col>
      </Row>
    </Block>
  );
}

export default Images;
