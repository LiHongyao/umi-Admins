/*
 * @Author: Lee
 * @Date: 2023-02-20 11:39:12
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-20 13:33:14
 * @Description: 
 */
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Dropdown } from 'antd';
import type { DropDownProps } from 'antd/es/dropdown';
import classNames from 'classnames';
import React from 'react';

export type HeaderDropdownProps = {
  overlayClassName?: string;
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight' | 'bottomCenter';
} & Omit<DropDownProps, 'overlay'>;

const HeaderDropdown: React.FC<HeaderDropdownProps> = ({ overlayClassName: cls, ...restProps }) => {
  const className = useEmotionCss(({ token }) => {
    return {
      [`@media screen and (max-width: ${token.screenXS})`]: {
        width: '100%',
      },
    };
  });
  return (
    <Dropdown
      overlayClassName={classNames(className, cls)}
      getPopupContainer={(target) => target.parentElement || document.body}
      {...restProps}
    />
  );
};

export default HeaderDropdown;
