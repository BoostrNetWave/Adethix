import { lazy } from "react";
// ==============================|| ADVERTISER ROUTING ||============================== //

import Dashboard from "../layout/AdvertiserDashboard/index.jsx";
import ErrorPage from "../pages/ErrorPage";

import { loader as advertiserDashboardLoader } from "../pages/Advertiser/AdvertiserDashboard.jsx";
import { loader as advertiserReportLoader } from "../pages/Advertiser/AdvertiserReport.jsx";
import { loader as advertiserManageCampaignLoader } from "../pages/Advertiser/AdvertiserManageCampaign.jsx";
import { loader as advertiserCampaignReportLoader } from "../pages/Advertiser/AdvertiserCampaignReport.jsx";
import { loader as advertiserCampaignLoader } from "../pages/Advertiser/AdvertiserCampaign.jsx";
import { loader as advertiserAdvertisementLoader } from "../pages/Advertiser/AdvertiserAdvertisement.jsx";
import { loader as advertiserAdvertisementEditLoader } from "../pages/Advertiser/AdvertiserAdvertisementEdit.jsx";
import { loader as advertiserAdvertisementPreviewLoader } from "../pages/Advertiser/AdvertiserAdvertisementPreview.jsx";
import { loader as advertiserAdvertisementReportLoader } from "../pages/Advertiser/AdvertiserAdvertisementReport.jsx";
import { loader as advertiserSettingsLoader } from "../pages/Advertiser/AdvertiserSettings.jsx";
import { loader as advertiserAddMoneyLoader } from "../pages/Advertiser/AdvertiserAddMoney.jsx";

// Lazy load components
const AdvertiserDashboard = lazy(() =>
  import("../pages/Advertiser/AdvertiserDashboard.jsx")
);
const AdvertiserReport = lazy(() =>
  import("../pages/Advertiser/AdvertiserReport.jsx")
);
const AdvertiserManageCampaign = lazy(() =>
  import("../pages/Advertiser/AdvertiserManageCampaign.jsx")
);
const AdvertiserCreateCampaign = lazy(() =>
  import("../pages/Advertiser/AdvertiserCreateCampaign.jsx")
);
const AdvertiserCampaignReport = lazy(() =>
  import("../pages/Advertiser/AdvertiserCampaignReport.jsx")
);
const AdvertiserCampaign = lazy(() =>
  import("../pages/Advertiser/AdvertiserCampaign.jsx")
);
const AdvertiserCreateAdvertisement = lazy(() =>
  import("../pages/Advertiser/AdvertiserCreateAdvertisement.jsx")
);
const AdvertiserAdvertisement = lazy(() =>
  import("../pages/Advertiser/AdvertiserAdvertisement.jsx")
);
const AdvertiserAdvertisementEdit = lazy(() =>
  import("../pages/Advertiser/AdvertiserAdvertisementEdit.jsx")
);
const AdvertiserAdvertisementPreview = lazy(() =>
  import("../pages/Advertiser/AdvertiserAdvertisementPreview.jsx")
);
const AdvertiserAdvertisementReport = lazy(() =>
  import("../pages/Advertiser/AdvertiserAdvertisementReport.jsx")
);
const AdvertiserSettings = lazy(() =>
  import("../pages/Advertiser/AdvertiserSettings.jsx")
);
const AdvertiserAddMoney = lazy(() =>
  import("../pages/Advertiser/AdvertiserAddMoney.jsx")
);


const AdvertiserRoutes = {
  path: "/advertiser",
  element: <Dashboard />,
  errorElement: <ErrorPage />,
  children: [
    {
      path: "",
      index: true,
      loader: advertiserDashboardLoader,
      element: <AdvertiserDashboard />,
    },
    {
      path: "dashboard",
      loader: advertiserDashboardLoader,
      element: <AdvertiserDashboard />,
    },
    {
      path: "reports",
      loader: advertiserReportLoader,
      element: <AdvertiserReport />,
    },
    {
      path: "campaings",
      loader: advertiserManageCampaignLoader,
      element: <AdvertiserManageCampaign />,
    },
    {
      path: "settings",
      loader: advertiserSettingsLoader,
      element: <AdvertiserSettings />,
    },
    {
      path: "campaings/new",
      element: <AdvertiserCreateCampaign />,
    },
    {
      path: "campaings/:campaignId",
      loader: advertiserCampaignLoader,
      element: <AdvertiserCampaign />,
    },
    {
      path: "campaings/:campaignId/add-money",
      loader: advertiserAddMoneyLoader,
      element: <AdvertiserAddMoney />,
    },
    {
      path: "campaings/:campaignId/create",
      element: <AdvertiserCreateAdvertisement />,
    },
    {
      path: "campaings/:campaignId/report",
      loader: advertiserCampaignReportLoader,
      element: <AdvertiserCampaignReport />,
    },
    {
      path: "campaings/:campaignId/:adId",
      loader: advertiserAdvertisementLoader,
      element: <AdvertiserAdvertisement />,
    },
    {
      path: "campaings/:campaignId/:adId/preview",
      loader: advertiserAdvertisementPreviewLoader,
      element: <AdvertiserAdvertisementPreview />,
    },
    {
      path: "campaings/:campaignId/:adId/report",
      loader: advertiserAdvertisementReportLoader,
      element: <AdvertiserAdvertisementReport />,
    },
    // {
    //   path: "campaings/:campaignId/:adId/edit",
    //   loader: advertiserAdvertisementEditLoader,
    //   element: <AdvertiserAdvertisementEdit />,
    // },
  ],
};

export default AdvertiserRoutes;
