/*
 * @Author: Lee
 * @Date: 2023-02-20 12:14:41
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-20 13:37:16
 * @Description:
 */

import { request } from '@umijs/max';

/** 用户登录（账号密码） */
export async function login(data: API.LoginWithAccount) {
  return request<API.BaseResponse<API.LoginResult>>('/admin/auths/login', {
    method: 'POST',
    data,
  });
}

/** 退出登录 */
export async function logout() {
  return request<API.BaseResponse<any>>('/admin/auths/logout', {
    method: 'POST',
  });
}
