import { lazy } from "react";
// ==============================|| PUBLISHER ROUTING ||============================== //

// import PublisherLayout from "../pages/Publisher/PublisherLayout.jsx";
import Dashboard from "../layout/PublisherDashboard/index.jsx";
import ErrorPage from "../pages/ErrorPage";

import { loader as publisherDashboardLoader } from "../pages/Publisher/PublisherDashboard.jsx";
import { loader as publisherReportLoader } from "../pages/Publisher/PublisherReport.jsx";
import { loader as PublidherEmbedCodeLoader } from "../pages/Publisher/PublisherEmdebCode.jsx";
import { loader as PublisherSettingsLoader } from "../pages/Publisher/PublisherSettings.jsx";
import { loader as PublisherPayoutsLoader } from "../pages/Publisher/PublisherPayouts.jsx";

// Lazy load your components
const PublisherDashboard = lazy(() =>
  import("../pages/Publisher/PublisherDashboard.jsx")
);
const PublisherReport = lazy(() =>
  import("../pages/Publisher/PublisherReport.jsx")
);
const PublidherEmbedCode = lazy(() =>
  import("../pages/Publisher/PublisherEmdebCode.jsx")
);
const PublisherPayouts = lazy(() =>
  import("../pages/Publisher/PublisherPayouts.jsx")
);
const PublisherSettings = lazy(() =>
  import("../pages/Publisher/PublisherSettings.jsx")
);


// function delayForDemo(promise) {
//   return new Promise(resolve => {
//     setTimeout(resolve, 5000);
//   }).then(() => promise);
// }

const PublisherRoutes = {
  path: "/publisher",
  element: <Dashboard />,
  errorElement: <ErrorPage />,
  children: [
    {
      path: "",
      index: true,
      loader: publisherDashboardLoader,
      element: <PublisherDashboard />,
    },
    {
      path: "dashboard",
      loader: publisherDashboardLoader,
      element: <PublisherDashboard />,
    },
    {
      path: "reports",
      loader: publisherReportLoader,
      element: <PublisherReport />,
    },
    {
      path: "embed",
      loader: PublidherEmbedCodeLoader,
      element: <PublidherEmbedCode />,
    },
    {
      path: "payouts",
      loader: PublisherPayoutsLoader,
      element: <PublisherPayouts />,
    },
    {
      path: "settings",
      loader: PublisherSettingsLoader,
      element: <PublisherSettings />,
    },
  ],
};

export default PublisherRoutes;
