/* eslint-disable no-return-assign */
/* eslint-disable no-undef */
import React, { useEffect, useRef, useState } from 'react';
import './index.less';

export default ({ children, boxStyle }) => {
  const [isScrolle, setIsScrolle] = useState(true);
  // 滚动速度，值越小，滚动越快
  const speed = 30;
  const warper = useRef();
  const childDom1 = useRef();
  const childDom2 = useRef();

  // 开始滚动

  useEffect(() => {
    childDom2.current.innerHTML = childDom1.current.innerHTML;
    let timer;
    if (isScrolle) {
      timer = setInterval(
        () =>
          warper.current.scrollTop >= childDom1.current.scrollHeight
            ? (warper.current.scrollTop = 0)
            : warper.current.scrollTop ++,
        speed,
      );
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isScrolle]);

  const hoverHandler = flag => setIsScrolle(flag);
  return (
    <div
      className="parent"
      style={{ ...boxStyle }}
      ref={warper}
      onMouseOver={() => hoverHandler(false)}
      onMouseLeave={() => hoverHandler(true)}>
      <div ref={childDom1}>
        {children.map((item, index) =>
          React.createElement(item.type, {
            key: index,

            ...item.props,
          }),
        )}
      </div>
      <div ref={childDom2} />
    </div>
  );
};
