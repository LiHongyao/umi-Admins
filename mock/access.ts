/*
 * @Author: Lee
 * @Date: 2023-02-20 17:35:54
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-20 17:37:16
 * @Description:
 */
import mockjs from 'mockjs';
export default mockjs.mock([
  { id: '@guid', code: 'DASHBOARD', name: '数据看板' },
  { id: '@guid', code: 'BOOK', name: '书库管理' },
  { id: '@guid', code: 'COMMENT', name: '评论管理' },
  { id: '@guid', code: 'ACCOUNT', name: '财务数据' },
  {
    id: '@guid',
    code: 'CFG',
    name: '配置项',
    children: [
      {
        id: '@guid',
        code: 'CFG_BANNER',
        name: '轮播图',
        parentId: '@guid',
      },
      {
        id: '@guid',
        code: 'CFG_BANNER',
        name: '排版',
        parentId: '@guid',
      },
      {
        id: '@guid',
        code: 'CFG_BANNER',
        name: '其他配置',
        parentId: '@guid',
      },
    ],
  },
  {
    id: '@guid',
    code: 'SYS',
    name: '系统管理',
    children: [
      {
        id: '@guid',
        code: 'SYS_ROLE',
        name: '角色管理',
        parentId: '@guid',
        children: [
          {
            id: '@guid',
            code: 'SYS_ROLE_CA',
            name: '添加角色权限',
            parentId: '@guid',
          },
          {
            id: '@guid',
            code: 'SYS_ROLE_UPD',
            name: '编辑角色权限',
            parentId: '@guid',
          },
        ],
      },
      {
        id: '@guid',
        code: 'SYS_USER',
        name: '用户管理',
        parentId: '@guid',
        children: [
          {
            id: '@guid',
            code: 'SYS_USER_CA',
            name: '添加用户权限',
            parentId: '@guid',
          },
          {
            id: '@guid',
            code: 'SYS_USER_UPD',
            name: '编辑用户权限',
            parentId: '@guid',
          },
          {
            id: '@guid',
            code: 'SYS_USER_AC',
            name: '操作用户权限',
            parentId: '@guid',
          },
        ],
      },
      {
        id: '@guid',
        code: 'SYS_LOGS',
        name: '日志管理',
        parentId: '@guid',
      },
    ],
  },
]);
