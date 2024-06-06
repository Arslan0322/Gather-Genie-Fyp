import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/auth/Login";
import SignUp from "../Pages/auth/SignUp";
import { ServiceDetailIndex } from "../Pages/ServiceDetail/Index";
import PaymentIntegration from "../Pages/PaymentIntegration/Index";
import ProfileDetails from "../Pages/ClientProfile/Profile";
import Bookings from "../Pages/Bookings/Index";
import { Deals } from "../Pages/Deals/Index";
import VendorHomePage from "../Pages/Vendor/Home/Index";
import VendorProfileDetails from "../Pages/Vendor/VendorProfile/VendorProfile";
import VendorBookings from "../Pages/Vendor/VendorBokings/Index";
import Messages from "../Pages/Messages/Messages";
import { VendorReviews } from "../Pages/Vendor/Reviews/Index";
import AddService from "../Pages/Vendor/CreateService/Index";
import AddToCartPage from "../Pages/AddToCart/AddToCartPage";
import SearchedResultIndex from "../Pages/SearchResults/Index";
import ServiceDetails from "../Pages/Vendor/Home/ServiceDetails";
import SetPassword from "../Pages/SetPassword/Index";
import VendorIndex from "../Pages/VendorCards";
import ForgetPassword from "../Pages/auth/ForgetPassword";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/:id/:uid",
    element: <ServiceDetailIndex />,
  },
  {
    path: "/payment",
    element: <PaymentIntegration />,
  },
  {
    path: "/clientprofile",
    element: <ProfileDetails />,
  },
  {
    path: "/searchresult",
    element: <SearchedResultIndex />,
  },
  {
    path: "/vendorprofile",
    element: <VendorProfileDetails />,
  },
  {
    path: "/bookings",
    element: <Bookings />,
  },
  {
    path: "/deals",
    element: <Deals />,
  },
  {
    path: "/home",
    element: <VendorHomePage />,
  },
  {
    path: "/home/:id",
    element: <ServiceDetails />,
  },

  {
    path: "/addservices",
    element: <AddService />,
  },
  {
    path: "/addservices/:id",
    element: <AddService />,
  },
  {
    path: "/vendorbookings",
    element: <VendorBookings />,
  },
  {
    path: "/chat",
    element: <Messages />,
  },
  {
    path: "/chat/:id",
    element: <Messages />,
  },
  // {
  //   path: "/reviews",
  //   element: <VendorReviews />,
  // },
  {
    path: "/:name",
    element: <VendorIndex />,
  },
  {
    path: "/cart",
    element: <AddToCartPage />,
  },
  {
    path: "/setpassword/:id",
    element: <SetPassword />,
  },
  {
    path: "/forgetpass",
    element: <ForgetPassword />,
  },
]);
