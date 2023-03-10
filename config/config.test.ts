/*
 * @Author: Lee
 * @Date: 2023-02-20 14:43:56
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-20 14:44:05
 * @Description: 
 */
import { defineConfig } from 'umi';

export default defineConfig({
  // 1. 部署至二级目录 → { base: '/二级目录名/', publicPath: '/二级目录名/'  }

  // 2. 输出目录
  outputPath: 'admin-test',

  // 3. 定义环境变量
  define: {
    'process.env.BASE': '',
    'process.env.NAME': 'production',
    'process.env.HOST': '此处为测试环境服务器地址',
  },
});
