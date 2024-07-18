import Advertisement from "../../components/Advertiser/Advertisement/Advertisement";

import { useLoaderData, useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosInstance.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

function AdvertiserAdvertisement() {
  const response = useLoaderData();

  const navigate = useNavigate();
  const [isLoggedIN, setIsLoggedIn] = useState(true);

  let [ad, setAd] = useState();
  let [adInfo, setAdInfo] = useState();

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
        // console.log(response.data)
        setAd(response.data.ad);
        setAdInfo(response.data.adInfo);
      }
    }
  }, [response]);
  // console.log(data);

  return <Advertisement ad={ad} adInfo={adInfo}/>;
}

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ params }) {
  const { campaignId, adId } = params;
  try {
    const response = await axiosInstance.get(
      `/api/advertiser/campaign/${campaignId}/${adId}/home`
    );
    // console.log(response);
    return response;
  } catch (err) {
    // console.log(err);
    return err.response || err;
  }
}

export default AdvertiserAdvertisement;
