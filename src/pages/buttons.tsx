import styled from 'styled-components';

import Container from 'elements/container';
import Row from 'elements/row';
import Col from 'elements/col';
import Grid from 'elements/grid';

const ColorPallet = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
  overflow: hidden;

  span {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

function Home(): JSX.Element {
  return (
    <Container style={{ margin: '0 0 20px' }}>
      <Row>
        <Col>
          <Grid rows="repeat(2, 3fr)" columns="repeat(3, 1fr)" gap={2}>
            <ColorPallet style={{ background: 'var(--primary-dark)' }}>
              <span>#CC001B</span>
            </ColorPallet>
            <ColorPallet style={{ background: 'var(--primary)' }}>
              <span>#FF4D66</span>
            </ColorPallet>
            <ColorPallet style={{ background: 'var(--primary-lither)' }}>
              <span>#FF8595</span>
            </ColorPallet>
            <ColorPallet style={{ background: 'var(--secondary-dark)' }}>
              <span>#203DFE</span>
            </ColorPallet>
            <ColorPallet style={{ background: 'var(--secondary)' }}>
              <span>#4D66FE</span>
            </ColorPallet>
            <ColorPallet style={{ background: 'var(--secondary-lither)' }}>
              <span>#8595FE</span>
            </ColorPallet>
          </Grid>
        </Col>
      </Row>

      <Row>
        <Col>
          <Grid rows="repeat(3, 3fr)" columns="repeat(3, 1fr)" gap={2}>
            <ColorPallet style={{ background: 'var(--gray10)' }}>
              <span>#F5F5F5</span>
            </ColorPallet>
            <ColorPallet style={{ background: 'var(--gray20)' }}>
              <span>#F5F5F5</span>
            </ColorPallet>
            <ColorPallet style={{ background: 'var(--gray30)' }}>
              <span>#C2C2C2</span>
            </ColorPallet>
            <ColorPallet style={{ background: 'var(--gray40)' }}>
              <span>#ADADAD</span>
            </ColorPallet>
            <ColorPallet style={{ background: 'var(--gray50)' }}>
              <span>#8F8F8F</span>
            </ColorPallet>
            <ColorPallet style={{ background: 'var(--gray60)' }}>
              <span>#7A7A7A</span>
            </ColorPallet>
            <ColorPallet style={{ background: 'var(--gray70)' }}>
              <span>#5C5C5C</span>
            </ColorPallet>
            <ColorPallet style={{ background: 'var(--gray80)' }}>
              <span>#3D3D3D</span>
            </ColorPallet>
            <ColorPallet style={{ background: 'var(--gray90)' }}>
              <span>#333333</span>
            </ColorPallet>
            <ColorPallet style={{ background: 'var(--gray100)' }}>
              <span>#1F1F1F</span>
            </ColorPallet>
          </Grid>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
