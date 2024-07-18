import { lazy } from "react";
// ==============================|| ADMIN ROUTING ||============================== //
import Dashboard from "../layout/Admin/index";
import ErrorPage from "../pages/ErrorPage";

// Pages
const AdminDashboard = lazy(() => import("../pages/Admin/AdminDashboard"));
const AdminReport = lazy(() => import("../pages/Admin/AdminReport"));
const AdminManageAds = lazy(() => import("../pages/Admin/AdminManageAds"));
const AdminAuthorizeAds = lazy(() =>
  import("../pages/Admin/AdminAuthorizeAds")
);
const AdminAuthorizeAdsReview = lazy(() =>
  import("../pages/Admin/AdminAuthorizeAdsReview")
);
const AdminAuthorizeAdPreview = lazy(() =>
  import("../pages/Admin/AdminAuthorizeAdPreview")
);
const AdminAuthorizePublisher = lazy(() =>
  import("../pages/Admin/AdminAuthorizePublisher")
);
const AdminAuthorizePublisherReview = lazy(() =>
  import("../pages/Admin/AdminAuthorizePublisherReview")
);
const AdminAuthorizePublisherActivation = lazy(() =>
  import("../pages/Admin/AdminAuthorizePublisherActivation")
);
const AdminAuthorizeAdvertiser = lazy(() =>
  import("../pages/Admin/AdminAuthorizeAdvertiser")
);
const AdminAuthorizeAdvertiserReview = lazy(() =>
  import("../pages/Admin/AdminAuthorizeAdvertiserReview")
);
const AdminSettings = lazy(() => import("../pages/Admin/AdminSettings"));

// Loaders
import { loader as adminDashboardLoader } from "../pages/Admin/AdminDashboard";
import { loader as adminReportLoader } from "../pages/Admin/AdminReport";
import { loader as adminManageAdsLoader } from "../pages/Admin/AdminManageAds";
import { loader as adminAuthorizeAdsLoader } from "../pages/Admin/AdminAuthorizeAds";
import { loader as adminAuthorizeAdsReviewLoader } from "../pages/Admin/AdminAuthorizeAdsReview";
import { loader as adminAuthorizeAdPreviewLoader } from "../pages/Admin/AdminAuthorizeAdPreview";
import { loader as adminAuthorizePublisherLoader } from "../pages/Admin/AdminAuthorizePublisher";
import { loader as adminAuthorizePublisherReviewLoader } from "../pages/Admin/AdminAuthorizePublisherReview";
import { loader as adminAdminAuthorizePublisherActivationLoader } from "../pages/Admin/AdminAuthorizePublisherActivation";
import { loader as adminAuthorizeAdvertiserLoader } from "../pages/Admin/AdminAuthorizeAdvertiser";
import { loader as adminAuthorizeAdvertiserReviewLoader } from "../pages/Admin/AdminAuthorizeAdvertiserReview";
import { loader as adminSettingsLoader } from "../pages/Admin/AdminSettings";

// function delayForDemo(promise) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, 5000);
//   }).then(() => promise);
// }

const PublisherRoutes = {
  path: "/admin",
  element: <Dashboard />,
  errorElement: <ErrorPage />,
  children: [
    {
      path: "",
      index: true,
      loader: adminDashboardLoader,
      element: <AdminDashboard />,
    },
    {
      path: "dashboard",
      loader: adminDashboardLoader,
      element: <AdminDashboard />,
    },
    {
      path: "reports",
      loader: adminReportLoader,
      element: <AdminReport />,
    },
    {
      path: "settings",
      loader: adminSettingsLoader,
      element: <AdminSettings />,
    },
    {
      path: "manage-ads",
      loader: adminManageAdsLoader,
      element: <AdminManageAds />,
    },
    {
      path: "authorize-ads",
      loader: adminAuthorizeAdsLoader,
      element: <AdminAuthorizeAds />,
    },
    {
      path: "authorize-ads/:reviewId",
      loader: adminAuthorizeAdsReviewLoader,
      element: <AdminAuthorizeAdsReview />,
    },
    {
      path: "authorize-ads/:reviewId/preview",
      loader: adminAuthorizeAdPreviewLoader,
      element: <AdminAuthorizeAdPreview />,
    },
    {
      path: "authorize-publishers",
      loader: adminAuthorizePublisherLoader,
      element: <AdminAuthorizePublisher />,
    },
    {
      path: "authorize-publishers/:publisherId/review",
      loader: adminAuthorizePublisherReviewLoader,
      element: <AdminAuthorizePublisherReview />,
    },
    {
      path: "authorize-publishers/:publisherId/activate",
      loader: adminAdminAuthorizePublisherActivationLoader,
      element: <AdminAuthorizePublisherActivation />,
    },
    {
      path: "authorize-advertisers",
      loader: adminAuthorizeAdvertiserLoader,
      element: <AdminAuthorizeAdvertiser />,
    },
    {
      path: "authorize-advertisers/:advertiserId/review",
      loader: adminAuthorizeAdvertiserReviewLoader,
      element: <AdminAuthorizeAdvertiserReview />,
    },
  ],
};

export default PublisherRoutes;
