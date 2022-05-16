import Block from 'components/block';
import Code from 'components/code';
import Row from 'elements/row';
import Col from 'elements/col';

import Select from 'elements/select';

function PageSelect(): JSX.Element {
  return (
    <Block
      page="/select"
      title="Select"
      legend="Select allows users to make a single selection or multiple selections from a list of options."
    >
      <Row>
        <Col>
          <Code code={require('examples/select/default.mdx')}>
            <Select />
          </Code>
        </Col>
      </Row>
    </Block>
  );
}

export default PageSelect;
