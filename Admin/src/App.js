import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from "react-redux";
import {store} from "./store";
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
// ----------------------------------------------------------------------

export default function App() {
  return (
    <HelmetProvider>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>
          <ScrollToTop />
          <StyledChart />
          <Router />
          <ToastContainer />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
    </HelmetProvider>
  );
}
