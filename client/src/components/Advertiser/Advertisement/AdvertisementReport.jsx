/* eslint-disable react/prop-types */
import { json, useNavigate } from "react-router-dom";
import axiosInstance from "../../../axiosInstance";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

import useDocumentTitle from "../../../useDocumentTitle";

// material - ui
import { Typography, Button, Grid, Box } from "@mui/material";

// react-icon
import { FaDownload, FaSearch } from "react-icons/fa";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

// project import
import MainCard from "../../MainCard";
import styles from "./AdvertisementReport.module.css";
import AdvertisementReportTable from "./AdvertisementReportTable.jsx";
import { Link as RouterLink, useParams } from "react-router-dom";
// import Analytic from "./Analytic";

function AdvertisementReport({ ad, totalReportInfo, reportInfo }) {
  // console.log({ad, totalReportInfo, reportInfo})
  const { campaignId, adId } = useParams();

  useDocumentTitle(
    ad?.name
      ? `Advertisement Report: ${ad.name}`
      : "Advertisement Report: Advertisement Platform"
  );
  let [updatedReportInfo, setUpdatedReportInfo] = useState(reportInfo);
  // console.log(updatedData);
  let [updatedTotalReportInfo, setUpdatedTotalReportInfo] =
    useState(totalReportInfo);
  // console.log(updatedTotalReportInfo);
  let [startDate, setStartDate] = useState("");
  let [endDate, setEndDate] = useState("");

  const navigate = useNavigate();
  const [isLoggedIN, setIsLoggedIn] = useState(true);

  let handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  let handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  useEffect(() => {
    if (reportInfo) {
      setUpdatedReportInfo(reportInfo);
    }
  }, [reportInfo]);

  useEffect(() => {
    if (totalReportInfo) {
      setUpdatedTotalReportInfo(totalReportInfo);
    }
  }, [totalReportInfo]);

  useEffect(() => {
    if (!isLoggedIN) {
      navigate("/auth/login");
    }
  }, [isLoggedIN, navigate]);

  let handleButtonClick = async () => {
    if (endDate !== "" && startDate !== "") {
      const params = {
        startDate: startDate,
        endDate: endDate,
      };
      setEndDate("");
      setStartDate("");
      try {
        const response = await axiosInstance.get(
          `/api/advertiser/campaign/${campaignId}/${adId}/report/range`,
          { params }
        );
        if (response.status === 200) {
          let newData = response.data;
          // console.log(newData);
          setUpdatedReportInfo(newData?.reportInfo);
          setUpdatedTotalReportInfo(newData?.totalReportInfo);
        }
      } catch (err) {
        console.log(err);
        if (err?.response?.status) {
          if (err.response.status === 401 || err.response.status === 403) {
            // console.log(response.data.message);
            toast.error(err.response.data.message);
            toast.error("Login again");
            localStorage.removeItem("token");
            setIsLoggedIn(false);
          } else if (err.response.status === 500) {
            toast.error(err.response.data.message);
          }
        }
      }
    } else {
      alert("Select date");
    }
  };

  // calculationg ctr for download od csv file
  function calculateCTR(views, clicks) {
    if (views === 0) {
      return `${0}`;
    } else {
      return `${((clicks / views) * 100).toFixed(3)}`;
    }
  }

  function cpm(totalViews, totalViewsCost) {
    if (totalViews === 0) {
      return `${0}`;
    } else {
      //toFixed(3)
      return `${((totalViewsCost / totalViews) * 1000).toFixed(3)}`;
    }
  }

  // Function to convert JSON data to CSV
  const convertToCSV = (jsonData) => {
    const array = [["Date", "Views", "Clicks", "Spend", "CTR", "CPM"]].concat(
      jsonData
    );

    // calcualting ctr
    array.slice(1).forEach((row) => {
      row.CTR = calculateCTR(row.totalViews, row.totalClicks);
    });

    // calcualting cpm
    array.slice(1).forEach((row) => {
      row.CPM = cpm(row.totalViews, row.totalViewsCost);
    });
    // console.log(array);

    array.forEach((row) => {
      delete row.totalViewsCost;
    });

    return array
      .map((row) => {
        return Object.values(row)
          .map((value) => {
            return typeof value === "string" ? `"${value}"` : value;
          })
          .join(",");
      })
      .join("\r\n");
  };

  // Function to download CSV file
  const downloadCSV = () => {
    const csvData = convertToCSV(updatedReportInfo);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    const now = new Date();
    const time = now.getTime();
    link.setAttribute("download", `report-${time}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div>
        {/* className={styles.reportTitle} */}
        <Typography variant="h6" mb={2}>
          Advertisement Report: {ad?.name}
        </Typography>

        <RouterLink relative="path" to="..">
          <Button
            variant="outlined"
            sx={{ textTransform: "none", mb: 3 }}
            startIcon={<ArrowBackIosIcon />}
          >
            Go to advertisement
          </Button>
        </RouterLink>
      </div>

      <div className={styles.datePickerContainer}>
        <div className={styles.dataPicker}>
          <div>
            <label htmlFor="startdate">Start Date</label>
            <input
              id="startdate"
              type="date"
              className={styles.date}
              value={startDate}
              onChange={handleStartDateChange}
            />
          </div>
          <div>
            <label htmlFor="enddate">End Date</label>
            <input
              id="enddate"
              type="date"
              className={styles.date}
              value={endDate}
              onChange={handleEndDateChange}
            />
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <Button
            variant="outlined"
            sx={{ textTransform: "none" }}
            startIcon={<FaSearch />}
            className={styles.submitButton}
            onClick={handleButtonClick}
          >
            Get Details
          </Button>
        </div>
      </div>

      {/* Show in table */}
      {updatedReportInfo && updatedReportInfo?.length > 0 ? (
        <>
          <Grid item xs={12} md={7} mt={2} lg={8}>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Typography variant="h6">Day-wise Report</Typography>
                <Button
                  variant="outlined"
                  sx={{ textTransform: "none" }}
                  startIcon={<FaDownload />}
                  onClick={downloadCSV}
                >
                  Download Report
                </Button>
              </Box>
            </Grid>
            <MainCard sx={{ mt: 2 }} content={false}>
              <AdvertisementReportTable
                data={updatedReportInfo}
                updatedTotalReportInfo={updatedTotalReportInfo}
              />
            </MainCard>
          </Grid>
        </>
      ) : (
        <Box sx={{ textAlign: "center" }} mt={4}>
          <h1>No data</h1> {/* Handle undefinded data */}
        </Box>
      )}
    </>
  );
}

export default AdvertisementReport;
