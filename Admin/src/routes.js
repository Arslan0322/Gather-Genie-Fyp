import { Navigate, useRoutes } from 'react-router-dom';

//
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import RequestPage from './pages/RegistrationRequest';
import ManagePayments from './pages/ManagePayments';
import ManageClients from './pages/ManageClients';
import VendorDetail from './sections/@dashboard/VendorDetails/Index';
import ManageDeals from './pages/Deals/ManageDeals';
import DashboardLayout from './layouts/DashboardLayout';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/home',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'requests', element: <RequestPage /> },
        { path: 'payments', element: <ManagePayments /> },
        { path: 'clients', element: <ManageClients /> },
        { path: 'deals', element: <ManageDeals /> },
        { path: 'requests/:id', element: <VendorDetail /> },
      ],
    },
    {
      path: '/',
      element: <LoginPage />,
    },

    {
      path: '/*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
