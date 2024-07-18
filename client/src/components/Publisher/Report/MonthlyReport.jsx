/* eslint-disable react/prop-types */
import styles from "./MonthlyReport.module.css";

function MonthlyReport({ data }) {
  // console.log(data);
  return (
    <>
      <div>
        <h5 className={styles.title}>Day-wise Revenue Report</h5>
      </div>
      <div className={styles.monthlyReport}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Total Views</th>
              <th>Total Clicks</th>
              <th>Total Publisher Revenue</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((item, index) => (
              <tr key={index}>
                <td>{item.date}</td>
                <td>{item.totalViews}</td>
                <td>{item.totalClicks}</td>
                <td>{item.totalPublisherRevenue.toFixed(4)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* {data.data.map((info, idx) => {
        return(
          <div key={idx}>
          <p className={styles.date}>Date: {info.date}</p>
          <p>Views: {info.totalViews}</p>
          <p>Clicks: {info.totalClicks}</p>
          {info.totalPublisherRevenue && <p>Revenue: {info.totalPublisherRevenue.toFixed(3)}</p>}
          </div>
        )
      })} */}
      </div>
    </>
  );
}

export default MonthlyReport;
