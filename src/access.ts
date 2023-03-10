/*
 * @Author: Lee
 * @Date: 2023-02-20 11:39:12
 * @LastEditors: Lee
 * @LastEditTime: 2023-03-02 15:06:48
 * @Description:
 */

/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */

// -- 首先在 <configs.js> 文件中启用权限管理
// -- 添加路由时，设置 access 字段，字段名为权限名称，如：ACCESS_NAME
// -- 登录时，后端返回的权限列表保存在 <initialState.access> 字段下
export default function access(initialState: { currentUser?: API.LoginResult } | undefined) {
  const { currentUser } = initialState || {};
  const checkAccess = (code: string) => {
    return currentUser && currentUser.access.includes(code);
  };
  return {
    ACCESS_NAME: checkAccess('ACCESS_NAME'),
  };
}
