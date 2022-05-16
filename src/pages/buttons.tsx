import styled from 'styled-components';

import Block from 'components/block';

import Code from 'components/code';
import ButtonGroup from 'components/button-group';
import Row from 'elements/row';
import Col from 'elements/col';
import Button from 'elements/button';
import Icon from 'elements/icon';

const Title = styled.h2`
  margin: 20px 0;
  font-size: 22px;
`;

const ContentSpace = styled.div`
  display: flex;
  justify-content: flex-start;
`;

function Buttons(): JSX.Element {
  return (
    <Block
      title="Button"
      page="/button"
      legend="Buttons allow users to take actions, make choices or navigate within a product or website."
    >
      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <Code code={require('examples/button/default.mdx')}>
            <Button variant="primary">Default</Button>
          </Code>
        </Col>
      </Row>

      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <Title>Variant</Title>
        </Col>
      </Row>

      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <Code code={require('examples/button/secondary.mdx')}>
            <Button variant="secondary">Variant</Button>
          </Code>
        </Col>
      </Row>

      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <Title>Left and Right Icon</Title>
        </Col>
      </Row>

      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <Code code={require('examples/button/icon.mdx')}>
            <ContentSpace>
              <Button
                leftIcon={<Icon name="home-outline" color="white" />}
                style={{ marginRight: '10px' }}
              >
                Left Icon
              </Button>
              <Button
                variant="secondary"
                rightIcon={<Icon name="home-outline" color="white" />}
              >
                Right Icon
              </Button>
            </ContentSpace>
          </Code>
        </Col>
      </Row>

      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <Title>Loading</Title>
        </Col>
      </Row>

      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <Code code={require('examples/button/loading.mdx')}>
            <ContentSpace>
              <Button isLoading style={{ marginRight: '10px' }}>
                Loading
              </Button>
              <Button
                isLoading
                loadingText="Loading..."
                style={{ marginRight: '10px' }}
              >
                Loading
              </Button>
              <Button isLoading loadingText="Loading..." spinnerPlacement="end">
                Loading
              </Button>
            </ContentSpace>
          </Code>
        </Col>
      </Row>

      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <Title>Button Disabled</Title>
        </Col>
      </Row>

      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <Code code={require('examples/button/disabled.mdx')}>
            <Button variant="primary" disabled>
              Disabled
            </Button>
          </Code>
        </Col>
      </Row>

      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <Title>Outline Button</Title>
        </Col>
      </Row>

      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <Code code={require('examples/button/outline.mdx')}>
            <Button variant="primary" color="gray90" outline>
              Default outline
            </Button>
          </Code>
        </Col>
      </Row>

      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <Title>Button sizes</Title>
        </Col>
      </Row>

      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <Code code={require('examples/button/size.mdx')}>
            <Button variant="primary" size="lg">
              Size Large
            </Button>
          </Code>
        </Col>
      </Row>

      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <Title>Button Text</Title>
        </Col>
      </Row>

      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <Code code={require('examples/button/text.mdx')}>
            <Button color="primary" isText>
              Only text
            </Button>
          </Code>
        </Col>
      </Row>

      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <Title>Button Group</Title>
        </Col>
      </Row>

      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <Code code={require('examples/button/groupbutton.mdx')}>
            <ButtonGroup>
              <Button>1</Button>
              <Button>2</Button>
              <Button>2</Button>
            </ButtonGroup>
          </Code>
        </Col>
      </Row>
    </Block>
  );
}

export default Buttons;
