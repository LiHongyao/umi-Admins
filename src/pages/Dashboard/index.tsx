/*
 * @Author: Lee
 * @Date: 2023-02-20 12:43:20
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-20 14:55:07
 * @Description:
 */
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Divider } from 'antd';
import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <PageContainer pageHeaderRender={() => null}>
      <ProCard>
        <h1
          style={{
            color: '#EEEEEE',
            textAlign: 'center',
            margin: 0,
            fontSize: 46,
            letterSpacing: 2,
          }}
        >
          <Divider />
          {/** 榮發裝飾 · */} 後臺管理系統模板
          <Divider />
        </h1>
      </ProCard>
    </PageContainer>
  );
};

export default Dashboard;
