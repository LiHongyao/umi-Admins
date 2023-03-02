/*
 * @Author: Lee
 * @Date: 2023-03-02 15:05:36
 * @LastEditors: Lee
 * @LastEditTime: 2023-03-02 15:05:44
 * @Description: 
 */
import { message } from 'antd';

class Utils {
  /**
   * 检查权限 -- 功能权限
   * @param code
   * @returns
   */
  public static checkAccessForFunc(code: string) {
    const loc = localStorage.getItem('XXX_USERINFOs') ?? '{}';
    const access = (JSON.parse(loc).access ?? []) as Array<string>;
    return new Promise((resolve) => {
      if (access.includes(code)) {
        resolve(null);
      } else {
        message.info('您当前没有权限哟~');
      }
    });
  }
}

export default Utils;