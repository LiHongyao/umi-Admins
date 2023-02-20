/*
 * @Author: Lee
 * @Date: 2023-02-21 01:20:01
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-21 01:20:38
 * @Description: 
 */
import { request } from '@umijs/max';

export async function list(data: { current: number; pageSize: number }) {
  return request<API.BaseResponse<API.NewsItemProps[]>>('/admin/news/list', {
    method: 'POST',
    data,
  });
}
