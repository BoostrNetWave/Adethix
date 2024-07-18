// assets
import { DashboardOutlined, BarChartOutlined, SettingOutlined, CopyOutlined, DollarOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined, 
  BarChartOutlined, 
  SettingOutlined, 
  CopyOutlined,
  DollarOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //
// <SettingOutlined /> <FullscreenExitOutlined /> <FullscreenOutlined /> <CopyOutlined /> <DollarOutlined />
const dashboard = {
  id: 'group-dashboard',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/publisher/dashboard',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'report',
      title: 'Report',
      type: 'item',
      url: '/publisher/reports',
      icon: icons.BarChartOutlined
    },
    {
      id: 'emdeb-code',
      title: 'Client Embed Code',
      type: 'item',
      url: '/publisher/embed',
      icon: icons.CopyOutlined
    },
    {
      id: 'payouts',
      title: 'Payouts',
      type: 'item',
      url: '/publisher/payouts',
      icon: icons.DollarOutlined
    },
    {
      id: 'setting',
      title: 'Settings',
      type: 'item',
      url: '/publisher/settings',
      icon: icons.SettingOutlined
    },
  ]
};

export default dashboard;
