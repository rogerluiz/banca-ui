import Code from 'components/code';
import Block from 'components/block';

import Title from 'elements/title';
import Row from 'elements/row';
import Col from 'elements/col';
import CircularLoader from 'elements/circular-loader';

function Loaders(): JSX.Element {
  return (
    <Block
      page="/loader"
      title="Circular Loader"
      legend="A spinner is an animated spinning icon that lets users know content is being loaded."
    >
      <Row>
        <Col>
          <Title>Default</Title>
        </Col>
      </Row>

      <Row>
        <Col>
          <Code code={require('../examples/circular-loader/default.mdx')}>
            <CircularLoader />
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
          <Code code={require('../examples/circular-loader/size.mdx')}>
            <CircularLoader isInline size="sm" />
            <CircularLoader isInline size="md" />
            <CircularLoader isInline size="lg" />
          </Code>
        </Col>
      </Row>

      <Row>
        <Col>
          <Title>Color</Title>
        </Col>
      </Row>

      <Row>
        <Col>
          <Code code={require('examples/circular-loader/color.mdx')}>
            <CircularLoader color="success" />
          </Code>
        </Col>
      </Row>
    </Block>
  );
}

export default Loaders;
