/*
 * @Author: Lee
 * @Date: 2022-06-20 10:28:49
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-20 15:16:21
 * @Description:
 */
// → 安装依赖：npm install  react-tsparticles  tsparticles-engine tsparticles
import React, { memo } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import type { Container, Engine } from 'tsparticles-engine';
import styles from './index.less';
import { particlesOptions } from './particlesOptions';

const InitParticles: React.FC = () => {
  const particlesInit = async (main: Engine) => {
    console.log(main);
    await loadFull(main);
  };
  const particlesLoaded = async (container?: Container) => {
    console.log(container);
  };

  return (
    // @ts-ignore
    <Particles
      className={styles.tsparticles}
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={particlesOptions}
    />
  );
};

export default memo(InitParticles);
