// ==============================|| MAIN ROUTING ||============================== //
import Home from "../pages/Main/Home.jsx";
import Login from "../pages/Main/Login.jsx";

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
  ],
};

export default MainRoutes;
