import Block from 'components/block';
import Code from 'components/code';
import Row from 'elements/row';
import Col from 'elements/col';
import Title from 'elements/title';

import TextField from 'components/text-field';

function FormTextField(): JSX.Element {
  return (
    <Block
      page="/textfield"
      title="TextField"
      legend="A text field is an input that allows a user to write or edit text."
    >
      <Row>
        <Col>
          <Title>Default</Title>
        </Col>
      </Row>

      <Row>
        <Col>
          <Code code={require('examples/text-field/default.mdx')}>
            <TextField type="text" label="Input Text" />
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
          <Code code={require('examples/text-field/default.mdx')}>
            <TextField type="text" size="lg" label="Input Text" />
          </Code>
        </Col>
      </Row>

      <Row>
        <Col>
          <Title>Password</Title>
        </Col>
      </Row>

      <Row>
        <Col>
          <Code code={require('examples/text-field/default.mdx')}>
            <TextField type="password" label="Password" />
          </Code>
        </Col>
      </Row>

      <Row>
        <Col>
          <Title>Disabled</Title>
        </Col>
      </Row>

      <Row>
        <Col>
          <Code code={require('examples/text-field/disabled.mdx')}>
            <TextField type="text" label="Disabled" disabled />
          </Code>
        </Col>
      </Row>

      <Row>
        <Col>
          <Title>Number</Title>
        </Col>
      </Row>

      <Row>
        <Col>
          <Code code={require('examples/text-field/number.mdx')}>
            <TextField type="number" label="Input Number" />
          </Code>
        </Col>
      </Row>

      <Row>
        <Col>
          <Title>Number Max Length</Title>
        </Col>
      </Row>

      <Row>
        <Col>
          <Code code={require('examples/text-field/max-length.mdx')}>
            <TextField type="number" label="Input MaxLength" maxLength={10} />
          </Code>
        </Col>
      </Row>

      <Row>
        <Col>
          <Title>Email</Title>
        </Col>
      </Row>

      <Row>
        <Col>
          <Code code={require('examples/text-field/email.mdx')}>
            <TextField type="email" label="Input Email" />
          </Code>
        </Col>
      </Row>

      <Row>
        <Col>
          <Title>Error</Title>
        </Col>
      </Row>

      <Row>
        <Col>
          <Code code={require('examples/text-field/error.mdx')}>
            <TextField type="text" label="Input Error" error="error input" />
          </Code>
        </Col>
      </Row>
    </Block>
  );
}

export default FormTextField;
