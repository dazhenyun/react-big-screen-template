/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { Pie } from '@dzv/charts';
import Map from './charts';
import AppHeader from './components/header';
import AppNum from './components/num';
import AppNet from './components/ent';
import { DzBox, DzRotate, DzCapsuleChart } from '@/components';
import '@/utils/Theme/index';
import styles from './index.less';

export default () => {
  return (
    <div className={styles.app_main}>
      <AppHeader />
      <div className={styles.app_box}>
        <div className={styles.app_left}>
          <div className={styles.app_left_count}>
            <AppNum />
          </div>
          <div className={styles.app_left_box}>
            <div className={styles.left_box}>
              <div style={{ marginTop: '0.3rem' }}>
                <DzBox title="各省市场主体数量排行榜" boxStyle={{ height: '4.2rem', overflow: 'hidden' }}>
                  <DzCapsuleChart
                    labelRender={(item, index) => (
                      <>
                        <span className={`pm pm_${index}`}>{index + 1}</span>
                        {item.label}
                      </>
                    )}
                    rotateX="3.8rem"
                    items={[
                      { value: 3000, label: '广东' },
                      { value: 4000, label: '江苏' },
                      { value: 2400, label: '浙江' },
                      { value: 4300, label: '山东' },
                      { value: 2200, label: '北京' },
                      { value: 1030, label: '上海' },
                      { value: 5000, label: '天津' },
                      { value: 2000, label: '南京' },
                      { value: 3000, label: '河北' },
                      { value: 9000, label: '南昌' },
                      { value: 6000, label: '广西' },
                      { value: 5000, label: '新疆' },
                      { value: 6000, label: '甘肃' },
                      { value: 7000, label: '青海' },
                      { value: 8000, label: '海南' },
                    ]}
                  />
                </DzBox>
              </div>
              <div style={{ marginTop: '0.3rem' }}>
                <DzBox title="市场主体成立时间分布" boxStyle={{ height: '2.84rem' }}>
                  <Pie
                    height="2.4rem"
                    theme="dark"
                    option={{
                      backgroundColor: 'transparent',
                      legend: null,
                      series: {
                        // 最外层环的数据
                        name: '',
                        type: 'pie',
                        radius: ['40%', '60%'],
                        labelLine: {
                          normal: {
                            show: true,
                            length: 15, // 第一段线 长度
                            length2: 110, // 第二段线 长度
                            align: 'right',
                          },
                          emphasis: {
                            show: true,
                          },
                        },
                        label: {
                          show: false,
                        },

                        itemStyle: {
                          normal: {
                            // 控制引导线上文字颜色和位置,此处a是显示文字区域，b做一个小圆圈在引导线尾部显示
                            label: {
                              color: '#fff',
                              show: true,
                              // a和b来识别不同的文字区域
                              formatter: [
                                '{a|{d}%  {b}}', // 引导线上面文字
                                '{b|}', // 引导线下面文字
                              ].join('\n'), // 用\n来换行
                              rich: {
                                a: {
                                  left: 20,
                                  padding: [0, -100, 10, -100],
                                },
                              },
                            },
                          },
                        },
                        data: [
                          { value: 100, name: '需求阶段' },
                          { value: 50, name: '开发阶段' },
                          { value: 40, name: '验证阶段' },
                          { value: 30, name: '审批阶段' },
                          { value: 100, name: '投产阶段' },
                          { value: 20, name: '下线归档' },
                          { value: 10, name: '未知' },
                        ],
                      },
                    }}
                  />
                </DzBox>
              </div>
            </div>
            <div className={styles.right_box}>
              <Map />
              <div className={styles.right_box_botton}>
                <AppNet />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.app_right}>
          <DzBox title="各行业市场主体数量排行" boxStyle={{ height: '3.3rem', overflow: 'hidden' }}>
            <DzCapsuleChart
              rotateX="2.6rem"
              labelRender={(item, index) => (
                <>
                  <span className={`pm pm_${index}`}>{index + 1}</span>
                  {item.label}
                </>
              )}
              items={[
                { value: 3000, label: '批发和零售行业' },
                { value: 4000, label: '制造业' },
                { value: 2400, label: '农、林、牧、渔业' },
                { value: 4300, label: '住宿和餐饮业' },
                { value: 2200, label: '租赁和商务服务业' },
                { value: 1030, label: '水利、环境和公共 设施管理业' },
                { value: 5000, label: '计算机行业' },
                { value: 2000, label: '医疗，保健品行业' },
                { value: 2000, label: '医疗，保健品行业' },
                { value: 2000, label: '医疗，保健品行业' },
                { value: 2000, label: '医疗，保健品行业' },
                { value: 2000, label: '医疗，保健品行业' },
              ]}
            />
          </DzBox>
          <div style={{ marginTop: '0.3rem' }}>
            <DzBox title="市场主体注册资本分布" boxStyle={{ height: '2.5rem' }}>
              <Pie
                height="1.9rem"
                theme="dark"
                option={{
                  backgroundColor: 'transparent',
                  title: {
                    // 中间显示的数据
                    text: '资本分布',
                    left: '39%',
                    top: '37%',
                    textAlign: 'center',
                  },
                  legend: {
                    orient: 'vertical',
                    top: '5%',
                    left: '60%',
                    // right:'10%',
                    data: ['需求阶段', '开发阶段', '验证阶段', '审批阶段', '投产阶段', '下线归档', '未知'],
                  },
                  series: {
                    // 最外层环的数据
                    name: '资本分布',
                    type: 'pie',
                    center: ['40%', '45%'],
                    radius: ['55%', '70%'],
                    labelLine: {
                      show: false,
                    },
                    label: {
                      show: false,
                    },
                    data: [
                      { value: 100, name: '需求阶段' },
                      { value: 50, name: '开发阶段' },
                      { value: 40, name: '验证阶段' },
                      { value: 30, name: '审批阶段' },
                      { value: 100, name: '投产阶段' },
                      { value: 20, name: '下线归档' },
                      { value: 10, name: '未知' },
                    ],
                  },
                }}
              />
            </DzBox>
          </div>
          <div style={{ marginTop: '0.3rem' }}>
            <DzBox title="企业动态">
              <DzRotate boxStyle={{ height: '1.9rem' }}>
                <div className={styles.ent_list}>
                  <p>2020-08-15 15:00</p>浙江文化传媒有限公司 在广州成立
                </div>
                <div className={styles.ent_list}>
                  <p>2020-08-15 15:00</p>浙江文化传媒有限公司 在广州成立
                </div>
                <div className={styles.ent_list}>
                  <p>2020-08-15 15:00</p>浙江文化传媒有限公司 在广州成立
                </div>
                <div className={styles.ent_list}>
                  <p>2020-08-15 15:00</p>浙江文化传媒有限公司 在广州成立
                </div>
                <div className={styles.ent_list}>
                  <p>2020-08-15 15:00</p>浙江文化传媒有限公司 在广州成立
                </div>
                <div className={styles.ent_list}>
                  <p>2020-08-15 15:00</p>浙江文化传媒有限公司 在广州成立
                </div>
              </DzRotate>
            </DzBox>
          </div>
        </div>
      </div>
    </div>
  );
};
