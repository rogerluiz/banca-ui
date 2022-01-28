import styled from 'styled-components';

import Logo from 'elements/logo';

const Container = styled.header`
  width: 100%;
  height: 60px;
  grid-area: header;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: fixed;
  padding: 20px 25px;
  background: var(--primary);
  border-bottom: 1px solid var(--primary-dark);
  z-index: 10;
`;

function Header(): JSX.Element {
  return (
    <Container role="menubar" aria-label="Main Header">
      <Logo size="md" color="white" />
    </Container>
  );
}

export default Header;
