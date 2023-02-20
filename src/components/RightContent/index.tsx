/*
 * @Author: Lee
 * @Date: 2023-02-20 11:39:12
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-20 14:55:45
 * @Description:
 */
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { useModel } from '@umijs/max';
import moment from 'moment';
import React from 'react';
import Avatar from './AvatarDropdown';

const GlobalHeaderRight: React.FC = () => {
  const className = useEmotionCss(() => {
    return {
      display: 'flex',
      alignItems: 'center',
      height: '48px',
      marginLeft: 'auto',
      overflow: 'hidden',
      gap: 8,
      color: '#FFFFFF',
    };
  });

  const { initialState } = useModel('@@initialState');

  if (!initialState || !initialState.settings) {
    return null;
  }

  return (
    <div className={className}>
      <span>{moment().locale('zh-cn').format('YYYY年MM月DD日 dddd')}</span>
      <Avatar />
    </div>
  );
};
export default GlobalHeaderRight;
