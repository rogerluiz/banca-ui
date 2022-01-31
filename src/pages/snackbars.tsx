import { useState } from 'react';

import Block from 'components/block';
import Code from 'components/code';
import Snackbar from 'components/snackbar';
import Row from 'elements/row';
import Col from 'elements/col';
import Button from 'elements/button';

function Snackbars(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <Block
      page="/snackbars"
      title="Snackbars"
      legend="Snackbars provide brief messages about app processes at the bottom of the screen."
    >
      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <Code code={require('examples/snackbars/default.mdx')}>
            <Button onClick={open}>Open Snackbar</Button>
            <Snackbar
              open={isOpen}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              transition="slide"
              autoHideDuration={5000}
              onClose={close}
              message="this is a snackbar"
              actions={[{ text: 'OK', onClick: close }]}
            />
          </Code>
        </Col>
      </Row>
    </Block>
  );
}

export default Snackbars;
