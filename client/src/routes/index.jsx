import { createBrowserRouter } from "react-router-dom";

// project import
import MainRoutes from "./MainRoutes";
import PublisherRoutes from "./PublisherRoutes";
import AdvertiserRoutes from "./AdvertiserRoutes";
import AdminRoutes from "./AdminRoutes";
import AuthenticationRoutes from "./AuthenticationRoutes";

import NotFound from "../pages/404-page.jsx";

// ==============================|| ROUTING RENDER ||============================== //

const router = createBrowserRouter([
  MainRoutes,
  PublisherRoutes,
  AdvertiserRoutes,
  AdminRoutes,
  AuthenticationRoutes,
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
