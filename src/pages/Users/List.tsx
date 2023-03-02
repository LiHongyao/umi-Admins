/*
 * @Author: Lee
 * @Date: 2023-03-02 15:44:51
 * @LastEditors: Lee
 * @LastEditTime: 2023-03-02 16:08:10
 * @Description: 
 */
import services from '@/services';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { Avatar, Button, message, Space } from 'antd';
import React, { useRef, useState } from 'react';

const Users: React.FC = () => {
  // - refs
  const vTable = useRef<ActionType>();
  // -- state
  const [tips, setTips] = useState('');

  // -- columns
  const columns: ProColumns<API.UserProps>[] = [
    { title: '序号', dataIndex: 'index', valueType: 'indexBorder', width: 48 },
    {
      title: '用户头像',
      dataIndex: 'avatarUrl',
      hideInSearch: true,
      width: 80,
      render: (_, { avatarUrl }) => <Avatar src={avatarUrl} size={50} />,
    },
    { title: '用户ID', dataIndex: 'id', hideInSearch: true, ellipsis: true, copyable: true},
    { title: '用户昵称', dataIndex: 'nickname', hideInSearch: true,  },
    { title: '联系电话', dataIndex: 'phone' },
    { title: '注册时间', dataIndex: 'createDate', hideInSearch: true },
    { title: "操作", dataIndex: "action", render: () => <Space>
      <Button>启用</Button>
      <Button danger>禁用</Button>
    </Space>}
  ];

  // -- rnders
  return (
    <PageContainer pageHeaderRender={false}>
      <ProTable<API.UserProps>
        actionRef={vTable}
        headerTitle={'用户列表'}
        columns={columns}
        rowKey="id"
        options={false}
        pagination={{
          hideOnSinglePage: true,
          showTotal: (total) => `共 ${total} 条`,
        }}
        postData={(data) => {
          tips && message.success(tips);
          setTips('');
          return data;
        }}
        request={async (params) => {
          const resp = await services.user.list({ ...params });
          return Promise.resolve({
            data: resp.data || [],
            success: true,
          });
        }}
      />
    </PageContainer>
  );
};

export default Users;
