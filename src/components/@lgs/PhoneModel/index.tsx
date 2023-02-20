/*
 * @Author: Lee
 * @Date: 2022-09-27 16:58:39
 * @LastEditors: Lee
 * @LastEditTime: 2022-10-13 14:43:16
 * @Description:
 */
import React, { memo, useEffect, useRef } from 'react';
import { Modal } from 'antd';
import './index.less';

interface IProps {
  /** 标题 */
  title?: string;
  /** 宽度 */
  width?: number;
  /** 显示状态 */
  open: boolean;
  /** 显示内容（富文本） */
  __html: string;
  /** 隐藏模型 */
  onCancel: () => void;
}

const PhoneModel: React.FC<IProps> = ({
  title = 'App Demos',
  width = 360,
  open,
  onCancel,
  __html,
}) => {
  // - refs
  const phone = useRef<HTMLImageElement | null>(null);
  const content = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (content.current) {
      console.log(content.current.offsetWidth);
    }
  }, [content]);
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      closable={false}
      wrapClassName="phone-model"
      bodyStyle={{ padding: 0 }}
      width={width}
    >
      <div className="phone-model-content" style={{ width }}>
        <img
          ref={phone}
          width={width}
          height={'auto'}
          className="phone-model-content__phone"
          src="https://lm-common.icaiji.net/images/20220927/IZV1664267365870.png"
        />
        <div className="phone-model-content__nav">{title}</div>
        <div className="phone-model-content__ct" dangerouslySetInnerHTML={{ __html }} />
      </div>
    </Modal>
  );
};

export default memo(PhoneModel);
