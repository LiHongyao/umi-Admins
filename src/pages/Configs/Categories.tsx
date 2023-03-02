import services from '@/services';
import { PlusOutlined } from '@ant-design/icons';
import { ProList } from '@ant-design/pro-components';
import { Button, Input, message } from 'antd';
import React, { memo, useEffect, useState } from 'react';

const Categories: React.FC = () => {
  // -- state
  const [dataSource, setDataSource] = useState<Array<API.CategoriesProps>>([]);
  const [name, setName] = useState('');

  // -- methods
  const getCategories = async () => {
    const resp = await services.categories.list();
    if (resp && resp.code === 200) {
      setDataSource(resp.data);
    }
  };
  // -- events
  const onCreateCategories = async () => {
    if (!name) {
      return message.info('请填写分类名称');
    }
    const isExist = dataSource.find((item) => item.name === name);
    if (isExist) {
      return message.info('当前分类已存在');
    }
    message.loading('处理中...', 20 * 1000);
    const resp = await services.categories.addOrUpdate({ name });
    if (resp && resp.code === 200) {
      getCategories();
      setName('');
    }
  };
  // -- effects
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div>
      <Input.Group compact>
        <Input
          allowClear={true}
          placeholder={'请填写...'}
          style={{ width: 200 }}
          value={name}
          onChange={(v) => setName(v.target.value)}
        />
        <Button type="primary" onClick={onCreateCategories}>
          <PlusOutlined />
        </Button>
      </Input.Group>
      <div style={{ color: '#888888', margin: '10px 0', fontSize: 10 }}>
        <b>温馨提示：</b>点击输入框即输入分类名称，然后点击「+」按钮即可添加新的分类。
      </div>
      <div style={{ width: 360 }}>
        <ProList<API.CategoriesProps>
          dataSource={dataSource}
          ghost={true}
          rowKey={'id'}
          size="small"
          editable={{
            onSave: async (key, record, originRow) => {
              message.loading('处理中...', 20 * 1000);
              const resp = await services.categories.addOrUpdate({
                id: record.id,
                name: record.name,
              });
              if (resp && resp.code === 200) {
                message.success('编辑成功');
                return true;
              }
              return false;
            },
            onDelete: async (key, row) => {
              message.loading('处理中...', 20 * 1000);
              const resp = await services.categories.remove(row.id);
              if (resp && resp.code === 200) {
                message.success('删除成功');
                return true;
              }
              return false;
            },
          }}
          onDataSourceChange={setDataSource}
          metas={{
            title: { dataIndex: 'name' },
            actions: {
              render: (text, row, index, action) => [
                <a
                  onClick={() => {
                    action?.startEditable(row.id);
                  }}
                >
                  编辑
                </a>,
              ],
            },
          }}
        />
      </div>
    </div>
  );
};

export default memo(Categories);
