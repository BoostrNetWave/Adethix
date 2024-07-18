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

function DashboardBarChartViews({ viewsData }) {
  // console.log(viewsData);
  let chartdata;
  // console.log(chartdata)
  if(viewsData && viewsData?.views && viewsData.views?.length > 0){
    // console.log(viewsData);
    // console.log(chartdata)
    chartdata = 
    {
      labels: viewsData.date,
      datasets: [
        {
          label: "Views",
          data: viewsData.views,
          backgroundColor: "aqua",
          borderColor: "black",
          borderWidth: 1,
        },
      ],
    };
    // console.log(chartdata)
  }

  const chartoptions = {};

  return (
    <>
    {chartdata && <Bar
      data={chartdata}
      options={chartoptions}
    ></Bar>}
    </> // handle no chart
  );
}

export default DashboardBarChartViews;
