import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

interface JumbotronProps extends React.AllHTMLAttributes<HTMLElement> {
  legend?: React.ReactNode;
  page?: string;
}

const Container = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  background: rgb(250, 250, 250);
  padding: 40px 60px 0;
  margin-bottom: 30px;
`;
const Heading = styled.h1`
  font-size: 25px;
  font-weight: 400;
  color: var(--gray60);
`;
const Desc = styled.legend`
  font-size: 15px;
  margin-top: 15px;
  color: var(--gray40);
`;

const Nav = styled.nav`
  width: 100%;
  height: 34px;
  max-width: 600px;
  margin-top: auto;
  border-bottom: 2px solid var(--gray20);
  grid-column: 1 / span 12;
`;
const Link = styled(NavLink)`
  text-decoration: none;
  font-size: 14px;
  padding-left: 14px;
  padding-right: 14px;
  height: 34px;
  display: inline-flex;
  align-items: center;
  font-weight: 400;
  color: var(--gray40);
  border-bottom: 2px solid transparent;

  &:hover {
    color: var(--secondary);
  }

  &.active {
    color: var(--secondary);
    border-color: var(--secondary);
  }
`;

function Jumbotron({
  page = '',
  legend,
  children,
}: JumbotronProps): JSX.Element {
  return (
    <Container>
      <Heading>{children}</Heading>
      <Desc>{legend}</Desc>

      <Nav aria-label="page tabs">
        <Link to={page}>Examples</Link>
        <Link to={`${page}/code`}>Code</Link>
      </Nav>
    </Container>
  );
}

export default Jumbotron;
