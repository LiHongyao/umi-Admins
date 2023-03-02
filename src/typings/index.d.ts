/*
 * @Author: Lee
 * @Date: 2023-03-02 13:50:38
 * @LastEditors: Lee
 * @LastEditTime: 2023-03-02 16:07:02
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
   ** 轮播广告
   **********************/
  type BannerItemProps = {
    id: string; /** ID */
    state: number; /** 启用/禁用状态 */
    bannerPic: string; /** 轮播图片链接 */
    weight: string; /** 权重 */
    jumpUrl: string; /** 跳转链接 */
    start: string; /** 展示开始时间 */
    end: string; /** 展示结束时间 */
    locationCode: string;  /** 展示位置编码 */
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
    roleName: string; /** 角色名称 */
    createBy: string; /** 创建者 */
    createDate: string; /** 创建时间 */
    updateBy: string; /** 更新者 */
    updateDate: string; /** 更新时间 */
    authIds: Array<string>; /** 权限列表 */
  };
  type SystemsUserProps = {
    id: string;
    username: string /** 用户名 */;
    nickname: string /** 用户昵称 */;
    avatar: string /** 用户头像 */;
    roleId: string /** 角色ID */;
    createBy: string /** 创建者 */;
    createDate: string /** 创建时间 */;
    lastLoginTime: string /** 最后登录时间 */;
    state: number /** 状态 */;
  };

   /**********************
   ** 分类管理
   **********************/
   type CategoriesProps = {
    name: string;
    id: string;
  };

   /**********************
   ** 用户列表
   **********************/
   type UserProps = {
    id: string;
    nickname: string;
    avatarUrl: string;
    phone: string;
    createDate: string;
  };

  type FeedbackItemProps = {
    id: string;
    createDate: string;
    content: string;
    nickname: string;
    phone: string;
    avatarUrl: string;
  }

  
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
    title: string;
    content: string;
  };
}
