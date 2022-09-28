import React, { useMemo } from 'react';
import { Statistic, Popover } from 'antd';
import {
  CheckCircleOutlined,
  QuestionCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import styles from './index.less';

const Item = ({ title, items, iconRender }) => {
  const list = useMemo(() => {
    let num = 0;
    items.forEach((element) => {
      num += element.value;
    });
    return items.map((el) => {
      return { ...el, count: (el.value / num) * 100 };
    });
  }, [items]);

  return (
    <div className={styles.ent_box}>
      <dl>
        <dt>
          {iconRender?.()}&nbsp;&nbsp;
          {title}
        </dt>
        <dd>
          <ul>
            {list.map((el, index) => {
              const colorPalette = [
                '#02F1FA',
                '#9931FE',
                '#FABA25',
                '#49A5FE',
                '#FC4C84',
                '#336DB5',
                '#41C365',
                '#DD99E9',
                '#EEB468',
                '#30ABE3',
                '#02F1FA',
                '#ADF27B',
              ];
              return (
                <Popover
                  key={index}
                  overlayClassName={styles.popover}
                  content={
                    <>
                      {el.label}
                      <p>
                        <Statistic value={el.value} />
                      </p>
                    </>
                  }
                >
                  <li
                    style={{
                      backgroundColor: `${colorPalette[index]}`,
                      width: `${el.count}%`,
                    }}
                  />
                </Popover>
              );
            })}
          </ul>
        </dd>
      </dl>
    </div>
  );
};

export default () => {
  return (
    <div className={styles.ent}>
      <Item
        title="正常状态企业数量"
        iconRender={() => <CheckCircleOutlined />}
        items={[
          { value: 55678, label: '存续' },
          { value: 23254, label: '在业' },
          { value: 12325, label: '迁入' },
          { value: 67890, label: '迁出' },
          { value: 34653, label: '设立' },
        ]}
      />
      <Item
        title="异常状态企业数量"
        iconRender={() => <QuestionCircleOutlined />}
        items={[
          { value: 55678, label: '存续' },
          { value: 23254, label: '撤销' },
          { value: 12325, label: '吊销' },
          { value: 67890, label: '破产' },
          { value: 34653, label: '重整' },
          { value: 21342, label: '清算' },
          { value: 14564, label: '清理' },
          { value: 23567, label: '废止' },
          { value: 4357, label: '停业' },
          { value: 1221, label: '歇业' },
          { value: 3455, label: '责令关闭' },
        ]}
      />
      <Item
        title="注销"
        iconRender={() => <CloseCircleOutlined />}
        items={[{ value: 55678, label: '注销' }]}
      />
    </div>
  );
};
