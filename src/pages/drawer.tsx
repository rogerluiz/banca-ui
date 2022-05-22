import { useState } from 'react';

import Code from 'components/code';
import Row from 'elements/row';
import Col from 'elements/col';
import Button from 'elements/button';
import Block from 'components/block';
import NavDrawer from 'components/nav-drawer';

function Drawer(): JSX.Element {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDrawerBottom, setOpenDrawerBottom] = useState(false);

  const open = () => setOpenDrawer(true);
  const close = () => setOpenDrawer(false);

  const openBottom = () => setOpenDrawerBottom(true);
  const closeBottom = () => setOpenDrawerBottom(false);

  return (
    <Block
      page="/drawer"
      title="Navagation Drawer"
      legend="Navigation drawers provide access to destinations in your app."
    >
      <Row>
        <Col>
          <Code code={require('examples/nav-drawer/default.mdx')}>
            <Button onClick={open}>Open Left</Button>

            <NavDrawer open={openDrawer} direction="left" onClose={close} />
          </Code>
        </Col>
      </Row>

      <Row>
        <Col>
          <Code code={require('examples/nav-drawer/bottom.mdx')}>
            <Button onClick={openBottom}>Open Bottom</Button>

            <NavDrawer
              open={openDrawerBottom}
              direction="bottom"
              offsetHeight={100}
              onClose={closeBottom}
            />
          </Code>
        </Col>
      </Row>
    </Block>
  );
}

export default Drawer;
