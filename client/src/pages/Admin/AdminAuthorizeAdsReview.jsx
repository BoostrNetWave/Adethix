/* eslint-disable react-refresh/only-export-components */
import { useLoaderData, useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosInstance.js";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";

import AuthorizeAdsReview from "../../components/Admin/AuthorizeAds/AuthorizeAdsReview.jsx"

function AdminAuthorizeAdsReview() {
  const navigate = useNavigate();
  const [isLoggedIN, setIsLoggedIn] = useState(true);

  const response = useLoaderData();
  const [data, setData] = useState();

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
        // console.log(response.data);
        setData(response.data);
      }
    }
  }, [response]);
  // console.log(data);

  return (
    <>
      {/* handle no pending review */}
      {data  && <AuthorizeAdsReview data={data}/>}
    </>
  );
}

export async function loader({ params }) {
  try {
    const { reviewId } = params;
    // console.log(reviewId);
    const response = await axiosInstance.get(
      `/api/admin/applying-reviews/${reviewId}`
    );
    // console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    return err?.response || err;
  }
}

export default AdminAuthorizeAdsReview;
