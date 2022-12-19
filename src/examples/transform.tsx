import { useEffect, useRef } from 'react';
const DEGREE = Math.PI / 180;
export default function Index() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    const canvas = canvasRef.current;
    if (canvas && canvas?.getContext) {
      // 获取绘图上下文
      var ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.fillStyle = 'red';
      // 旋转
      ctx.save();
      ctx.rotate(DEGREE * 45);
      ctx.fillRect(0, 0, 100, 100);
      ctx.restore();

      // 平移
      ctx.save();
      ctx.translate(80, 45);
      ctx.fillRect(0, 0, 100, 100);
      ctx.restore();
      // 缩放
      ctx.save();
      ctx.scale(0.3, 1);
      ctx.fillRect(0, 200, 100, 100);
      ctx.restore();

      ctx.restore();
      ctx.beginPath();
      // ctx.globalCompositeOperation = 'source-over';
      // ctx.globalCompositeOperation = 'source-in';
      // ctx.globalCompositeOperation = 'source-out';
      // ctx.globalCompositeOperation = 'source-atop';
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      ctx.fillRect(200, 100, 300, 150);
      ctx.fillStyle = 'rgba(0, 255, 0, 1)';
      ctx.fillRect(200, 150, 150, 250);
      ctx.fillStyle = 'rgba(0, 0, 255, 1)';
      ctx.fillRect(250, 200, 150, 150);

      // 裁剪
      ctx.arc(80, 340, 200, 0, 360 * DEGREE, false);
      ctx.clip();
      var img = new Image();
      img.src =
        'https://img2.baidu.com/it/u=1395980100,2999837177&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1671469200&t=612c843d60c987f19081787754b94b7b';
      img.onload = () => {
        ctx?.drawImage(img, 0, 360, 300, 300);
        ctx?.closePath();
      };
    }
  }, []);
  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>变形</h2>
      <canvas
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
