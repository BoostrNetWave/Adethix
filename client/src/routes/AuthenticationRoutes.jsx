// ==============================|| AUTHENTICATION ROUTING ||============================== //
import PublisherSignIn from "../pages/Publisher/PublisherSignIn";
// import PublisherForgotPassword from "../pages/Publisher/PublisherForgotPassword";
import PublisherSignUp from "../pages/Publisher/PublisherSignUp";

import AdvertiserSignIn from "../pages/Advertiser/AdvertiserSignIn";
import AdvertiserSignUp from "../pages/Advertiser/AdvertiserSignUp";
// import AdvertiserForgotPassword from "../pages/Advertiser/AdvertiserForgotPassword";

const AuthenticationRoutes = {
  path: "/",
  children: [
    {
      path: "advertiser",
      children: [
        {
          path: "signin",
          element: <AdvertiserSignIn />,
        },
        // {
        //   path: "forgot-password",
        //   element: <AdvertiserForgotPassword />,
        // },
      ],
    },
    {
      path: "join-as-publisher",
      element: <PublisherSignUp />,
    },
    {
      path: "join-as-advertiser",
      element: <AdvertiserSignUp />,
    },
    {
      path: "publisher",
      children: [
        {
          path: "signin",
          element: <PublisherSignIn />,
        },
        // {
        //   path: "forgot-password",
        //   element: <PublisherForgotPassword />,
        // },
      ],
    },
  ],
};

export default AuthenticationRoutes;
