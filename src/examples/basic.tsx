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
      ctx?.beginPath();
      ctx?.moveTo(0, 0);
      // 直线&三角形
      ctx?.lineTo(100, 100);
      ctx?.lineTo(0, 100);
      ctx?.lineTo(0, 0);
      ctx?.stroke();
      ctx?.closePath();
      // 矩形
      ctx?.strokeRect(100, 100, 200, 100);
      ctx?.fillRect(0, 300, 30, 30);
      ctx?.clearRect(50, 50, 100, 100);
      // 圆弧
      ctx?.beginPath();
      ctx?.arc(400, 60, 60, 0, 2 * Math.PI, false);
      ctx?.fill();
      ctx?.closePath();
      // 椭圆
      ctx?.beginPath();
      ctx?.ellipse(250, 250, 30, 100, DEGREE * 30, 0, 360 * DEGREE, false);
      ctx?.fill();
      ctx?.closePath();
      // 贝塞尔曲线
      ctx?.beginPath();
      ctx?.moveTo(0, 400);
      ctx?.quadraticCurveTo(150, 500, 300, 400);
      ctx?.stroke();
    }
  }, []);
  return (
    <div>
      <h2 style={{ textAlign: 'center' }} className="a">
        基础用法
      </h2>
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
