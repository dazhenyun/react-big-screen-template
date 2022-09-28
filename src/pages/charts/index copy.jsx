/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useRef, useEffect, useState } from 'react';

import { getGeoJson } from '@/services/map';
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
import chinaJson from '@/utils/bmap/china.json';
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
  // 需要渲染地图的Dom
  const chartDom = useRef();

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

  const initChart = async () => {
    debugger;
    myChart = echarts.init(chartDom.current);
    const allCode = await getGeoJson('all');
    initEcharts(chinaJson, '全国', myChart, allCode);
    // window.addEventListener('resize', () => {
    //   myChart.resize();
    // });
  };

  const initEcharts = (geoJSON, name, chart, allCode) => {
    // echarts.registerMap(name, geoJSON);
    const options = {
      title: {
        text: name,
        left: 'center'
      },
      series: [
        {
          name: name,
          type: 'map',
          mapType: name,
          coordinateSystem: 'geo',
          itemStyle: {
            areaColor: '#87CEFA',
            borderColor: '#009DFF',
            borderType: 'dotted',
          },
          data,
        },
      ],
    };
    chart.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{b}'
      },
      series: [
        {
          name: '中国',
          type: 'map',
          mapType: 'china',
          selectedMode : 'multiple',
          label: {
            normal: {
              show: true
            },
            emphasis: {
              show: true
            }
          },
          data:[
            { name:'广东', selected:true }
          ]
        }
      ]
    });
    // chart.off('click');
    // chart.on('click', (params) => {
    //   const { level, adcode } =
    //     allCode.filter((el) => el.name === params.name)[0] || {};
    //   if (level === 'district') return;
    //   getGeoJson(adcode + '_full')
    //     .then((json) => initEcharts(json, params.name, chart, allCode))
    //     .catch((err) => {
    //       getGeoJson('all').then((json) =>
    //         initEcharts(json, '全国', chart, allCode)
    //       );
    //     });
    // });
  };

  return (
    <div className={styles.map}>
      <div className="normal-box">
        <div className="title">各县市专场</div>
        {/* 海南地图 */}
        <div className={styles.map_main}>
          <div ref={chartDom} style={{ height: '100%', width: '100%' }} />
        </div>
      </div>
    </div>
  );
};
