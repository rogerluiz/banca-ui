import React from 'react';
import styled from 'styled-components';

import Container from 'elements/container';
import Jumbotron from './jumbotron';

interface BlockProps extends React.AllHTMLAttributes<HTMLElement> {
  legend?: React.ReactNode;
  page?: string;
  title: string;
}

const Box = styled.div`
  width: 100%;
  max-width: 1000px;
  padding-left: 40px;
`;

function Block({
  page,
  legend,
  title = '',
  children,
}: BlockProps): JSX.Element {
  return (
    <>
      <Jumbotron page={page} legend={legend}>
        {title}
      </Jumbotron>
      <Box>
        <Container>{children}</Container>
      </Box>
    </>
  );
}

export default Block;
