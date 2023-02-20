/*
 * @Author: Lee
 * @Date: 2023-02-20 15:33:13
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-20 17:14:48
 * @Description:
 */

import { request } from '@umijs/max';

export async function list(data: { current: number; pageSize: number }) {
  return request<API.BaseResponse<API.BannerItemProps[]>>('/admin/banners/list', {
    method: 'POST',
    data,
  });
}

export async function getShowLocations() {
  return request<API.BaseResponse<API.BannerLocationProps[]>>('/admin/banners/show-location');
}
