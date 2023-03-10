/*
 * @Author: Lee
 * @Date: 2023-02-20 15:30:38
 * @LastEditors: Lee
 * @LastEditTime: 2023-03-02 14:53:29
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
  ProFormDateTimeRangePicker,
  ProFormDigit,
  ProFormInstance,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Image, message, Space, Switch } from 'antd';
import React, { useRef, useState } from 'react';

const Banners: React.FC = () => {
  // -- refs
  const vTable = useRef<ActionType>();
  const vForm = useRef<ProFormInstance>();

  // -- state
  const [dataSource, setDataSource] = useState<Array<API.BannerItemProps>>([]);
  const [tips, setTips] = useState('');
  const [openForm, setOpenForm] = useState(false);
  // -- effects

  // -- columns
  const columns: Array<ProColumns<API.BannerItemProps>> = [
    {
      title: '图片预览',
      dataIndex: 'bannerPic',
      hideInSearch: true,
      render: (_, { bannerPic }) => <Image src={bannerPic} height={80} />,
    },
    {
      title: '状态',
      dataIndex: 'state',
      valueType: 'select',
      valueEnum: {
        0: { text: '已禁用' },
        1: { text: '已启用' },
      },
      render: (_, { state, id }) => (
        <Switch
          checkedChildren={'已启用'}
          checked={!!state}
          onChange={async (v) => {
            message.loading('处理中..', 20 * 1000);
            setTimeout(() => {
              setDataSource((prev) =>
                prev.map((item) => (item.id === id ? { ...item, state: +v } : { ...item })),
              );
              message.destroy();
              message.success(v ? '已启用' : '已禁用');
            }, 1000);
          }}
        />
      ),
    },
    { title: '权重', dataIndex: 'weight', hideInSearch: true },
    {
      title: '跳转链接',
      tooltip: '请填写 Scheme 地址',
      dataIndex: 'jumpUrl',
      ellipsis: true,
      hideInSearch: true,
      copyable: true,
    },
    {
      title: '展示时间',
      key: 'showTime',
      valueType: 'dateTimeRange',
      width: 260,
      render: (_, { start, end }) => (
        <Space direction="vertical">
          <div>开始时间：{start || '-'}</div>
          <div>结束时间：{end || '-'}</div>
        </Space>
      ),
    },
    {
      title: '展示位置',
      dataIndex: 'locationCode',
      valueType: 'select',
      fieldProps: {
        fieldNames: {
          label: 'locationName',
          value: 'locationCode',
        },
      },
      request: async () => {
        const resp = await services.banners.getShowLocations();
        if (resp && resp.code === 200) {
          return resp.data;
        }
        return [];
      },
    },
    {
      title: '操作',
      key: 'action',
      hideInSearch: true,
      render: (_, record) => (
        <Button
          type="primary"
          size="small"
          onClick={() => {
            vForm.current?.setFieldsValue({
              ...record,
              bannerPic: [{ url: record.bannerPic }],
              showTime: [record.start, record.end],
            });
            setOpenForm(true);
          }}
        >
          编辑
        </Button>
      ),
    },
  ];

  // -- renders
  return (
    <PageContainer pageHeaderRender={false}>
      {/* 表格 */}
      <ProTable<API.BannerItemProps>
        headerTitle={'轮播图管理'}
        actionRef={vTable}
        dataSource={dataSource}
        columns={columns}
        rowKey={'id'}
        toolBarRender={() => [
          <Button
            onClick={() => {
              vForm.current?.resetFields();
              setOpenForm(true);
            }}
          >
            <PlusOutlined />
            新建
          </Button>,
        ]}
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
          const resp = await services.banners.list({
            current: params.current || 1,
            pageSize: params.pageSize || 20,
          });
          setDataSource(resp.data || []);
          return Promise.resolve({
            data: resp.data,
            success: true,
            total: resp.page.total,
          });
        }}
      />
      {/* 新建表单 */}
      <ModalForm
        formRef={vForm}
        title={!!vForm.current?.getFieldValue('id') ? '编辑轮播图' : '新建轮播图'}
        open={openForm}
        width={500}
        modalProps={{
          forceRender: true,
          onCancel: () => setOpenForm(false),
        }}
        onFinish={async (value) => {
          message.loading('处理中，请稍后...', 20 * 1000);
          // → 模拟请求
          setTimeout(() => {
            setTips(value.id ? '编辑成功' : '添加成功');
            vTable.current?.reload();
            setOpenForm(false);
          }, 1000);
        }}
      >
        <ProFormText noStyle hidden name="id" />
        <ProForm.Item
          label="轮播图片"
          name="bannerPic"
          rules={[{ required: true, message: '请上传轮播图' }]}
        >
          <AliyunOSSUpload dir="banner" />
        </ProForm.Item>

        <ProFormDigit
          label="权重"
          tooltip="数值越大越靠前，权重相同时根据根据创建时间排序。"
          name="weight"
          placeholder={'请输入权重'}
        />
        <ProFormTextArea
          allowClear
          label="跳转链接"
          tooltip="请填写 Scheme 地址"
          name="jumpUrl"
          placeholder={'请输入跳转链接'}
          rules={[{ required: true }]}
        />
        <ProFormDateTimeRangePicker label="展示时间" name="showTime" rules={[{ required: true }]} />
        <ProFormSelect
          name="locationCode"
          label="展示位置"
          fieldProps={{
            fieldNames: {
              label: 'locationName',
              value: 'locationCode',
            },
          }}
          request={async () => {
            const resp = await services.banners.getShowLocations();
            if (resp && resp.code === 200) {
              return resp.data;
            }
            return [];
          }}
          rules={[{ required: true }]}
        />
      </ModalForm>
    </PageContainer>
  );
};

export default Banners;
