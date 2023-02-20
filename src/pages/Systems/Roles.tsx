import AccessTree from '@/components/@lgs/AccessTree';
import services from '@/services';
import {
  ActionType,
  ModalForm,
  PageContainer,
  ProColumns,
  ProFormInstance,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import { Button, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

const Roles: React.FC = () => {
  // - refs
  const vTable = useRef<ActionType>();
  const vForm = useRef<ProFormInstance>();

  // -- state
  const [openForm, setOpenForm] = useState(false);
  const [auths, setAuths] = useState<API.SystemsAccessProps[]>([]);
  const [tips, setTips] = useState('');

  // - methods
  const recursive = (arr: API.SystemsAccessProps[]): any => {
    return arr.map((item) => ({
      title: item.name,
      key: item.id,
      children: item.children ? recursive(item.children) : undefined,
    }));
  };
  // - effects
  useEffect(() => {
    services.systems.access().then((resp) => {
      if (resp && resp.code === 200) {
        setAuths(resp.data);
      }
    });
  }, []);

  // -- columns
  const columns: ProColumns<API.SystemRoleProps>[] = [
    {
      title: '角色名称',
      dataIndex: 'name',

      valueEnum: {
        1: { text: '管理员' },
        2: { text: '市场部' },
        3: { text: '运营部' },
        4: { text: '品牌部' },
      },
      hideInSearch: true,
    },
    { title: '创建人', dataIndex: 'createBy', hideInSearch: true },
    { title: '创建时间', dataIndex: 'createTime', hideInSearch: true },
    { title: '更新人', dataIndex: 'updateBy', hideInSearch: true },
    { title: '更新时间', dataIndex: 'updateTime', hideInSearch: true },
    {
      title: '操作',
      key: 'action',
      hideInSearch: true,
      render: (_, record) => (
        <Button
          type="link"
          size="small"
          onClick={() => {
            vForm.current?.setFieldsValue({
              roleId: record.id,
              name: record.name,
              authIds: record.auths,
            });
            setOpenForm(true);
          }}
        >
          编辑
        </Button>
      ),
    },
  ];
  return (
    <PageContainer pageHeaderRender={false}>
      <ProTable<API.SystemRoleProps>
        actionRef={vTable}
        headerTitle={'角色管理'}
        columns={columns}
        rowKey="id"
        search={false}
        options={false}
        toolBarRender={() => [
          <Button
            type={'primary'}
            shape={'round'}
            onClick={() => {
              vForm.current?.resetFields();
              setOpenForm(true);
            }}
          >
            新建角色
          </Button>,
        ]}
        pagination={{
          hideOnSinglePage: true,
          showTotal: (total) => `共 ${total} 条`,
        }}
        postData={(data) => {
          tips && message.success(tips);
          setTips('');
          return data;
        }}
        request={async () => {
          const resp = await services.systems.roles();
          return Promise.resolve({
            data: resp.data,
            success: true,
            totla: resp.data.length,
          });
        }}
      />
      {/* modals */}
      <ModalForm
        formRef={vForm}
        title={!!vForm.current?.getFieldValue('roleId') ? '编辑角色信息' : '新建角色'}
        open={openForm}
        width={500}
        layout="horizontal"
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
        <ProFormText name="roleId" noStyle hidden />
        <ProFormText
          label="角色名称"
          name="name"
          placeholder={'请输入角色名称'}
          rules={[{ required: true }]}
        />
        <ProFormText
          label="角色权限"
          name="authIds"
          rules={[{ required: true, message: '请分配角色权限' }]}
        >
          <AccessTree treeData={recursive(auths)} />
        </ProFormText>
      </ModalForm>
    </PageContainer>
  );
};

export default Roles;
