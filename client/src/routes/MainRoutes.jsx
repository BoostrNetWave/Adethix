// ==============================|| MAIN ROUTING ||============================== //
import Home from "../pages/Main/Home.jsx";
import AboutUs from "../pages/Main/AboutUs.jsx";
import Login from "../pages/Main/Login.jsx";
import ContactUs from "../pages/Main/ContactUs.jsx";
import Team from "../pages/Main/Team.jsx";
import Terms from "../pages/Main/Terms.jsx";
import PrivacyPolicy from "../pages/Main/PrivacyPolicy.jsx";
import PublisherPolicyPage from "../pages/Publisher/PublisherPolicyPage.jsx";
import TermsAndCondition from "../pages/Main/TermsAndCondition.jsx";
import GoogleAdsComparision from "../pages/Main/GoogleAdsComparision.jsx";
import Pricing from "../pages/Main/Pricing.jsx";
import PublisherFAQ from "../pages/Main/PublisherFAQ.jsx";
import AdvertiserFAQ from "../pages/Main/AdvertiserFAQ.jsx";
import RevenueCalculator from "../pages/Publisher/RevenueCalculator.jsx";
import PublisherGuide from "../pages/Publisher/PublisherGuide.jsx";
import CampaignCalculator from "../pages/Advertiser/CampaignCalculator.jsx";
import VerifyEmail from "../pages/Main/VerifyEmail.jsx";
import CalcellationRefundPolicy from "../pages/Main/CalcellationRefundPolicy.jsx";

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
        {
          path: "verify-email",
          element: <VerifyEmail />,
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
    {
      path: "alternative-to-google-ads",
      element: <GoogleAdsComparision />,
    },
    {
      path: "terms-of-use",
      element: <Terms />,
    },
    {
      path: "privacy-policy",
      element: <PrivacyPolicy />,
    },
    {
      path: "publisher-policy",
      element: <PublisherPolicyPage />,
    },
    {
      path: "cancellation-refund-policy",
      element: <CalcellationRefundPolicy />,
    },
    {
      path: "terms-and-conditions",
      element: <TermsAndCondition />,
    },
    {
      path: "pricing",
      element: <Pricing />,
    },
    {
      path: "publishers/faq",
      element: <PublisherFAQ />,
    },
    {
      path: "advertisers/faq",
      element: <AdvertiserFAQ />,
    },
    {
      path: "publishers/calculator",
      element: <RevenueCalculator />,
    },
    {
      path: "publishers/guide",
      element: <PublisherGuide />,
    },
    {
      path: "advertisers/calculator",
      element: <CampaignCalculator />,
    },
  ],
};

export default MainRoutes;
