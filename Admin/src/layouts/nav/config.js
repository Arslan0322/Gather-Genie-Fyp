// component

import SvgColor from '../../components/svg-color';
// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Dashboard',
    path: '/home/app',
    icon: icon('dashboard'),
  },
  {
    title: 'Registration Requests',
    path: '/home/requests',
    icon: icon('request'),
  },
  // {
  //   title: 'Manage Deals',
  //   path: '/home/deals',
  //   icon: icon('deal'),
  // },

  {
    title: 'Manage Payments',
    path: '/home/payments',
    icon: icon('payment'),
  },
  {
    title: 'Manage Clients',
    path: '/home/clients',
    icon: icon('ic_user'),
  },
];

export default navConfig;
