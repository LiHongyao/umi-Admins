/*
 * @Author: Lee
 * @Date: 2023-02-20 11:39:12
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-21 00:23:08
 * @Description:
 */
import { ProLayoutProps } from '@ant-design/pro-components';

/**
 * @name
 */
const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  colorPrimary: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'Ant Design Pro',
  pwa: true,
  logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  iconfontUrl: '//at.alicdn.com/t/font_2466552_k75gtqmv4c7.js',
  token: {
    // 参见ts声明，demo 见文档，通过token 修改样式
    //https://procomponents.ant.design/components/layout#%E9%80%9A%E8%BF%87-token-%E4%BF%AE%E6%94%B9%E6%A0%B7%E5%BC%8F
    bgLayout: '#F5F5F5',
    header: {
      colorBgHeader: '#001529',
      colorHeaderTitle: '#FFFFFF',
      colorTextMenu: 'orange',
    },
    sider: {
      colorMenuBackground: '#FFFFFF',
      colorTextMenuSelected: "#4080FF",
      colorTextMenuItemHover: '#4080FF',
    }
  },
};

export default Settings;
