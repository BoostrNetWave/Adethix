// assets
import {
  DashboardOutlined,
  BarChartOutlined,
  ScheduleOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { MdLockOutline } from "react-icons/md";

// icons
const icons = {
  DashboardOutlined,
  BarChartOutlined,
  ScheduleOutlined,
  MdLockOutline,
  SettingOutlined,
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //
// <SettingOutlined />  <CopyOutlined /> <DollarOutlined />
// <CreditCardOutlined />  <DollarOutlined /> <FundProjectionScreenOutlined />  <ScheduleOutlined /> manage advertising
const dashboard = {
  id: "dashboard",
  type: "group",
  children: [
    {
      id: "dashboard",
      title: "Dashboard",
      type: "item",
      url: "/admin/dashboard",
      icon: icons.DashboardOutlined,
      breadcrumbs: false,
    },
    {
      id: "report",
      title: "Report",
      type: "item",
      url: "/admin/reports",
      icon: icons.BarChartOutlined,
    },
    {
      id: "setting",
      title: "Settings",
      type: "item",
      url: "/admin/settings",
      icon: icons.SettingOutlined,
    },
  ],
};

export default dashboard;
