/* eslint-disable react-refresh/only-export-components */
import { useLoaderData, useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosInstance.js";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";

import CampaignReport from "../../components/Advertiser/Campaign/CampaignReport";

function AdvertiserCampaignReport() {
  const navigate = useNavigate();
  const [isLoggedIN, setIsLoggedIn] = useState(true);

  const response = useLoaderData();

  let [campaign, setCampaign] = useState();
  let [ads, setAds] = useState();
  let [reportInfo, setReportInfo] = useState();
  let [totalReportInfo, setTotalReportInfo] = useState();

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
        setReportInfo(response.data.reportInfo);
        setTotalReportInfo(response.data.totalReportInfo);
        // console.log(response.data)
      }
    }
  }, [response]);
  // console.log(data);

  return (
    <CampaignReport
      campaign={campaign}
      ads={ads}
      reportInfo={reportInfo}
      totalReportInfo={totalReportInfo}
    />
  );
}

export async function loader({ params }) {
  const { campaignId } = params;
  try {
    const response = await axiosInstance.get(
      `/api/advertiser/campaign/${campaignId}/report`
    );
    // console.log(response);
    return response;
  } catch (err) {
    // console.log(err);
    return err.response || err;
  }
}

export default AdvertiserCampaignReport;
