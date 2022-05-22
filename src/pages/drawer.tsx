import { useCallback, useState } from 'react';
import styled from 'styled-components';

import Code from 'components/code';
import Row from 'elements/row';
import Col from 'elements/col';
import Button from 'elements/button';
import Block from 'components/block';
import NavDrawer, { DrawerDirection } from 'components/nav-drawer';

const ContentSpace = styled.div`
  display: flex;
  justify-content: flex-start;
`;

function Drawer(): JSX.Element {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDrawerBottom, setOpenDrawerBottom] = useState(false);
  const [horizontal, setHorizontal] = useState('left');
  const [vertical, setVertical] = useState('bottom');

  const open = useCallback((direction: string) => {
    setOpenDrawer(true);
    setHorizontal(direction);
  }, []);
  const close = () => setOpenDrawer(false);

  const openBottom = useCallback((direction: string) => {
    setOpenDrawerBottom(true);
    setVertical(direction);
  }, []);
  const closeBottom = () => setOpenDrawerBottom(false);

  return (
    <Block
      page="/drawer"
      title="Drawer"
      legend="A drawer is a panel that slides in from the left side of the screen."
    >
      <Row>
        <Col>
          <Code code={require('examples/nav-drawer/default.mdx')}>
            <ContentSpace>
              <Button
                onClick={() => open('left')}
                style={{ marginRight: '10px' }}
              >
                Open Left
              </Button>
              <Button onClick={() => open('right')}>Open Right</Button>
            </ContentSpace>

            <NavDrawer
              isOpen={openDrawer}
              direction={horizontal as DrawerDirection}
              onClose={close}
            >
              Content
            </NavDrawer>
          </Code>
        </Col>
      </Row>

      <Row>
        <Col>
          <Code code={require('examples/nav-drawer/bottom.mdx')}>
            <ContentSpace>
              <Button
                onClick={() => openBottom('bottom')}
                style={{ marginRight: '10px' }}
              >
                Open Bottom
              </Button>
              <Button onClick={() => openBottom('top')}>Open Top</Button>
            </ContentSpace>

            <NavDrawer
              isOpen={openDrawerBottom}
              direction={vertical as DrawerDirection}
              width="medium"
              onClose={closeBottom}
            />
          </Code>
        </Col>
      </Row>
    </Block>
  );
}

export default Drawer;
