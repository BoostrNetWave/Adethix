import Campaign from "../../components/Advertiser/Campaign/Campaign";

import { useLoaderData, useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosInstance.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

function AdvertiserCampaign() {
  const navigate = useNavigate();
  const [isLoggedIN, setIsLoggedIn] = useState(true);

  const response = useLoaderData();

  let [campaign, setCampaign] = useState();
  let [ads, setAds] = useState();
  let [adInfo, setAdInfo] = useState();
  let [campaignInfo, setCampaignInfo] = useState();

  useEffect(() => {
    if (!isLoggedIN) {
      navigate("/auth/login");
    }
  }, [isLoggedIN, navigate]);

  useEffect(() => {
    if (response?.status) {
      if (response.status === 401 || response.status === 403) {
        // console.log(response.data.message);
        toast.error(response.data.message);
        toast.error("Login again");
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      } else if (response.status === 200) {
        setCampaign(response.data.campaign);
        setAds(response.data.ads);
        setAdInfo(response.data.adInfo);
        setCampaignInfo(response.data.campaignInfo);
        // console.log(response.data)
      }
    }
  }, [response]);
  // console.log(data);

  return (
    <Campaign
      campaign={campaign}
      ads={ads}
      adInfo={adInfo}
      campaignInfo={campaignInfo}
    />
  );
}

export async function loader({ params }) {
  const { campaignId } = params;
  try {
    const response = await axiosInstance.get(
      `/api/advertiser/campaign/${campaignId}`
    );
    // console.log(response);
    return response;
  } catch (err) {
    // console.log(err);
    return err.response || err;
  }
}

export default AdvertiserCampaign;
