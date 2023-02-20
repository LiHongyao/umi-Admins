import { request } from '@umijs/max';

export async function access() {
  return request<API.BaseResponse<API.SystemsAccessProps[]>>('/admin/systems/access');
}

export async function roles() {
  return request<API.BaseResponse<API.SystemRoleProps[]>>('/admin/systems/roles');
}

export async function users() {
  return request<API.BaseResponse<API.SystemsUserProps[]>>('/admin/systems/users');
}
