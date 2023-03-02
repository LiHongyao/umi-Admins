/*
 * @Author: Lee
 * @Date: 2023-02-20 14:41:30
 * @LastEditors: Lee
 * @LastEditTime: 2023-03-02 13:54:10
 * @Description:
 */
// https://umijs.org/config/
import { defineConfig } from '@umijs/max';

const HOST = {
  后台A: 'http://192.168.0.72:8000',
  后台B: '此处为后台B服务器地址',
};

export default defineConfig({
  define: {
    'process.env.BASE': '',
    'process.env.NAME': 'development',
    'process.env.HOST': HOST.后台A,
  },
});
