import services from '@/services';
import { LogoutOutlined } from '@ant-design/icons';
import { setAlpha } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { history, useModel } from '@umijs/max';
import { Avatar, message, Modal } from 'antd';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, { useCallback } from 'react';
import HeaderDropdown from '../HeaderDropdown';

const Name = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const nameClassName = useEmotionCss(({ token }) => ({
    width: '70px',
    height: '48px',
    overflow: 'hidden',
    lineHeight: '48px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    [`@media only screen and (max-width: ${token.screenMD}px)`]: {
      display: 'none',
    },
  }));
  return <span className={`${nameClassName} anticon`}>{currentUser?.user.nickname}</span>;
};

const AvatarLogo = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const avatarClassName = useEmotionCss(({ token }) => ({
    marginRight: '8px',
    color: token.colorPrimary,
    verticalAlign: 'top',
    background: setAlpha(token.colorBgContainer, 0.85),
    [`@media only screen and (max-width: ${token.screenMD}px)`]: {
      margin: 0,
    },
  }));

  return (
    <Avatar size="small" className={avatarClassName} src={currentUser?.user.avatar} alt="avatar" />
  );
};

const AvatarDropdown: React.FC = () => {
  // -- styles
  const actionClassName = useEmotionCss(({ token }) => ({
    display: 'flex',
    height: '48px',
    marginLeft: 'auto',
    overflow: 'hidden',
    alignItems: 'center',
    padding: '0 8px',
    cursor: 'pointer',
    borderRadius: token.borderRadius,
    '&:hover': {
      backgroundColor: token.colorBgTextHover,
    },
  }));
  // -- initialState
  const { initialState, setInitialState } = useModel('@@initialState');

  // -- methods
  const loginOut = async () => {
    Modal.confirm({
      title: '温馨提示',
      content: '您确定要退出登录么？',
      cancelText: '点错了',
      onOk: async () => {
        message.loading('正在登出...', 20 * 1000);
        const resp = await services.user.logout();
        if (resp && resp.code === 200) {
          localStorage.removeItem('XXX_ACCOUNT_INFO');
          localStorage.removeItem('XXX_USERINFOs');
          localStorage.removeItem('XXX_TOKEN');
          history.push('/login');
        }
      },
    });
  };

  // -- events
  const onMenuClick = useCallback(({ key }: MenuInfo) => {
    switch (key) {
      case 'logout':
        setInitialState((s) => ({ ...s, currentUser: undefined }));
        loginOut();
        break;
    }
  }, []);

  const menuItems = [
    // { key: 'center', icon: <UserOutlined />, label: '个人中心' },
    // { key: 'settings', icon: <SettingOutlined />, label: '个人设置' },
    // { type: 'divider' as const },
    { key: 'logout', icon: <LogoutOutlined />, label: '退出登录' },
  ];

  return (
    <HeaderDropdown
      menu={{
        selectedKeys: [],
        onClick: onMenuClick,
        items: menuItems,
      }}
    >
      <span className={actionClassName}>
        <AvatarLogo />
        <Name />
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
