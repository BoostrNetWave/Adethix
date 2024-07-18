// import { Link, NavLink } from "react-router-dom";
import styles from "./index.module.css";
import { GrOverview } from "react-icons/gr";
import { FaCode } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { IoAnalyticsSharp } from "react-icons/io5";
import { NavLink } from "react-router-dom";

function index({ children }) {
  const menuItem = [
    {
      path: "overview",
      name: "Overview",
      icon: <GrOverview />,
    },
    {
      path: "reports",
      name: "Report",
      icon: <IoAnalyticsSharp />,
    },
    {
      path: "payouts",
      name: "Payouts",
      icon: <FaDollarSign />,
    },
    {
      path: "emdeb",
      name: "Client Emdeb Code",
      icon: <FaCode />,
    },
    {
      path: "settings",
      name: "Settings",
      icon: <IoMdSettings />,
    },
  ];
  return (
    <div className={styles.container}>
      <div  className={styles.sidebar}>
      {/* <div style={{ width: isOpen ? "200px" : "50px" }} className={styles.sidebar}> */}
        <div className={styles.topSection}>
          {/* <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            Logo
          </h1> */}
          <div style={{ marginLeft: "150px"}} className="bars">
          {/* <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars"> */}
            {/* <FaBars /> */}
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className={styles.link}
            activeclassname="active"
          >
            <div className={styles.icon}>{item.icon}</div>
            <div
              style={{ display: "block"}}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      <main className={styles.main}>{children}</main>
    </div>
  );
}

export default index;
