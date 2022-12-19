import { useEffect, useRef } from 'react';
const DEGREE = Math.PI / 180;
class Ball {
  x: number;
  y: number;
  radius: number;
  color: string;
  vx: number;
  vy: number;
  constructor() {
    this.x = 100;
    this.y = 100;
    this.vx = 1;
    this.vy = 3;
    this.radius = 30;
    this.color = 'blue';
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, DEGREE * 360);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
  aniation(ctx: CanvasRenderingContext2D) {
    // ctx.clearRect(0, 0, 500, 500);
    // 拖尾效果：利用透明度来实现
    ctx.fillStyle = 'rgba(255,255,255,.4)';
    ctx.fillRect(0, 0, 500, 500);
    // 加速度：模拟先加速后减速的效果（小的时候加速 大的时候减速）
    this.vy *= 0.99;
    this.vy += 0.25;
    // 匀速
    this.x += this.vx;
    this.y += this.vy;

    // 反弹
    if (this.x + this.vx >= 500 || this.x + this.vx <= 0) {
      this.vx = -this.vx;
    }
    if (this.y + this.vy >= 500 || this.y + this.vy <= 0) {
      this.vy = -this.vy;
    }
    this.draw(ctx);
    window.requestAnimationFrame(() => this.aniation(ctx));
  }
}
export default function Index() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    const canvas = canvasRef.current;
    if (canvas && canvas?.getContext) {
      // 获取绘图上下文
      var ctx = canvas.getContext('2d');
      if (!ctx) return;
      const ball = new Ball();
      window.requestAnimationFrame(() => ball.aniation(ctx!));
    }
  }, []);
  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>动画--自由落体</h2>
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
