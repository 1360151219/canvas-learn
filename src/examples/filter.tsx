import { useEffect, useRef, MouseEvent, useState } from 'react';
const DEGREE = Math.PI / 180;
export default function Index() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const img = useRef<HTMLImageElement>();
  const [color, setColor] = useState('');
  useEffect(() => {
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    const canvas = canvasRef.current;
    if (canvas && canvas?.getContext) {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      img.current = new Image();
      img.current.crossOrigin = 'anonymous';
      img.current.src =
        'https://img1.baidu.com/it/u=4141276181,3458238270&fm=253&fmt=auto&app=138&f=JPEG';
      img.current.onload = function () {
        ctx.drawImage(img.current!, 0, 0, 450, 750);
      };
    }
  }, []);
  const restore = () => {
    const ctx = canvasRef.current?.getContext('2d');
    ctx?.drawImage(img.current!, 0, 0, 450, 750);
  };
  const blackWhite = () => {
    const ctx = canvasRef.current?.getContext('2d');
    ctx?.drawImage(img.current!, 0, 0, 450, 750);
    const imageData = ctx?.getImageData(0, 0, 450, 750);
    if (!imageData) return;
    const { data } = imageData;
    console.log(imageData);
    for (let i = 0; i < data.length; i += 4) {
      // @ts-ignore
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = avg;
      data[i + 1] = avg;
      data[i + 2] = avg;
    }
    ctx?.putImageData(imageData, 0, 0);
  };
  const opposition = () => {
    const ctx = canvasRef.current?.getContext('2d');
    ctx?.drawImage(img.current!, 0, 0, 450, 750);
    const imageData = ctx?.getImageData(0, 0, 450, 750);
    if (!imageData) return;
    const { data } = imageData;
    console.log(imageData);
    for (let i = 0; i < data.length; i += 4) {
      // @ts-ignore
      data[i] = 255 - data[i];
      data[i + 1] = 255 - data[i + 1];
      data[i + 2] = 255 - data[i + 2];
    }
    ctx?.putImageData(imageData, 0, 0);
  };
  const handleMove = (e: MouseEvent<HTMLCanvasElement>) => {
    const { clientX, pageY } = e;
    const ctx = canvasRef.current?.getContext('2d');
    const imageData = ctx?.getImageData(
      clientX - canvasRef.current?.offsetLeft,
      pageY - canvasRef.current?.offsetTop,
      1,
      1
    );
    const data = imageData?.data;
    const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
    setColor(rgba);
  };
  return (
    <div>
      <h2
        style={{
          textAlign: 'center',
          color: color ? '#fff' : '#000',
          backgroundColor: color,
        }}
      >
        滤镜+拾色器
      </h2>
      <button onClick={restore}>还原</button>
      <button onClick={blackWhite}>黑白</button>
      <button onClick={opposition}>反相</button>
      <canvas
        ref={canvasRef}
        onMouseMove={handleMove}
        id="canvas"
        width="450"
        height="750"
        style={{ borderStyle: 'dotted', borderWidth: '1px' }}
      >
        当前浏览器不支持canvas元素，请升级或更换浏览器！
      </canvas>
    </div>
  );
}
