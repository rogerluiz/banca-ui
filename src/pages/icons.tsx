import Block from 'components/block';
import Code from 'components/code';
import Row from 'elements/row';
import Col from 'elements/col';
import Icon from 'elements/icon';
import Title from 'elements/title';

function Icons(): JSX.Element {
  return (
    <Block
      page="/icon"
      title="Icon"
      legend="The Icon component is almost identical to the Icon component found in Eva Icons."
    >
      <Row>
        <Col>
          <Title>Icon</Title>
        </Col>
      </Row>

      <Row>
        <Col>
          <Code code={require('examples/icons/default.mdx')}>
            <Icon name="car" />
          </Code>
        </Col>
      </Row>

      <Row>
        <Col>
          <Title>Size</Title>
        </Col>
      </Row>

      <Row>
        <Col>
          <Code code={require('examples/icons/size.mdx')}>
            <Icon name="car" size="lg" />
          </Code>
        </Col>
      </Row>

      <Row>
        <Col>
          <Title>Rotation</Title>
        </Col>
      </Row>
      <Row>
        <Col>
          <Code code={require('examples/icons/rotation.mdx')}>
            <Icon name="car" rotation={45} />
          </Code>
        </Col>
      </Row>
      <Row>
        <Col>
          <Title>Flip</Title>
        </Col>
      </Row>
      <Row>
        <Col>
          <Code code={require('examples/icons/flip.mdx')}>
            <Icon name="car" flip="horizontal" />
          </Code>
        </Col>
      </Row>
      <Row>
        <Col>
          <Title>Spin</Title>
        </Col>
      </Row>
      <Row>
        <Col>
          <Code code={require('examples/icons/spin.mdx')}>
            <Icon name="refresh" spin />
          </Code>
        </Col>
      </Row>
      <Row>
        <Col>
          <Title>Pulse</Title>
        </Col>
      </Row>
      <Row>
        <Col>
          <Code code={require('examples/icons/pulse.mdx')}>
            <Icon name="car" pulse />
          </Code>
        </Col>
      </Row>
    </Block>
  );
}

export default Icons;
