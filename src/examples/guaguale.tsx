import { MouseEvent, useEffect, useRef, useState } from 'react';

export default function Index() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const touched = useRef(false);
  const src =
    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20160909%2Feca561d1ecce4fcab4f600a74f15b221_th.jpeg&refer=http%3A%2F%2Fimg.mp.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1672410563&t=65c34c7d49a899c2f2a3c0f99827312f';
  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    const img = new Image();
    img.crossOrigin = '';
    img.src = src;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, 500, 500);
      ctx.globalCompositeOperation = 'destination-out';
    };
  }, []);
  const handleClick = (e) => {
    const ctx = canvasRef.current?.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 50;
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
