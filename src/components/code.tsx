import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import prism from 'react-syntax-highlighter/dist/esm/styles/prism/prism';

import Button from 'elements/button';

interface CodeProps extends React.AllHTMLAttributes<HTMLElement> {
  code?: string;
  isMarkup?: boolean;
  children?: React.ReactNode;
  expandCode?: boolean;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: var(--white);
  margin-bottom: 30px;
  border-radius: 4px;
  border: 1px solid var(--gray200);
  /* overflow: hidden; */
  position: relative;

  pre {
    margin: 0 !important;
    padding: 25px 25px !important;
  }
`;

const Block = styled.div`
  padding: 20px 20px;
  background-size: 20px 20px;
  background-position: 0px 0px, 10px 0px, 10px -10px, 0px 10px;
  background-image: linear-gradient(
      45deg,
      rgb(249, 249, 250) 25%,
      transparent 25%
    ),
    linear-gradient(135deg, rgb(249, 249, 250) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, rgb(249, 249, 250) 75%),
    linear-gradient(135deg, transparent 75%, rgb(249, 249, 250) 75%);
`;

const ScrollContainer = styled.div<CodeProps>`
  height: auto;
  max-height: 200px;
  padding-bottom: 35px;
  overflow: hidden;
  position: relative;

  &:after {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 55%;
    top: 33%;
    left: 0px;
    background-image: linear-gradient(
      rgba(255, 255, 255, 0) 0%,
      rgb(244, 245, 247) 90%
    );
  }

  ${(props) =>
    props.expandCode &&
    css`
      max-height: 1000px;
      &:after {
        opacity: 0;
      }
    `};
`;

const Expand = styled.div`
  width: 100%;
  height: 35px;
  display: flex;
  bottom: 0;
  position: absolute;
  background: var(--light);
`;

function Code({
  code = '',
  isMarkup = true,
  expandCode = false,
  children,
}: CodeProps): JSX.Element {
  SyntaxHighlighter.registerLanguage('jsx', jsx);

  const [html, setHtml] = useState(code);
  const [expand, setExpand] = useState<boolean>(expandCode);

  useEffect(() => {
    if (isMarkup) {
      fetch(code)
        .then((response) => {
          return response.text();
        })
        .then((text) => {
          setHtml(text);
        });
    }
  }, [code, isMarkup]);

  const showCode = () => setExpand(!expand);

  return (
    <Container>
      <Block>{children}</Block>
      <ScrollContainer expandCode={expand}>
        <SyntaxHighlighter wrapLines language="jsx" style={prism}>
          {html.trim()}
        </SyntaxHighlighter>
      </ScrollContainer>
      <Expand>
        <Button
          size="sm"
          isText
          block
          color="gray50"
          variant="dark"
          onClick={showCode}
        >
          <b>{expand ? 'SHOW LESS' : 'SHOW MORE'}</b>
        </Button>
      </Expand>
    </Container>
  );
}

export default Code;
