/*
 * @Author: Lee
 * @Date: 2023-02-20 17:19:25
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-20 17:21:06
 * @Description:
 */
import { request } from '@umijs/max';

export async function ossConfig<T>() {
  return request<API.BaseResponse<T>>('/api/upload/getSignForOSS');
}
