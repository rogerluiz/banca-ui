import { Routes, Route } from 'react-router-dom';
import { RoutesType } from 'types';

import Home from 'pages/home';
import Buttons from 'pages/buttons';
import Loaders from 'pages/loaders';
// import Alerts from 'pages/alerts';
import Snackbars from 'pages/snackbars';
import Drawer from 'pages/drawer';
import Images from 'pages/images';
import GridLayout from 'pages/grid-layout';
import GridSystem from 'pages/grid-system';
import Icons from 'pages/icons';
// import Skeleton from 'pages/skeleton';
import TextField from 'pages/text-field';
// import Tooltip from 'pages/tooltip';
import Avatar from 'pages/avatar';
import Logo from 'pages/logo';
import Modal from 'pages/modal';
// import Badge from 'pages/badge';
// import Radio from 'pages/radio';
// import Checkbox from 'pages/checkbox';
// import Tag from 'pages/tag';
// import Toogle from 'pages/toogle';
import Select from 'pages/select';

const ROUTES: RoutesType[] = [
  {
    key: 'home',
    path: '/',
    element: <Home />,
  },
  {
    key: 'avatar',
    path: '/avatar',
    element: <Avatar />,
    children: [{ path: '/avatar/:code', element: <Avatar /> }],
  },
  // { key: 'alert', path: 'alert', element: Alerts },
  {
    key: 'button',
    path: 'button',
    element: <Buttons />,
    children: [{ path: '/button/:code', element: <Buttons /> }],
  },
  // { key: 'badge', path: 'badge', element: Badge },
  // { key: 'checkbox', path: 'checkbox', element: Checkbox },
  { key: 'drawer', path: 'drawer', element: <Drawer /> },
  {
    key: 'image',
    path: 'image',
    element: <Images />,
    children: [{ path: '/image/:code', element: <Images /> }],
  },
  {
    key: 'grid-layout',
    path: 'grid-layout',
    element: <GridLayout />,
    children: [{ path: '/grid-layout/:code', element: <GridLayout /> }],
  },
  {
    key: 'grid-system',
    path: 'grid-system',
    element: <GridSystem />,
    children: [{ path: '/grid-system/:code', element: <GridSystem /> }],
  },
  {
    key: 'icon',
    path: 'icon',
    element: <Icons />,
    children: [{ path: '/icon/:code', element: <Icons /> }],
  },
  {
    key: 'logo',
    path: 'logo',
    element: <Logo />,
    children: [{ path: '/logo/:code', element: <Logo /> }],
  },
  {
    key: 'loader',
    path: 'loader',
    element: <Loaders />,
    children: [{ path: '/loader/:code', element: <Loaders /> }],
  },
  { key: 'modal', path: 'modal', element: <Modal /> },
  // { key: 'radio', path: 'radio', element: Radio },
  { key: 'select', path: 'select', element: <Select /> },
  // { key: 'skeleton', path: 'skeleton', element: Skeleton },
  {
    key: 'snackbars',
    path: 'snackbars',
    element: <Snackbars />,
    children: [{ path: '/snackbars/:code', element: <Snackbars /> }],
  },
  // { key: 'tag', path: 'tag', element: Tag },
  {
    key: 'textfield',
    path: 'textfield',
    element: <TextField />,
    children: [{ path: '/textfield/:code', element: <TextField /> }],
  },
  // { key: 'tooltip', path: 'tooltip', element: Tooltip },
  // { key: 'toogle', path: 'toogle', element: Toogle },
];

function RootRoutes() {
  function renderChildren(children: RoutesType[], key: string) {
    return children.map(({ path, element }: RoutesType) => (
      <Route key={`${key}:code`} path={path} element={element} />
    ));
  }

  return (
    <Routes>
      {ROUTES.map(({ path, element, key, children }: RoutesType) => (
        <Route key={key} path={path} element={element}>
          {renderChildren(children || [], key as string)}
        </Route>
      ))}
    </Routes>
  );
}

export default RootRoutes;
