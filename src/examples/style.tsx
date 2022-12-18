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
      ctx?.beginPath();
      ctx.lineWidth = 30;
      ctx?.moveTo(10, 0);
      ctx?.lineTo(10, 200);
      ctx?.stroke();
      ctx?.closePath();

      ctx?.beginPath();
      ctx.lineWidth = 20;
      ctx.lineCap = 'round';
      ctx?.moveTo(50, 0);
      ctx?.lineTo(50, 200);
      ctx?.stroke();
      ctx?.closePath();

      ctx?.beginPath();
      ctx.lineWidth = 10;
      ctx.lineCap = 'square';
      ctx.lineJoin = 'round';
      ctx?.moveTo(100, 0);
      ctx?.lineTo(80, 40);
      ctx?.lineTo(120, 80);
      ctx?.lineTo(100, 120);
      ctx?.stroke();
      ctx?.closePath();

      ctx?.beginPath();
      ctx.lineWidth = 10;
      ctx.lineCap = 'square';
      ctx.lineJoin = 'bevel';
      ctx?.moveTo(160, 0);
      ctx?.lineTo(140, 40);
      ctx?.lineTo(180, 80);
      ctx?.lineTo(160, 120);
      ctx?.stroke();
      ctx?.closePath();

      ctx?.beginPath();
      ctx.lineWidth = 5;
      ctx.lineCap = 'square';
      ctx.miterLimit = 100;
      ctx.moveTo(400, 0);
      for (let i = 0; i < 30; i++) {
        let dx = i % 2 == 0 ? 380 : 420;
        ctx.lineTo(dx, Math.pow(i, 1.5) * 2);
      }
      ctx?.stroke();
      ctx?.closePath();
      // 虚线
      ctx?.beginPath();
      ctx.setLineDash([1, 20, 30]);
      console.log(ctx.getLineDash());
      ctx?.moveTo(300, 0);
      ctx?.lineTo(300, 200);
      ctx?.stroke();
      ctx?.closePath();

      // 透明度
      ctx?.beginPath();
      ctx.arc(100, 300, 50, 0, DEGREE * 360);
      ctx.globalAlpha = 0.2;
      ctx?.fill();
      ctx?.closePath();

      ctx?.beginPath();
      ctx.fillStyle = 'rgba(182, 32, 32, 0.9)';
      ctx.arc(150, 300, 80, 0, DEGREE * 360);
      ctx?.fill();
      ctx?.closePath();

      // 渐变
      ctx.globalAlpha = 1;
      ctx.beginPath();
      let g = ctx.createLinearGradient(0, 420, 300, 420);
      g.addColorStop(0, 'red');
      g.addColorStop(1, 'green');
      ctx.fillStyle = g;
      ctx.fillRect(0, 420, 300, 80);
      ctx.closePath();

      ctx.beginPath();
      var gg = ctx.createRadialGradient(420, 420, 200, 500, 500, 10);
      gg.addColorStop(0, '#ff770f');
      gg.addColorStop(1, '#ffffff');
      ctx.fillStyle = gg;
      ctx.fillRect(300, 420, 200, 80);
      ctx.closePath();

      ctx.beginPath();
      var img = new Image();
      img.src =
        'https://img2.baidu.com/it/u=1395980100,2999837177&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1671469200&t=612c843d60c987f19081787754b94b7b';
      img.onload = () => {
        var ptrn = ctx?.createPattern(img, 'repeat');
        ctx.fillStyle = ptrn;
        ctx?.fillRect(300, 300, 100, 100);
        ctx?.closePath();
      };
    }
  }, []);
  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>绘制样式</h2>
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
