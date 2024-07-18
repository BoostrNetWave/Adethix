import AdvertisementEdit from "../../components/Advertiser/Advertisement/AdvertisementEdit";
import axiosInstance from "../../axiosInstance";
import { useLoaderData } from "react-router-dom";

function AdvertiserAdvertisementEdit() {
  const response = useLoaderData();
  let ad;
  if (response?.status && response.status === 200) {
    ad = response.data;
    // console.log(ad);
  }
  return <AdvertisementEdit ad={ad}/>;
}

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ params }) {
  const { campaignId, adId } = params;
  try {
    const response = await axiosInstance.get(
      `/api/advertiser/campaign/${campaignId}/${adId}`
    );
    // console.log(response);
    return response;
  } catch (err) {
    // console.log(err);
    return err.response || err;
  }
}

export default AdvertiserAdvertisementEdit;
