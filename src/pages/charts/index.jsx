/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useRef, useEffect, useState } from 'react';
import { RightOutlined } from '@ant-design/icons';
// 按需引入Echarts
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  VisualMapComponent,
  GeoComponent,
} from 'echarts/components';
import { MapChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
// HainanMap-地图json，HainanData-各市名称映射，HainanIntro-各市展示数据
import { mapCity } from './map';
import styles from './index.less';
echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  VisualMapComponent,
  GeoComponent,
  MapChart,
  CanvasRenderer,
]);

export default () => {
  const [mapVal, setMapVal] = useState({});
  // 需要渲染地图的Dom
  const chartDom = useRef();
  let city = [];

  const data = [
    {
      name: '南海诸岛',
      value: 2,
      transRate: 2,
    },
    {
      name: '北京',
      value: 54,
      transRate: 54.12,
    },
    {
      name: '天津',
      value: 13,
      transRate: 14.12,
    },
    {
      name: '上海',
      value: 40,
      transRate: 4.12,
    },
    {
      name: '重庆',
      value: 75,
      transRate: 24.12,
    },
    {
      name: '河北',
      value: 13,
      transRate: 12.12,
    },
    {
      name: '河南',
      value: 83,
      transRate: 54.01,
    },
    {
      name: '云南',
      value: 11,
      transRate: 14.12,
    },
    {
      name: '辽宁',
      value: 19,
      transRate: 34.12,
    },
    {
      name: '湖南',
      value: 69,
      transRate: 4.12,
    },
    {
      name: '安徽',
      value: 60,
      transRate: 4.12,
    },
    {
      name: '山东',
      value: 39,
      transRate: 4.12,
    },
    {
      name: '江苏',
      value: 31,
      transRate: 4.12,
    },
    {
      name: '浙江',
      value: 104,
      transRate: 54.12,
    },
    {
      name: '江西',
      value: 36,
      transRate: 4.12,
    },
    {
      name: '湖北',
      value: 105,
      transRate: 54.12,
    },
    {
      name: '广西',
      value: 33,
      transRate: 4.12,
    },
    {
      name: '甘肃',
      value: 7,
      transRate: 4.12,
    },
    {
      name: '山西',
      value: 9,
      transRate: 4.12,
    },
    {
      name: '内蒙古',
      value: 7,
      transRate: 4.12,
    },
    {
      name: '陕西',
      value: 22,
      transRate: 4.12,
    },
    {
      name: '吉林',
      value: 4,
      transRate: 4.12,
    },
    {
      name: '福建',
      value: 18,
      transRate: 4.12,
    },
    {
      name: '贵州',
      value: 5,
      transRate: 4.12,
    },
  ];

  let myChart = null;

  useEffect(() => {
    if (chartDom.current) {
      initChart();
    }
  }, []);

  const initChart = (code = 'china') => {
    myChart = echarts.init(chartDom.current);
    myChart.showLoading({
      text: '加载中...',
      color: '#c23531',
      fontSize: '28px',
      textColor: '#000',
      maskColor: 'rgba(255, 255, 255, 0.2)',
      zlevel: 0,
    });
    getQuery(code);
    window.addEventListener('resize', () => {
      myChart.resize();
    });
  };

  const getQuery = code => {
    const data = require('./json/' + code + '.json');
    // 重新绘制地图
    const newCity = [];
    for (let i = 0; i < data.features.length; i ++) {
      if (data.features[i].properties.name === '青海') {
        console.info(i * 2);
      }
      newCity.push({
        // 获取地图数据
        name: data.features[i].properties.name,
        // 此处虚拟数据，应从后台服务获取数据
        value: i * 2,
      });
    }
    city = newCity;
    echarts.registerMap(code, data);
    initEcharts(code, city);
  };

  const initEcharts = (area, data) => {
    myChart.hideLoading();
    myChart.setOption(
      {
        tooltip: {
          show: true,
        },
        visualMap: {
          show: true,
          type: 'piecewise',
          bottom:'10%',
          showLabel: true,
          textStyle: {
            fontSize: 14,
            color: '#fff',
          },
          inRange: {
            color: ['rgba(34, 82, 119, 0.9)', '#02f1fa'],
            symbolSize: [30, 100],
          },
        },
        geo: {
          regions: [
            {
              name: '南海诸岛',
              itemStyle: {
                // 隐藏地图
                normal: {
                  opacity: 0, // 为 0 时不绘制该图形 挡着有点难看
                },
              },
              label: {
                show: false, // 隐藏文字
              },
            },
          ],
          show: true,
          map: area,
          zoom: 1, // 当前视角的缩放比例
          roam: true,
          itemStyle: {
            normal: {
              // shadowBlur: 50,
              // shadowColor: 'rgba(0, 0, 0, 0.2)',
              borderColor: 'rgba(92, 198, 214, 0.5)',
              borderWidth: 1,
            },
            emphasis: {
              areaColor: '#02f1fa',
            },
          },
          scaleLimit: {
            // 滚轮缩放的极限控制
            min: 0.5,
            max: 6,
          },
          label: {
            show: true,
            fontSize: 14,
            color: '#fff',
          },
        },
        series: [
          {
            name: '地区',
            nameMap: {
              china: '中国',
            },
            top: 20,
            type: 'map',
            coordinateSystem: 'geo',
            geoIndex: 0,
            itemStyle: {
              normal: {
                areaColor: 'rgba(0, 38, 66, 0.8)',
                borderColor: '#FFFFFF',
              },
            },
            data: data,
          },
          // {
          //   name: 'map', // series名称
          //   type: 'map',
          //   map: area, // 这里要和geo下的map同名
          //   coordinateSystem: 'geo',
          //   geoIndex: 1,
          //   zoom: 1.03,
          //   itemStyle: {
          //     normal: {
          //       areaColor: 'rgba(34, 82, 119, 0.9)',
          //       borderColor: 'rgba(34, 82, 119, 0.9)',
          //     },
          //   },
          //   zlevel:-1
          // },
        ],
      },
      true,
    );
    myChart.off('click');
    myChart.on('click', params => {
      // 鼠标点击地图外 还原地图大
      // if (!params.target) {
      //   getQuery();
      // }
      if (params.name in mapCity) {
        setMapVal({ name: params.name, code: mapCity[params.name] });
        getQuery(mapCity[params.name]);
      }
    });
  };

  const handleMap = code => {
    initChart();
    setMapVal({});
  };

  return (
    <div className={styles.map}>
      <div className={styles.map_title}>
        <ul>
          <li onClick={() => handleMap('china')}>全国</li>
          {mapVal?.code ? (
            <li>
              &nbsp;
              <RightOutlined />
              &nbsp;
            </li>
          ) : null}
          {mapVal ? <li> {mapVal?.name}</li> : null}
        </ul>
      </div>
      {/* 海南地图 */}
      <div className={styles.map_main}>
        <div ref={chartDom} style={{ height: '100%', width: '100%' }} />
      </div>
    </div>
  );
};
