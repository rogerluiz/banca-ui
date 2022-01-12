import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { SIDEBAR_MENU } from 'constants/sidebar';

const Aside = styled.aside`
  width: 255px;
  height: 100%;
  min-height: 100vh;
  grid-area: sidebar;
  display: flex;
  flex-direction: column;
  background: var(--white);
  padding: 30px 0;
  border-right: 1px solid var(--gray10);
`;

const Nav = styled.nav`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Link = styled(NavLink)`
  padding: 10px 20px;
  font-size: 14px;
  text-decoration: none;
  color: var(--gray400);

  &.active {
    background: var(--gray10);
  }

  &:hover {
    background: var(--gray10);
  }
`;

const Strong = styled.h2`
  font-size: 12px;
  font-weight: 600;
  color: var(--gray40);
  padding-left: 20px;
  margin-bottom: 15px;
`;

function Sidebar(): JSX.Element {
  return (
    <Aside>
      <Strong>COMPONENTS</Strong>
      <Nav role="navigation">
        {SIDEBAR_MENU.map(({ label, to }) => (
          <Link key={to} to={to}>
            {label}
          </Link>
        ))}
      </Nav>
    </Aside>
  );
}

export default Sidebar;
