/*
 * @Author: Lee
 * @Date: 2023-02-20 11:59:13
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-21 01:19:06
 * @Description:
 */

declare namespace API {
  /**********************
   ** 基础APIs
   **********************/
  interface BaseResponse<T = any> {
    code: number;
    data: T;
    msg: string;
    page: {
      pageNo: number;
      pages: number;
      total: number;
    };
  }

  /**********************
   ** Aliyun OSS Configs
   **********************/
  type OSSConfigProps = {
    dir: string;
    expire: string;
    host: string;
    accessKeyId: string;
    policy: string;
    signature: string;
  };
  type OSSSTSConfigProps = {
    host: string;
    region: string;
    bucket: string;
    accessKeyId: string;
    accessKeySecret: string;
    stsToken: string;
  };

  /**********************
   ** 登录接口
   **********************/
  type LoginWithAccount = {
    username: string;
    password: string;
  };
  type LoginWithMobile = {
    mobile: string;
    captcha: string;
  };
  type LoginResult = {
    token: string /** token */;
    access: Array<string> /** 权限列表 */;
    user: {
      nickname: string /** 用户昵称 */;
      avatar: string /** 用户头像 */;
    };
  };
  /**********************
   ** Banner 管理
   **********************/
  type BannerItemProps = {
    id: string;
    state: number;
    sort: number;
    jumpUrl: string;
    bannerPic: string;
    weight: string;
    start: string;
    end: string;
    locationCode: string;
  };
  type BannerLocationProps = {
    locationCode: string;
    locationName: string;
  };
  /**********************
   ** 系统管理
   **********************/
  type SystemsAccessProps = {
    id: string;
    parentId?: string;
    code: string;
    name: string;
    children?: Array<SystemsAccessProps>;
  };
  type SystemRoleProps = {
    id: string;
    name: string;
    createBy: string;
    createTime: string;
    updateBy: string;
    updateTime: string;
    auths: Array<SystemsAccessProps>;
  };
  type SystemsUserProps = {
    id: string;
    avatar: string /** 用户头像 */;
    nickname: string /** 用户昵称 */;
    username: string /** 用户名 */;
    password: string /** 密码 */;
    createBy: string /** 创建者 */;
    createTime: string /** 创建时间 */;
    lastLoginTime: string /** 最后登录时间 */;
    roleId: string /** 角色ID */;
    state: number /** 状态 */;
  };
  /**********************
   ** 审核列表
   **********************/
  type AuditItemProps = {
    id: string;
    works: string;
    name: string;
    desc: string;
    unit: string;
    createDate: string;
    state: number;
    mobile: string;
    roomName: string;
  };
  /**********************
   ** 新闻管理
   **********************/
  type NewsItemProps = {
    content: string;
  };
}
