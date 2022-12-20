import { MouseEvent, useEffect, useRef, useState } from 'react';

export default function Index() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const touched = useRef(false);
  const handleClick = (e) => {
    const ctx = canvasRef.current?.getContext('2d');
    const { pageX, pageY } = e;
    touched.current = true;
    ctx?.beginPath();
    ctx?.moveTo(
      pageX - canvasRef.current?.offsetLeft,
      pageY - canvasRef.current?.offsetTop
    );
  };
  const handleMove = (e) => {
    if (!touched.current) return;
    const ctx = canvasRef.current?.getContext('2d');
    const { pageX, pageY } = e;
    ctx?.lineTo(
      pageX - canvasRef.current?.offsetLeft,
      pageY - canvasRef.current?.offsetTop
    );
    ctx?.stroke();
    ctx?.moveTo(
      pageX - canvasRef.current?.offsetLeft,
      pageY - canvasRef.current?.offsetTop
    );
  };
  const handleEnd = (e) => {
    if (!touched.current) return;
    const ctx = canvasRef.current?.getContext('2d');
    touched.current = false;
    ctx?.closePath();
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ textAlign: 'center' }}>签名</h2>
      <canvas
        onMouseDown={handleClick}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        ref={canvasRef}
        id="canvas"
        width="500"
        height="500"
        style={{ borderStyle: 'dotted', borderWidth: '1px' }}
      >
        当前浏览器不支持canvas元素，请升级或更换浏览器！
      </canvas>
    </div>
  );
}
