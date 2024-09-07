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
import PublisherFAQ from "../pages/Main/PublisherFAQ.jsx"
import AdvertiserFAQ from "../pages/Main/AdvertiserFAQ.jsx"

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
  ],
};

export default MainRoutes;
