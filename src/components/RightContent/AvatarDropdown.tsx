import services from '@/services';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { ModalForm, ProFormText, setAlpha } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { history, useModel } from '@umijs/max';
import { Avatar, message, Modal } from 'antd';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, { useCallback, useState } from 'react';
import HeaderDropdown from '../HeaderDropdown';


 /**********************
   ** 用户昵称
   **********************/
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

/**********************
   ** 用户头像
   **********************/
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


/**********************
   ** 下拉组件
   **********************/
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

  // -- state
  const [openForm, setOpenForm] = useState(false);

  // -- initialState
  const { initialState, setInitialState } = useModel('@@initialState');

  // -- methods
  const jumpToLoginPages = () => {
    localStorage.removeItem('XXX_ACCOUNT_INFO');
    localStorage.removeItem('XXX_USERINFOs');
    localStorage.removeItem('XXX_TOKEN');
    history.push('/login');
  };

  const loginOut = async () => {
    Modal.confirm({
      title: '温馨提示',
      content: '您确定要退出登录么？',
      cancelText: '点错了',
      onOk: async () => {
        message.loading('正在登出...', 20 * 1000);
        const resp = await services.systems.logout();
        if (resp && resp.code === 200) {
          setInitialState((s) => ({ ...s, currentUser: undefined }));
          jumpToLoginPages()
        }
      },
    });
  };
  const changePsw = () => {
    setOpenForm(true);
  };

  // -- events
  const onMenuClick = useCallback(({ key }: MenuInfo) => {
    switch (key) {
      case 'LOGOUT':
        loginOut();
        break;
        case 'CHANGE_PSW':
        changePsw();
        break;
    }
  }, []);

  const menuItems = [
    { key: 'CHANGE_PSW', icon: <UserOutlined />, label: '修改密码' },
    { type: 'divider' as const },
    { key: 'LOGOUT', icon: <LogoutOutlined />, label: '退出登录' },
  ];

  return (
    <>
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
    <ModalForm
        title={'修改密码'}
        layout={'horizontal'}
        open={openForm}
        width={400}
        modalProps={{
          destroyOnClose: true,
          onCancel: () => setOpenForm(false),
        }}
        onFinish={async (value) => {
          const { oldPassword, newPassword, confirmPassword } = value;
          if (newPassword !== confirmPassword) {
            return message.error('新密码和确认密码不一致');
          }
          message.loading('处理中...');
          const resp = await services.systems.changePsw({
            oldPassword,
            newPassword,
          });
          if (resp && resp.code === 200) {
            setOpenForm(false);
            Modal.info({
              title: '温馨提示',
              content: '密码已修改，需重新登录',
              okText: '立即登录',
              mask: true,
              maskClosable: false,
              onOk: () => {
                jumpToLoginPages();
              },
            });
          }
        }}
      >
        <ProFormText.Password
          label="原始密码"
          name="oldPassword"
          placeholder={'请输入原始密码'}
          fieldProps={{ size: 'large' }}
          rules={[{ required: true }]}
          allowClear
        />
        <ProFormText.Password
          label="新的密码"
          name="newPassword"
          placeholder={'请输入新的密码'}
          fieldProps={{ size: 'large' }}
          rules={[{ required: true }]}
          allowClear
        />
        <ProFormText.Password
          label="确认密码"
          name="confirmPassword"
          placeholder={'请输入确认密码'}
          fieldProps={{ size: 'large' }}
          rules={[{ required: true }]}
          allowClear
        />
      </ModalForm>
    </>
  );
};

export default AvatarDropdown;
