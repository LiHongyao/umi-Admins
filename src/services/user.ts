/*
 * @Author: Lee
 * @Date: 2023-02-20 12:14:41
 * @LastEditors: Lee
 * @LastEditTime: 2023-03-02 16:03:55
 * @Description:
 */

import { request } from '@umijs/max';





export async function list(data: any) {
  return request<API.BaseResponse<API.UserProps[]>>('/api/users/list', {
    method: 'POST',
    data,
  });
}

export async function feedbacks(data: any) {
  return request<API.BaseResponse<API.FeedbackItemProps[]>>('/api/feedback/list', {
    method: 'POST',
    data,
  });
}

