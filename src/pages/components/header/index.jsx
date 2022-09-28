/* eslint-disable no-undef */
import React, { useState, useEffect, useRef } from 'react';
import Request from '@/utils/Request';
import moment from 'moment';
import styles from './index.less';

export default () => {
  const [time, setTime] = useState('');
  const refFrame = useRef();

  const timestampToTime = () => {
    setInterval(() => {
      const date = new Date();
      const hh = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
      const mm = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
      const ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
      setTime(`${hh}:${mm}:${ss}`);
    }, 1000);
  };

  const getWeather = async () => {
    const text = await Request.get('/api', {
      style: 'yd',
      skin: 'banana',
    });
    console.log(text);
  };

  useEffect(() => {
    // getWeather();
    timestampToTime();
  }, []);

  return (
    <div className={styles.header}>
      <div className={styles.weather} style={{ textAlign: 'right' }}>
        <div style={{ paddingRight: '.2rem' }}>
          {/* <iframe
          ref={refFrame}
          scrolling="no"
          src="https://tianqiapi.com/api.php?style=yd&skin=banana"
          frameBorder="0"
          width="100%"
          height="50"
          id="frame"
        /> */}
          30°C <span>多云</span>
        </div>
      </div>
      <div className={styles.logo}>阿达云企业大数据驾驶舱</div>
      <div className={styles.times}>
        {time}
        <span>{moment().format('YYYY-MM-DD')}</span>
      </div>
    </div>
  );
};
