(function (root, factory) {
  factory(exports, require('echarts/lib/echarts'));
}(this, (exports, echarts) => {
  const log = function (msg) {
    if (typeof console !== 'undefined') {
      console && console.error && console.error(msg);
    }
  };
  if (!echarts) {
    log('ECharts is not Loaded');
    return;
  }
  const contrastColor = '#eee';
  const axisCommon = function () {
    return {
      axisLine: {
        lineStyle: {
          color: contrastColor
        }
      },
      axisTick: {
        lineStyle: {
          color: contrastColor
        }
      },
      axisLabel: {
        textStyle: {
          color: contrastColor
        }
      },
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: '#aaa'
        }
      },
      splitArea: {
        areaStyle: {
          color: contrastColor
        }
      }
    };
  };

  const colorPalette = ['#02F1FA', '#9931FE', '#FABA25', '#49A5FE', '#FC4C84', '#336DB5', '#41C365', '#DD99E9', '#EEB468', '#30ABE3', '#02F1FA', '#ADF27B'];
  const theme = {
    color: colorPalette,
    backgroundColor: '#333',
    tooltip: {
      axisPointer: {
        lineStyle: {
          color: contrastColor
        },
        crossStyle: {
          color: contrastColor
        }
      }
    },
    legend: {
      top: 10,
      right: 10,
      textStyle: {
        color: contrastColor
      }
    },
    textStyle: {
      color: contrastColor
    },
    title: {
      top: 5,
      left: 'center',
      textStyle: {
        color: contrastColor
      }
    },
    toolbox: {
      iconStyle: {
        normal: {
          borderColor: contrastColor
        }
      }
    },
    dataZoom: {
      textStyle: {
        color: contrastColor
      }
    },
    timeline: {
      lineStyle: {
        color: contrastColor
      },
      itemStyle: {
        normal: {
          color: colorPalette[1]
        }
      },
      label: {
        normal: {
          textStyle: {
            color: contrastColor
          }
        }
      },
      controlStyle: {
        normal: {
          color: contrastColor,
          borderColor: contrastColor
        }
      }
    },
    timeAxis: axisCommon(),
    logAxis: axisCommon(),
    valueAxis: axisCommon(),
    categoryAxis: axisCommon(),

    line: {
      symbol: 'circle'
    },
    graph: {
      color: colorPalette
    },
    gauge: {
      title: {
        textStyle: {
          color: contrastColor
        }
      }
    },
    candlestick: {
      itemStyle: {
        normal: {
          color: '#FD1050',
          color0: '#0CF49B',
          borderColor: '#FD1050',
          borderColor0: '#0CF49B'
        }
      }
    },
    grid: {
      top: 45,
      left: 30,
      right: 30,
      bottom: 10,
      containLabel: true
    },
  };
  theme.categoryAxis.splitLine.show = false;
  echarts.registerTheme('dark', theme);
}));