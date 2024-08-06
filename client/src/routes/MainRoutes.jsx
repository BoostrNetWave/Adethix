// ==============================|| MAIN ROUTING ||============================== //
import Home from "../pages/Main/Home.jsx";
import AboutUs from "../pages/Main/AboutUs.jsx";
import Login from "../pages/Main/Login.jsx";
import ContactUs from "../pages/Main/ContactUs.jsx";
import Team from "../pages/Main/Team.jsx";

const MainRoutes = {
  path: "/",
  children: [
    {
      path: "",
      index: true,
      element: <Home />,
    },
    {
      path: "auth",
      children: [
        {
          path: "login",
          element: <Login />,
        },
      ],
    },
    {
      path: "about-us",
      element: <AboutUs />,
    },
    {
      path: "contact-us",
      element: <ContactUs />,
    },
    {
      path: "team",
      element: <Team />,
    },
  ],
};

export default MainRoutes;
