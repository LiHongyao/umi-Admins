/*
 * @Author: Lee
 * @Date: 2022-05-22 17:06:56
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-21 00:25:57
 * @Description:
 */
import services from '@/services';
import { DeleteOutlined, FormOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { ModalForm, PageContainer, ProFormInstance, ProFormText } from '@ant-design/pro-components';
import { message, Modal, Space, Tree } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

const Access: React.FC = () => {
  // - refs
  const vForm = useRef<ProFormInstance>();

  // - state
  const [treeData, setTreeData] = useState<Array<API.SystemsAccessProps>>([]);
  const [openModal, setOpenModal] = useState(false);

  // - methods
  const getData = async () => {
    const resp = await services.systems.access();
    if (resp && resp.code === 200) {
      setTreeData(resp.data);
    }
  };

  // -- effects
  useEffect(() => {
    getData();
  }, []);

  // - events
  const onDelete = (nodeData: API.SystemsAccessProps) => {
    console.log(nodeData);
    Modal.confirm({
      content: '您确定要删除该项及其下所有子类么？',
      cancelText: '点错了',
      onOk: () => {},
    });
  };

  const onInsert = (nodeData: API.SystemsAccessProps) => {
    vForm.current?.resetFields();
    setOpenModal(true);
  };

  const onEdit = (nodeData: API.SystemsAccessProps) => {
    vForm.current?.setFieldsValue({
      ...nodeData,
    });
    setOpenModal(true);
  };
  // -- renders
  return (
    <PageContainer subTitle="Tips：您可以在此页面管理权限~" header={{ breadcrumb: {} }}>
      {/* 树形解构 */}
      <Tree
        style={{ padding: 16 }}
        showLine={{ showLeafIcon: false }}
        fieldNames={{ key: 'id' }}
        selectable={false}
        // @ts-ignore
        treeData={treeData}
        // @ts-ignore
        titleRender={(nodeData: API.SystemsAccessProps) => (
          <Space>
            <span>
              {nodeData.name} - {nodeData.code}
            </span>
            <FormOutlined style={{ color: '#4169E1' }} onClick={() => onEdit(nodeData)} />
            <PlusCircleOutlined style={{ color: '#4169E1' }} onClick={() => onInsert(nodeData)} />
            <DeleteOutlined style={{ color: '#DC143C' }} onClick={() => onDelete(nodeData)} />
          </Space>
        )}
      />
      <ModalForm
        formRef={vForm}
        title={!!vForm.current?.getFieldValue('id') ? '编辑权限' : '新建权限'}
        open={openModal}
        width={400}
        modalProps={{
          forceRender: true,
          onCancel: () => setOpenModal(false),
        }}
        onFinish={async (value) => {
          console.log(value);
          message.loading('处理中...');
          setTimeout(() => {
            message.destroy();
            setOpenModal(false);
          }, 1000);
        }}
      >
        <ProFormText name="id" noStyle hidden />
        <ProFormText
          label="权限名称"
          name="name"
          placeholder={'请输入权限名称'}
          rules={[{ required: true }]}
        />
        <ProFormText
          label="权限代码"
          name="code"
          placeholder={'请输入权限代码'}
          rules={[{ required: true }]}
        />
      </ModalForm>
    </PageContainer>
  );
};

export default Access;
