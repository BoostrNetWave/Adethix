/* eslint-disable react-refresh/only-export-components */
import { useLoaderData, useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosInstance.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

function AdminManageAds() {
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
        setData(response.data);
        // console.log(data);
      }
    }
  }, [response]);
  // console.log(data);

  return (
    <>
      <div>AdminManageAds</div>
      <div>{data?.message}</div>
    </>
  );
}

export async function loader() {
  try {
    const response = await axiosInstance.get("/api/admin/manage-ads");
    // console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    return err?.response || err;
  }
}

export default AdminManageAds;