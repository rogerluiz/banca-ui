import Block from 'components/block';
import Code from 'components/code';

import Row from 'elements/row';
import Col from 'elements/col';
import Avatar from 'elements/avatar';

function AvatarPage(): JSX.Element {
  return (
    <Block
      page="/avatar"
      title="Avatar"
      legend="An avatar is a visual representation of a user or entity."
    >
      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <Code code={require('examples/avatar/default.mdx')}>
            <Avatar />
          </Code>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <Code code={require('examples/avatar/square.mdx')}>
            <Avatar appearance="square" />
          </Code>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <Code code={require('examples/avatar/src.mdx')}>
            <Avatar src="https://hello.atlassian.net/secure/projectavatar" />
          </Code>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <Code code={require('examples/avatar/name-and-bg.mdx')}>
            <Avatar name="RL" backgroundColor="#6A4DFF" />
          </Code>
        </Col>
      </Row>
    </Block>
  );
}

export default AvatarPage;
