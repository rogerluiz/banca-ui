// import React from 'react';
import Block from 'components/block';
import Code from 'components/code';
import Row from 'elements/row';
import Col from 'elements/col';

import Select, { SelectOptions } from 'elements/select';

function PageSelect(): JSX.Element {
  const options: SelectOptions[] = [
    {
      id: 0,
      label: 'Option 1',
      value: 'option-1',
    },
    {
      id: 1,
      label: 'Option 2',
      value: 'option-2',
    },
    {
      id: 2,
      label: 'Option 3',
      value: 'option-3',
    },
    {
      id: 3,
      label: 'Option 4',
      value: 'option-4',
    },
  ];

  return (
    <Block
      page="/select"
      title="Select"
      legend="Select allows users to make a single selection or multiple selections from a list of options."
    >
      <Row>
        <Col>
          <Code code={require('examples/select/default.mdx')}>
            <Select name="select-demo" onChange={(event) => console.log(event)}>
              {options.map((item: SelectOptions) => (
                <Select.Option key={item.id} value={item.value}>
                  {item.label}
                </Select.Option>
              ))}
            </Select>
          </Code>
        </Col>
      </Row>
    </Block>
  );
}

export default PageSelect;
