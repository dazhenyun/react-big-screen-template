import React, { useState } from 'react';
import { Button, message } from 'antd';

function CopyLicense({ license }) {
  const [flag, setFlag] = useState(false);

  const onLicense = () => {
    if (flag) {
      // 因为我的input框里面还有button 按钮，所以在选择节点的时候，一定要只选择input
      const copyDOM = document.querySelector('.license'); // 需要复制文字的节点
      const range = document.createRange(); // 创建一个range
      window.getSelection().removeAllRanges(); // 清楚页面中已有的selection
      range.selectNode(copyDOM); // 选中需要复制的节点
      window.getSelection().addRange(range); // 执行选中元素
      const successful = document.execCommand('copy'); // 执行 copy 操作
      if (successful) {
        message.success('复制成功！');
      } else {
        message.warning('复制失败，请手动复制！');
      }
      // 移除选中的元素
      window.getSelection().removeAllRanges();
    } else {
      setFlag(true);
    }
  };
  return (
    <div>
      <span
        style={{ marginRight: '10px', display: flag ? '' : 'none' }}
        className="license"
      >
        {license}
      </span>
      <Button type="link" onClick={onLicense} style={{ padding: '0' }}>
        {flag ? '复制' : '查看'}
      </Button>
    </div>
  );
}

export default CopyLicense;
