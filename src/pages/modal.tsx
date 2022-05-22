import { useState } from 'react';

import { Sizes } from 'types';

import Title from 'elements/title';
import Code from 'components/code';
import PageBlock from 'components/block';

import Row from 'elements/row';
import Col from 'elements/col';
import Button from 'elements/button';
import ButtonGroup from '../components/button-group';

import Modal from '../components/modal';

function ModalDialog(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSize, setIsOpenSize] = useState(false);
  const [size, setSize] = useState<Sizes>('md');

  const setSizeAndOpen = (newSize: Sizes) => {
    setSize(newSize);
    requestAnimationFrame(() => setIsOpenSize(true));
  };

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const closeSize = () => setIsOpenSize(false);

  return (
    <PageBlock
      page="/modal"
      title="Modal"
      legend="A modal displays content that requires user interaction, in a layer above the page."
    >
      <Row>
        <Col>
          <Title>Default</Title>
        </Col>
      </Row>

      <Row>
        <Col>
          <Code code={require('examples/modal/default.mdx')}>
            <Button onClick={open}>Open modal</Button>
            <Modal
              open={isOpen}
              actions={[{ text: 'Try it now', onClick: close }, { text: 'ok' }]}
              heading="Test drive heading"
              onClose={close}
            >
              this is a content for modal
            </Modal>
          </Code>
        </Col>
      </Row>

      <Row>
        <Col>
          <Title>Modal Size</Title>
        </Col>
      </Row>

      <Row>
        <Col>
          <Code code={require('examples/modal/size.mdx')}>
            <ButtonGroup gap variant="secondary">
              <Button onClick={() => setSizeAndOpen('sm')}>small</Button>
              <Button onClick={() => setSizeAndOpen('md')}>medium</Button>
              <Button onClick={() => setSizeAndOpen('lg')}>large</Button>
              <Button onClick={() => setSizeAndOpen('xl')}>x-large</Button>
            </ButtonGroup>

            <Modal
              open={isOpenSize}
              size={size}
              actions={[
                { text: 'Get started', onClick: closeSize },
                { text: 'Skip' },
              ]}
              heading="Test drive heading"
              onClose={closeSize}
            >
              this is a content for modal
            </Modal>
          </Code>
        </Col>
      </Row>
    </PageBlock>
  );
}

export default ModalDialog;
