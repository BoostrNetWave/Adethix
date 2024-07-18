/* eslint-disable react/prop-types */
//
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale, // Y
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale, // Y
  Tooltip,
  Legend
);

function DashboardBarChartClicks({ clicksData }) {
  // console.log(clicksData);
  let chartdata;
  if(clicksData && clicksData?.clicks && clicksData.clicks?.length > 0 ) {
    chartdata = 
    {
      labels: clicksData.date,
      datasets: [
        {
          label: "Clicks",
          data: clicksData.clicks,
          backgroundColor: "green",
          borderColor: "black",
          borderWidth: 1,
        }
      ],
    }
  }

  const chartoptions = {};

  return (
    <>
    {chartdata && <Bar data={chartdata} options={chartoptions} ></Bar>}
    </> // handle no chart
  );
}

export default DashboardBarChartClicks;
