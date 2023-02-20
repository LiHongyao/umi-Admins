/*
 * @Author: Lee
 * @Date: 2023-02-20 17:26:37
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-21 00:35:12
 * @Description:
 */

import AliyunOSSUpload from '@/components/@lgs/AliyunOSSUpload';
import services from '@/services';
import { PlusOutlined } from '@ant-design/icons';
import {
  ActionType,
  ModalForm,
  PageContainer,
  ProColumns,
  ProForm,
  ProFormInstance,
  ProFormSelect,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import { Avatar, Button, message, Modal } from 'antd';
import React, { useRef, useState } from 'react';

const Users: React.FC = () => {
  // - refs
  const vTable = useRef<ActionType>();
  const vForm = useRef<ProFormInstance>();

  // -- state
  const [tips, setTips] = useState('');
  const [openForm, setOpenForm] = useState(false);

  // -- columns
  const columns: ProColumns<API.SystemsUserProps>[] = [
    {
      title: '头像',
      dataIndex: 'avatar',
      hideInSearch: true,
      render: (_, record) => <Avatar src={record.avatar} style={{ width: 50, height: 50 }} />,
    },
    { title: '登录账号', dataIndex: 'username', hideInSearch: true },
    { title: '姓名', dataIndex: 'nickname', hideInSearch: true },
    {
      title: '状态',
      tooltip: '该用户是否被拉入黑名单',
      dataIndex: 'state',
      valueType: 'select',
      fieldProps: { placeholder: '全部', allowClear: true },
      valueEnum: {
        0: { text: '禁用', status: 'Default' },
        1: { text: '启用', status: 'Processing' },
      },
    },
    {
      title: '系统角色',
      dataIndex: 'roleId',
      hideInSearch: true,
      valueType: 'select',
      fieldProps: {
        fieldNames: {
          label: 'roleName',
          value: 'roleId',
        },
      },
      request: async () => {
        return [
          { roleId: 1, roleName: '管理员' },
          { roleId: 2, roleName: '市场部' },
          { roleId: 3, roleName: '运营部' },
          { roleId: 4, roleName: '品牌部' },
        ];
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'date',
      hideInSearch: true,
    },
    { title: '最后登录时间', dataIndex: 'lastLoginTime', hideInSearch: true },
    {
      title: '操作',
      key: 'action',
      hideInSearch: true,
      render: (_, record) => [
        record.state === 1 && (
          <Button
            key={'close'}
            type="link"
            size="middle"
            disabled={!record.state}
            danger
            onClick={() => {
              Modal.confirm({
                content: '您确定要禁用该用户么？',
                okText: '确定',
                cancelText: '点错了',
                onOk: () => {
                  message.loading('处理中...', 20 * 1000);
                  setTimeout(() => {
                    setTips('已禁用');
                    vTable.current?.reload();
                  }, 1000);
                },
              });
            }}
          >
            禁用
          </Button>
        ),
        record.state === 0 && (
          <Button
            key={'open'}
            type="link"
            size="middle"
            disabled={!!record.state}
            onClick={() => {
              Modal.confirm({
                content: '您确定要启用该用户么？',
                okText: '确定',
                cancelText: '点错了',
                onOk: () => {
                  message.loading('处理中...', 20 * 1000);
                  setTimeout(() => {
                    setTips('已启用');
                    vTable.current?.reload();
                  }, 1000);
                },
              });
            }}
          >
            启用
          </Button>
        ),
        <Button
          key={'edit'}
          type="link"
          size="middle"
          onClick={() => {
            vForm.current?.setFieldsValue({
              ...record,
              avatar: [{ url: record.avatar }],
            });
            setOpenForm(true);
          }}
        >
          编辑
        </Button>,
      ],
    },
  ];

  // -- rnders
  return (
    <PageContainer pageHeaderRender={false}>
      <ProTable<API.SystemsUserProps>
        actionRef={vTable}
        headerTitle={'用户管理'}
        columns={columns}
        rowKey="id"
        search={false}
        options={false}
        pagination={false}
        toolBarRender={() => [
          <Button
            type={'primary'}
            shape={'round'}
            onClick={() => {
              vForm.current?.resetFields();
              setOpenForm(true);
            }}
          >
            <PlusOutlined />
            新建用户
          </Button>,
        ]}
        postData={(data) => {
          tips && message.success(tips);
          setTips('');
          return data;
        }}
        request={async () => {
          const resp = await services.systems.users();
          return Promise.resolve({
            data: resp.data || [],
            success: true,
          });
        }}
      />
      {/* modals */}
      <ModalForm
        formRef={vForm}
        title={!!vForm.current?.getFieldValue('id') ? '编辑用户信息' : '新建系统用户'}
        open={openForm}
        width={400}
        modalProps={{
          forceRender: true,
          onCancel: () => setOpenForm(false),
        }}
        onFinish={async (value) => {
          console.log(value);
          message.loading('处理中，请稍后...');
          setTimeout(() => {
            message.destroy();
            setOpenForm(false);
            vTable.current?.reload();
          }, 1000);
        }}
      >
        <ProFormText name="id" noStyle hidden />
        <ProForm.Item
          label="头像"
          name="avatar"
          rules={[{ required: true, message: '请上传轮播图' }]}
          extra={'Tips：上传尺寸 → 100x100'}
        >
          <AliyunOSSUpload dir="avatar" />
        </ProForm.Item>
        <ProFormText
          label="账号"
          name="username"
          fieldProps={{ size: 'large' }}
          placeholder={'请输入登录账号'}
          rules={[{ required: true }]}
        />
        <ProFormText.Password
          label="密码"
          name="password"
          fieldProps={{ size: 'large' }}
          placeholder={'请输入登录密码'}
          rules={[{ required: true }]}
        />
        <ProFormText
          label="姓名"
          name="nickname"
          fieldProps={{ size: 'large' }}
          placeholder={'请输入姓名'}
          rules={[{ required: true }]}
        />
        <ProFormSelect
          name="roleId"
          label="角色"
          fieldProps={{
            size: 'large',
            fieldNames: {
              label: 'roleName',
              value: 'roleId',
            },
          }}
          request={async () => [
            { roleId: 1, roleName: '管理员' },
            { roleId: 2, roleName: '市场部' },
            { roleId: 3, roleName: '运营部' },
            { roleId: 4, roleName: '品牌部' },
          ]}
          placeholder="请选择"
          rules={[{ required: true, message: '请选择用户角色' }]}
        />
      </ModalForm>
    </PageContainer>
  );
};

export default Users;
