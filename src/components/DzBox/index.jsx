import React from 'react';
import './index.less';

export default ({ title, children, boxStyle }) => {
  return (
    <div className="box" style={{ ...boxStyle }}>
      <div className="box_title">{title}</div>
      <div className="box_main">{children}</div>
    </div>
  );
};
