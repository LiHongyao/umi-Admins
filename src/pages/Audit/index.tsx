import React, { useRef, useState } from 'react';
import ImageBox from '@/components/@lgs/ImageBox';
import services from '@/services';
import {
  ActionType,
  FooterToolbar,
  ModalForm,
  PageContainer,
  ProColumns,
  ProFormInstance,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import { Button, message, Modal, Space, Table } from 'antd';

const Audit: React.FC = () => {
  // - refs
  const vTable = useRef<ActionType>();
  const vForm = useRef<ProFormInstance>();

  // - state
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<Array<string>>([]);
  // - methods
  const audit = async (data: {
    type: 'RESOLVE' | 'REJECT';
    ids?: string[];
    rejectReason?: string;
  }) => {
    const { type, ids, rejectReason } = data;
    console.log(data);
    const handlerAudit = () => {
      message.loading('处理中，请稍后', 20 * 1000);
      setTimeout(() => {
        message.destroy();
      }, 1000);
    };
    if (type === 'RESOLVE') {
      Modal.confirm({
        title: '温馨提示',
        content: '您确定要通过审核选中项么？',
        cancelText: '点错了',
        onOk: () => {
          handlerAudit();
        },
      });
      return;
    }
    handlerAudit();
  };

  // - columns
  const columns: Array<ProColumns<API.AuditItemProps>> = [
    {
      title: '提交作品',
      dataIndex: 'works',
      hideInSearch: true,
      render: (_, { works }) => <ImageBox src={works} width={100} height={60} />,
    },
    {
      title: '审核状态',
      dataIndex: 'state',
      width: 100,
      fieldProps: {
        placeholder: '全部',
        allowClear: true,
      },
      valueType: 'select',
      valueEnum: {
        0: { text: '待审核', status: 'Processing' },
        1: { text: '已通过', status: 'Success' },
        2: { text: '已驳回', status: 'Error' },
      },
    },
    {
      title: '提交时间',
      dataIndex: 'createDate',
      hideInSearch: true,
      width: 160,
    },
    {
      title: '家园告白',
      dataIndex: 'desc',
      hideInSearch: true,
    },
    { title: '业主姓名', dataIndex: 'name', hideInSearch: true, width: 120 },
    {
      title: '联系方式',
      dataIndex: 'mobile',
      copyable: true,
      width: 140,
    },
    {
      title: '单元信息',
      dataIndex: 'roomName',
      hideInSearch: true,
      copyable: true,
    },
    {
      title: '操作',
      key: 'action',
      hideInSearch: true,
      render: (_, { state, id }) => (
        <Space>
          <Button
            disabled={state !== 1}
            size="small"
            type="primary"
            shape="round"
            danger
            onClick={() => {
              vForm.current?.setFieldsValue({ id });
              setShowRejectModal(true);
            }}
          >
            驳回
          </Button>
          <Button
            disabled={state !== 1}
            size="small"
            type="primary"
            shape="round"
            onClick={() =>
              audit({
                type: 'RESOLVE',
                ids: [id],
              })
            }
          >
            通过
          </Button>
        </Space>
      ),
    },
  ];

  // -- renders
  return (
    <PageContainer pageHeaderRender={false}>
      <ProTable<API.AuditItemProps>
        actionRef={vTable}
        headerTitle={'作品审核'}
        columns={columns}
        rowKey={'id'}
        search={{
          labelWidth: 'auto',
        }}
        rowSelection={{
          selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
          getCheckboxProps({ state }) {
            return {
              disabled: state !== 1,
            };
          },
          onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRowKeys(selectedRowKeys as string[]);
          },
        }}
        pagination={{
          hideOnSinglePage: true,
          showTotal: (total) => `共 ${total} 条`,
        }}
        request={async (params: any) => {
          const r = await services.audit.list({
            current: params.current || 1,
            pageSize: params.pageSize || 20,
            // type: 4,
            // state: +params.state,
          });
          return Promise.resolve({
            data: r.data,
            success: true,
            total: r.page.total,
          });
        }}
      />

      {/* 渲染 */}
      {selectedRowKeys.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <span>已选择</span>
              <a style={{ fontWeight: 600, margin: '0 6px' }}>{selectedRowKeys.length}</a>
              <span>项</span>
            </div>
          }
        >
          <Button onClick={() => setShowRejectModal(true)}>批量驳回</Button>
          <Button
            type="primary"
            onClick={() =>
              audit({
                type: 'RESOLVE',
                ids: selectedRowKeys,
              })
            }
          >
            批量通过
          </Button>
        </FooterToolbar>
      )}
      {/* 驳回 */}
      <ModalForm
        formRef={vForm}
        title={'驳回原因'}
        open={showRejectModal}
        width={500}
        modalProps={{
          forceRender: true,
          cancelText: '点错了',
          onCancel: () => setShowRejectModal(false),
        }}
        onFinish={async ({ rejectReason, id }) => {
          const ids = selectedRowKeys.length > 0 ? selectedRowKeys : [id as string];
          setShowRejectModal(false);
          audit({
            type: 'REJECT',
            ids,
            rejectReason,
          });
        }}
      >
        <ProFormText name="id" noStyle hidden />
        <ProFormTextArea
          name="rejectReason"
          placeholder="请填写驳回原因，最多100个字符"
          fieldProps={{ maxLength: 100 }}
          rules={[{ required: true, message: '请填写驳回原因' }]}
        />
      </ModalForm>
    </PageContainer>
  );
};

export default Audit;