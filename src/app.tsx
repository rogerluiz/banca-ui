import styled from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

import Grid from 'elements/grid';
import Sidebar from 'compositions/sidebar';
import Header from 'compositions/header';
import RootRoutes from 'components/root-routes';

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
          <RootRoutes />
        </Main>
      </Grid>
    </BrowserRouter>
  );
}

export default App;
