import DashboardBarChartClicks from "../../components/Publisher/Dashboard/DashboardBarChartClicks.jsx";
import DashboardBarChartViews from "../../components/Publisher/Dashboard/DashboardBarChartViews.jsx";
import Dashboard from "../../components/Publisher/Dashboard/Dashboard.jsx";
import axiosInstance from "../../axiosInstance.js";
import { useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";

function Publisher() {
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

  let viewsData = {
    date: [],
    views: [],
  };

  let clicksData = {
    date: [],
    clicks: [],
  };

  let styles = {
    backgroundColor: "white",
    border: "1px solid #dee2e6",
    marginBottom: "10px",
    borderRadius: "8px",
  };

  return (
    <div>
      <Dashboard data={data} />

      {data &&
        data?.views &&
        data.views?.length > 0 &&
        data.views[0]?.days &&
        data.views[0].days?.length > 0 &&
        // data.views[0].days.map((info, idx) => {
        data.views[0].days.map((info) => {
          viewsData.date.push(info.date);
          viewsData.views.push(info.totalViews);
        })}
      {data &&
        data?.clicks &&
        data.clicks?.length > 0 &&
        data.clicks[0]?.days &&
        data.clicks[0].days?.length > 0 &&
        data.clicks[0].days.map((info) => {
          clicksData.date.push(info.date);
          clicksData.clicks.push(info.totalClicks);
        })}

      {/* chart */}
      {data && (
        <>
          <div style={styles}>
            <DashboardBarChartViews viewsData={viewsData} />
          </div>
          <div style={styles}>
            <DashboardBarChartClicks clicksData={clicksData} />
          </div>
        </>
      )}
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  try {
    const response = await axiosInstance.get("/api/publisher/dashboard");
    // console.log(response);
    return response;
  } catch (err) {
    return err.response || err;
  }
}

export default Publisher;
