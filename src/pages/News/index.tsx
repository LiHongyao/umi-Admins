import EditorWang from '@/components/@lgs/EditorWang';
import services from '@/services';
import { PlusOutlined, RightOutlined } from '@ant-design/icons';
import {
  ActionType,
  ModalForm,
  PageContainer,
  ProColumns,
  ProFormInstance,
  ProFormRadio,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import { Button, message, Modal, Space } from 'antd';
import React, { useRef, useState } from 'react';
import "./index.less";
const News: React.FC = () => {
  // - refs
  const vTable = useRef<ActionType>();
  const vForm = useRef<ProFormInstance>();

  // -- state
  const [openForm, setopenForm] = useState(false);
  const [content, setContent] = useState('');

  // -- columns
  const columns: Array<ProColumns<API.NewsItemProps>> = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 60,
    },
    { title: '新闻标题', dataIndex: 'title' },
    {
      title: '新闻类型',
      dataIndex: 'type',
      valueEnum: {
        1: { text: '案例新闻' },
        2: { text: '动态新闻' },
      },
    },
    {
      title: '新闻分类',
      dataIndex: 'category',
      valueEnum: {
        1: { text: '文明实践' },
        2: { text: '爱国卫生月' },
        3: { text: '志愿服务' },
      },
    },
    {
      title: '新闻详情',
      key: 'content',
      hideInSearch: true,
      render: (_, { content }) => (
        <a onClick={() => setContent(content)}>
          <span>查看详情</span>
          <RightOutlined />
        </a>
      ),
    },
    { title: '发布时间', dataIndex: 'date', hideInSearch: true },
    {
      title: '操作',
      key: 'action',
      hideInSearch: true,
      width: 120,
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            onClick={() => {
              vForm.current?.setFieldsValue({
                ...record,
              });
              setopenForm(true);
            }}
          >
            编辑
          </Button>
          <Button
            type="link"
            danger
            onClick={() => {
              Modal.confirm({
                title: '您确定要删除该条谏言么？',
                cancelText: '点错了',
                onOk: () => {},
              });
            }}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  // -- renders
  return (
    <PageContainer pageHeaderRender={() => null} className="news">
      <ProTable<API.NewsItemProps>
        actionRef={vTable}
        headerTitle={'新闻管理'}
        options={false}
        toolBarRender={() => [
          <Button>
            <PlusOutlined />
            新建
          </Button>,
        ]}
        columns={columns}
        rowKey="id"
        search={{
          labelWidth: 'auto',
          optionRender: (searchConfig, formProps, dom) => [
            ...dom,
            <Button
              type="primary"
              key="primary"
              onClick={() => {
                vForm.current?.resetFields();
                setopenForm(true);
              }}
            >
              <PlusOutlined />
              新建
            </Button>,
          ],
        }}
        pagination={{
          hideOnSinglePage: true,
          showTotal: (total) => `共 ${total} 条`,
        }}
        request={async (params) => {
          const resp = await services.news.list({
            current: params.current || 1,
            pageSize: params.pageSize || 20,
          });
          return Promise.resolve({
            data: resp.data || [],
            success: true,
            totla: resp.page.total,
          });
        }}
      />
      {/* modals */}
      <ModalForm
        formRef={vForm}
        title={!!vForm.current?.getFieldValue('id') ? '编辑新闻' : '新建新闻'}
        open={openForm}
        width={700}
        layout="horizontal"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        modalProps={{
          forceRender: true,
          onCancel() {
            setopenForm(false);
          },
        }}
        onFinish={async (value) => {
          console.log(value);
          message.loading('处理中，请稍后...');
          setTimeout(() => {
            message.destroy();
            setopenForm(false);
            vTable.current?.reload();
          }, 1000);
        }}
      >
        <ProFormText name="id" noStyle hidden />
        <ProFormText
          label="标题"
          placeholder="请输入新闻标题"
          name="title"
          rules={[{ required: true }]}
        />
        <ProFormRadio.Group
          name="type"
          label="类型"
          rules={[{ required: true }]}
          options={[
            {
              label: '案例新闻',
              value: 1,
            },
            {
              label: '动态新闻',
              value: 2,
            },
          ]}
        />
        <ProFormRadio.Group
          name="category"
          label="分类"
          rules={[{ required: true }]}
          options={[
            { label: '文明实践', value: 1 },
            { label: '爱国卫生月', value: 2 },
            { label: '志愿服务', value: 3 },
          ]}
        />
        <ProFormText label="内容" name="content" rules={[{ required: true }]}>
          <EditorWang />
        </ProFormText>
      </ModalForm>
      <Modal open={!!content} title="新闻详情" onCancel={() => setContent('')} footer={null}>
        <div className="rich-text" dangerouslySetInnerHTML={{ __html: content }}></div>
      </Modal>
    </PageContainer>
  );
};

export default News;
