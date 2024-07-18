/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../axiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

import useDocumentTitle from "../../../useDocumentTitle";

// material-ui
import { Button, Typography, Grid, Box } from "@mui/material";

// react-icon
import { FaDownload, FaSearch } from "react-icons/fa";

// project import
import MainCard from "../../../components/MainCard";
// import MonthlyReport from "./MonthlyReport";
import styles from "./Report.module.css";
import ReportTable from "./ReportTable";

function Report({ data }) {
  useDocumentTitle("Report - Filter Day Wise");
  let [updatedData, setUpdatedData] = useState(data);

  let [startDate, setStartDate] = useState("");
  let [endDate, setEndDate] = useState("");

  const navigate = useNavigate();
  const [isLoggedIN, setIsLoggedIn] = useState(true);

  useEffect(() => {
    if (!isLoggedIN) {
      navigate("/auth/login");
    }
  }, [isLoggedIN, navigate]);

  let handleStartDateChange = (e) => {
    // console.log(e);
    setStartDate(e.target.value);
  };
  let handleEndDateChange = (e) => {
    // console.log(e);
    setEndDate(e.target.value);
  };
  // console.log(startDate, endDate)

  useEffect(() => {
    if (data) {
      setUpdatedData(data);
    }
  }, [data]);

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
          "/api/admin/report/range",
          { params }
        );
        // console.log(response);
        if (response.status === 200) {  
          let newData = response.data;
          // console.log(newData);
          setUpdatedData(newData);
        } else {
          console.error(response);
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

  // Function to convert JSON data to CSV
  const convertToCSV = (jsonData) => {
    const array = [Object.keys(jsonData[0])].concat(jsonData);
    // console.log(array[0])
    // adding ctr to the head
    if (!array[0].includes("CTR")) {
      array[0].push("CTR");
    }
    // calcualting ctr
    array.slice(1).forEach((row) => {
      row.CTR = calculateCTR(row.totalViews, row.totalClicks);
    });
    // console.log(array);
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
    // convertToCSV(updatedData.data);
    // console.log(convertToCSV(updatedData.data));
    const csvData = convertToCSV(updatedData.data);
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
        <Typography variant="h6" mb={2} className={styles.reportTitle}>
          Report - Filter Day Wise
        </Typography>
        {/* <h5 className={styles.reportTitle}>Report</h5> */}
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
          {/* <button className={styles.submitButton} onClick={handleButtonClick}>
            Get Details
          </button> */}
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
      {updatedData && updatedData?.data && updatedData.data?.length > 0 ? (
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
            <ReportTable data={updatedData} />
          </MainCard>
        </Grid>
      ) : (
        <Box sx={{ textAlign: "center" }} mt={4}>
          <h1>No data</h1> {/* Handle undefinded data */}
        </Box>
      )}
    </>
  );
}

export default Report;
