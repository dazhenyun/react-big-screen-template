import React from 'react';
import CountUp from 'react-countup';
import styles from './index.less';
export default () => {
  return (
    <div className={styles.num}>
      <ul>
        <li>
          <span />
          <span />
          <span />
          <span />
          <div>
            <CountUp end={21786} separator="," />
          </div>
          <p>企业数量（亿）</p>
        </li>
        <li>
          <span />
          <span />
          <span />
          <span />
          <div>
            <CountUp end={121786} separator="," />
          </div>
          <p>个体工商户数量（亿）</p>
        </li>
        <li>
          <span />
          <span />
          <span />
          <span />
          <div>
            <CountUp end={1786} separator="," />
          </div>
          <p>今日新增企业数量（万）</p>
        </li>
        <li>
          <span />
          <span />
          <span />
          <span />
          <div>
            <CountUp end={1786} separator="," />
          </div>
          <p>今日新增个体户数量（亿）</p>
        </li>
      </ul>
    </div>
  );
};
