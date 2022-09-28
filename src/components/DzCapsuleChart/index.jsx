/* eslint-disable no-return-assign */
/* eslint-disable no-undef */
import React, { useMemo } from 'react';
import { Statistic } from 'antd';
import { DzRotate } from '..';
import './index.less';

export default ({ items, labelRender, rotateX }) => {
  const list = useMemo(() => {
    let num = 0;
    items.forEach(element => {
      num += element.value;
    });

    return items
      .map(el => {
        return { ...el, count: (el.value / num) * 100 };
      })
      .sort((a, b) => b.count - a.count);
  }, [items]);
  return (
    <div className="capsuleChart">
      <ul>
        <DzRotate boxStyle={{ height: rotateX }}>
          {list.map((el, index) => (
            <li key={index}>
              <span style={{ paddingRight: '10px' }}>{labelRender ? labelRender(el, index) : el.label}</span>
              <div className="item">
                <div
                  style={{
                    width: `${el.count}%`,
                  }}
                />
              </div>
              <span className="val">
                <Statistic value={el.value} />
              </span>
            </li>
          ))}
        </DzRotate>
      </ul>
    </div>
  );
};
