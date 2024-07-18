// assets
import { DashboardOutlined, BarChartOutlined, ScheduleOutlined, SettingOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  BarChartOutlined,
  ScheduleOutlined,
  SettingOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //
// <SettingOutlined />  <CopyOutlined /> <DollarOutlined /> 
// <CreditCardOutlined />  <DollarOutlined /> <FundProjectionScreenOutlined />  <ScheduleOutlined /> manage advertising
const dashboard = {
  id: 'group-dashboard',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/advertiser/dashboard',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'report',
      title: 'Report',
      type: 'item',
      url: '/advertiser/reports',
      icon: icons.BarChartOutlined
    },
    {
      id: 'manage-campaign',
      title: 'Manage Campaigns',
      type: 'item',
      url: '/advertiser/campaings',
      icon: icons.ScheduleOutlined
    },
    {
      id: 'setting',
      title: 'Settings',
      type: 'item',
      url: '/advertiser/settings',
      icon: icons.SettingOutlined
    },
  ]
};

export default dashboard;
