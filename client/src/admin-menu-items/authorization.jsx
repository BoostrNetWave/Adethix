// assets
import { MdLockOutline } from "react-icons/md";
import { FaUserLock } from "react-icons/fa";

// icons
const icons = {
  MdLockOutline,
  FaUserLock,
};

const pages = {
  id: "authorization",
  title: "Authorization",
  type: "group",
  children: [
    {
      id: "authorize-ads",
      title: "Ads",
      type: "item",
      url: "/admin/authorize-ads",
      icon: icons.MdLockOutline,
    },
    {
      id: "authorize-publishers",
      title: "Publishers",
      type: "item",
      url: "/admin/authorize-publishers",
      icon: icons.FaUserLock,
    },
    {
      id: "authorize-advertisers",
      title: "Advertisers",
      type: "item",
      url: "/admin/authorize-advertisers",
      icon: icons.FaUserLock,
    },
  ],
};

export default pages;
