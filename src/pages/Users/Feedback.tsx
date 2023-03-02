
import services from '@/services';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { Avatar, message } from 'antd';
import React, { useRef, useState } from 'react';

const Feedback: React.FC = () => {
  // - refs
  const vTable = useRef<ActionType>();
  // -- state
  const [tips, setTips] = useState('');

  // -- columns
  const columns: ProColumns<API.FeedbackItemProps>[] = [
    { title: '序号', dataIndex: 'index', valueType: 'indexBorder', width: 48 },
    {
      title: '用户头像',
      dataIndex: 'avatarUrl',
      hideInSearch: true,
      width: 80,
      render: (_, { avatarUrl }) => <Avatar src={avatarUrl} size={50} />,
    },
    { title: '反馈时间', dataIndex: 'createDate', hideInSearch: true, width: 180 },
    { title: '用户ID', dataIndex: 'userId', hideInSearch: true, copyable: true,width: 160 , ellipsis: true},
    { title: '用户昵称', dataIndex: 'nickname', hideInSearch: true ,width: 100},
    { title: '联系电话', dataIndex: 'phone', hideInSearch: true, copyable: true,width: 160 },
    { title: '反馈内容', dataIndex: 'content', hideInSearch: true },
  ];

  // -- rnders
  return (
    <PageContainer pageHeaderRender={false}>
      <ProTable<API.FeedbackItemProps>
        actionRef={vTable}
        headerTitle={'意见反馈'}
        columns={columns}
        rowKey="id"
        search={false}
        options={false}
        pagination={false}
        postData={(data) => {
          tips && message.success(tips);
          setTips('');
          return data;
        }}
        request={async (params) => {
          const resp = await services.user.feedbacks({ ...params });
          return Promise.resolve({
            data: resp.data || [],
            success: true,
          });
        }}
      />
    </PageContainer>
  );
};

export default Feedback;
