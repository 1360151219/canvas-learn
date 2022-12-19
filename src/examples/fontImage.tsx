import { useEffect, useRef } from 'react';
export default function Index() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    const canvas = canvasRef.current;
    if (canvas && canvas?.getContext) {
      // 获取绘图上下文
      var ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.beginPath();
      ctx.save();
      ctx.shadowOffsetX = 10;
      ctx.shadowOffsetY = 10;
      ctx.shadowBlur = 5;
      ctx.shadowColor = '#cccccc'; //  设置阴影颜色
      ctx.font = '50px arial';
      ctx?.strokeText('Hello World', 50, 50);
      ctx?.fillText('Hello World', 50, 100);
      ctx.closePath();
      ctx.restore();
      var img = new Image();
      img.src =
        'https://img2.baidu.com/it/u=1395980100,2999837177&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1671469200&t=612c843d60c987f19081787754b94b7b';
      img.onload = () => {
        ctx?.drawImage(img, 0, 150, 200, 150);
        ctx?.drawImage(img, 200, 100, 300, 300, 200, 200, 300, 300);
      };
    }
  }, []);
  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>文字和图片</h2>
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
