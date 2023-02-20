/*
 * @Author: Lee
 * @Date: 2023-02-20 11:39:12
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-21 00:15:26
 * @Description:
 */

/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */

export default function access(initialState: { currentUser?: API.LoginResult } | undefined) {
  const { currentUser } = initialState || {};
  const checkAccess = (code: string) => {
    console.log(currentUser)
    return currentUser && currentUser.access.indexOf(code) !== -1;
  };
  return {
    ACCESS_NAME: checkAccess('ACCESS_NAME'),
  };
}
