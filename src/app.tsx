import styled from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { RoutesType } from 'types';
import { ROUTES } from 'constants/routes';

import Grid from 'elements/grid';
import Sidebar from 'compositions/sidebar';
import Header from 'compositions/header';

const Main = styled.main`
  width: calc(100vw - 270px);
  grid-area: main;
  padding-top: 60px;
`;

function App() {
  return (
    <BrowserRouter>
      <Grid
        areas={`
          "header header header header"
          "sidebar main main main"
          "sidebar main main main"
        `}
      >
        <Header />
        <Sidebar />
        <Main aria-label="Main Content" role="main">
          <Routes>
            {ROUTES.map(({ path, element, key }: RoutesType) => (
              <Route key={key} path={path} element={element} />
            ))}
          </Routes>
        </Main>
      </Grid>
    </BrowserRouter>
  );
}

export default App;
