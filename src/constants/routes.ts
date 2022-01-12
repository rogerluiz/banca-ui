import { RoutesType } from 'types';

import Home from 'pages/home';
import Buttons from 'pages/buttons';
// import Loaders from '../pages/loaders';
// import Alerts from '../pages/alerts';
// import Snackbars from '../pages/snackbars';
// import Drawer from '../pages/drawer';
// import Images from '../pages/images';
// import GridLayout from '../pages/grid-layout';
// import GridSystem from '../pages/grid-system';
// import Icons from '../pages/icons';
// import Skeleton from '../pages/skeleton';
// import TextField from '../pages/text-field';
// import Tooltip from '../pages/tooltip';
// import Avatar from '../pages/avatar';
// import Logo from '../pages/logo';
// import ModalDialog from '../pages/modal-dialog';
// import Badge from '../pages/badge';
// import Radio from '../pages/radio';
// import Checkbox from '../pages/checkbox';
// import Tag from '../pages/tag';
// import Toogle from '../pages/toogle';
// import Select from '../pages/select';

export const ROUTES: RoutesType[] = [
  { key: 'home', path: '/', exact: true, component: Home },
  // { key: 'avatar', path: '/avatar', exact: true, component: Avatar },
  // { key: 'alert', path: '/alert', exact: true, component: Alerts },
  { key: 'button', path: '/button', exact: true, component: Buttons },
  // { key: 'badge', path: '/badge', exact: true, component: Badge },
  // { key: 'checkbox', path: '/checkbox', exact: true, component: Checkbox },
  // { key: 'drawer', path: '/drawer', exact: true, component: Drawer },
  // { key: 'image', path: '/image', exact: true, component: Images },
  // { key: 'grid-layout', path: '/grid-layout', exact: true, component: GridLayout },
  // { key: 'grid-system', path: '/grid-system', exact: true, component: GridSystem },
  // { key: 'icon', path: '/icon', exact: true, component: Icons },
  // { key: 'logo', path: '/logo', exact: true, component: Logo },
  // { key: 'loader', path: '/loader', exact: true, component: Loaders },
  // { key: 'modal-dialog', path: '/modal-dialog', exact: true, component: ModalDialog },
  // { key: 'radio', path: '/radio', exact: true, component: Radio },
  // { key: 'select', path: '/select', exact: true, component: Select },
  // { key: 'skeleton', path: '/skeleton', exact: true, component: Skeleton },
  // { key: 'snackbars', path: '/snackbars', exact: true, component: Snackbars },
  // { key: 'tag', path: '/tag', exact: true, component: Tag },
  // { key: 'textfield', path: '/textfield', exact: true, component: TextField },
  // { key: 'tooltip', path: '/tooltip', exact: true, component: Tooltip },
  // { key: 'toogle', path: '/toogle', exact: true, component: Toogle },
];
