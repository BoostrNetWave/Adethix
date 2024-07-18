// assets
import { ScheduleOutlined } from '@ant-design/icons';

// icons
const icons = {
    ScheduleOutlined,
};

const pages = {
  id: "manage",
  title: "Manage",
  type: "group",
  children: [
    {
      id: "manage-ads",
      title: "Running Ads",
      type: "item",
      url: "/admin/manage-ads",
      icon: icons.ScheduleOutlined,
    },
  ],
};

export default pages;
