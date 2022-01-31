import Block from 'components/block';
import Code from 'components/code';
import Row from 'elements/row';
import Col from 'elements/col';

import Logo, { LogoIcon, LogoWordmark } from 'elements/logo';

function Logos(): JSX.Element {
  return (
    <Block
      page="/logo"
      title="Logo"
      legend="A logo is a visual representation of a brand or product. It can be a word or an image, or a combination of both."
    >
      <Row>
        <Col>
          <Code code={require('examples/logo/default.mdx')}>
            <Logo />
          </Code>
        </Col>
      </Row>
      <Row>
        <Col>
          <Code code={require('examples/logo/icon.mdx')}>
            <LogoIcon />
          </Code>
        </Col>
      </Row>
      <Row>
        <Col>
          <Code code={require('examples/logo/wordmark.mdx')}>
            <LogoWordmark />
          </Code>
        </Col>
      </Row>
      <Row>
        <Col>
          <Code code={require('examples/logo/size.mdx')}>
            <Logo size="lg" />
          </Code>
        </Col>
      </Row>
    </Block>
  );
}

export default Logos;
