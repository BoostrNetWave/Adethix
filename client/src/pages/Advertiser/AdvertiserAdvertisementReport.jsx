/* eslint-disable react-refresh/only-export-components */
import { useLoaderData, useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosInstance.js";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";

import AdvertisementReport from "../../components/Advertiser/Advertisement/AdvertisementReport";

function AdvertiserAdvertisementReport() {
  const navigate = useNavigate();
  const [isLoggedIN, setIsLoggedIn] = useState(true);

  const response = useLoaderData();

  let [ad, setAd] = useState();
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
        setAd(response.data.ad);
        setReportInfo(response.data.reportInfo);
        setTotalReportInfo(response.data.totalReportInfo);
        // console.log(response.data)
      }
    }
  }, [response]);
  // console.log(data);

  return (
    <AdvertisementReport
      ad={ad}
      reportInfo={reportInfo}
      totalReportInfo={totalReportInfo}
    />
  );
}

export async function loader({ params }) {
  const { campaignId, adId } = params;
  try {
    const response = await axiosInstance.get(
      `/api/advertiser/campaign/${campaignId}/${adId}/report`
    );
    // console.log(response);
    return response;
  } catch (err) {
    // console.log(err);
    return err.response || err;
  }
}

export default AdvertiserAdvertisementReport;
