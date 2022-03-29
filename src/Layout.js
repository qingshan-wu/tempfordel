import React, { useEffect, useState, useRef } from 'react'
import './Layout.css';

function Layout({ children, splitPercent = 0.8 }) {
  const [h1, setH1] = useState(0)
  const [h2, setH2] = useState(0)
  const layoutEl = useRef(null)
  const sliderEl = useRef(null)

  useEffect(() => {
    let sliderNode = sliderEl.current
    let layoutNode = layoutEl.current
    if (sliderNode && layoutNode) {
      let layoutHeight = layoutNode.offsetHeight
      let y1 = layoutHeight * splitPercent
      let y2 = layoutHeight * (1 - splitPercent)
      setH1(y1)
      setH2(y2)
      const onMousedown = (e) => {
        const firstY = e.clientY
        // 文档的鼠标点击拖动事件
        console.log(firstY)
        document.onmousemove = (e) => {
          const distance = e.clientY - firstY
          setH1((prev) => prev + distance)
          setH2((prev) => prev - distance)
        }
        // 在布局内鼠标松开事件
        layoutNode.onmouseup = () => {
          document.onmousemove = null
        }
      }
      // slider的鼠标按下事件
      sliderNode.addEventListener('mousedown', onMousedown)
      return sliderNode.removeEventListener('mousedown', onMousedown)
    }
  }, [])


  return (
    <div className="layout" ref={layoutEl}>
      <div className='horizontal' ref={sliderEl} style={{ top: h1 - 2 }}></div>
      <div className='split-view' style={{ height: h1, top: 0 }}>
        {children[0]}
      </div>
      <div className='split-view' style={{ top: h1, height: h2, bottom: 0 }}>
        {children[1]}
      </div>
    </div>
  );
}

export default Layout;
