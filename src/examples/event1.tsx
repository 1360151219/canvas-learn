import { MouseEvent, useEffect, useRef, useState } from 'react';
const DEGREE = Math.PI / 180;
class Ball {
  x: number;
  y: number;
  radius: number;
  color: string;
  v: number;
  constructor() {
    this.x = 30;
    this.y = 30;
    this.v = 10;
    this.radius = 30;
    this.color = 'blue';
  }
  isInside({ x, y }: { x: number; y: number }) {
    return (
      Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2)) < this.radius
    );
  }
  draw(ctx: CanvasRenderingContext2D, x = 0, y = 0) {
    ctx.beginPath();
    this.x += x;
    this.y += y;
    // console.log(x, y, '当前坐标===', this.x, this.y);
    ctx.arc(this.x, this.y, this.radius, 0, DEGREE * 360);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
  up(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, 500, 500);
    this.draw(ctx, 0, -this.v);
  }
  down(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, 500, 500);
    this.draw(ctx, 0, this.v);
  }
  left(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, 500, 500);
    this.draw(ctx, -this.v, 0);
  }
  right(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, 500, 500);
    this.draw(ctx, this.v, 0);
  }
}
export default function Index() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const preCoordinate = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const touched = useRef(false);
  // let clickCoordinate = { x: 0, y: 0 };
  const ball = new Ball();
  const handleKeydown = (e: KeyboardEvent, ctx: CanvasRenderingContext2D) => {
    switch (e.key) {
      case 'ArrowUp': {
        e.preventDefault();
        ball.up(ctx);
        break;
      }
      case 'ArrowRight': {
        e.preventDefault();
        ball.right(ctx);
        break;
      }
      case 'ArrowDown': {
        e.preventDefault();
        ball.down(ctx);
        break;
      }
      case 'ArrowLeft': {
        e.preventDefault();
        ball.left(ctx);
        break;
      }
    }
  };
  const handleStart = (
    e: MouseEvent<HTMLCanvasElement>,
    ctx: CanvasRenderingContext2D
  ) => {
    const { pageX, pageY, target } = e;
    // clickCoordinate.x = pageX - target?.offsetLeft;
    // clickCoordinate.y = pageY - target?.offsetTop;
    preCoordinate.current = {
      x: pageX,
      y: pageY,
    };
    const clickCoordinate = {
      x: pageX - target.offsetLeft,
      y: pageY - target.offsetTop,
    };
    if (ball.isInside(clickCoordinate)) {
      touched.current = true;
      canvasRef.current?.addEventListener('mousemove', (e) =>
        handleMove(e, ctx)
      );
      canvasRef.current?.addEventListener('mouseup', (e) => handleEnd(e, ctx));
    }
  };
  const handleMove = (
    e: MouseEvent<HTMLCanvasElement>,
    ctx: CanvasRenderingContext2D
  ) => {
    if (touched.current) {
      const { pageX, pageY } = e;
      const translate = {
        x: pageX - preCoordinate.current.x,
        y: pageY - preCoordinate.current.y,
      };
      preCoordinate.current = {
        x: pageX,
        y: pageY,
      };
      ctx.clearRect(0, 0, 500, 500);
      ball.draw(ctx, translate.x, translate.y);
    }
  };
  const handleEnd = (
    e: MouseEvent<HTMLCanvasElement>,
    ctx: CanvasRenderingContext2D
  ) => {
    if (touched.current) {
      touched.current = false;
      canvasRef.current?.removeEventListener('mousemove', (e) =>
        handleMove(e, ctx)
      );
      canvasRef.current?.removeEventListener('mouseup', (e) =>
        handleEnd(e, ctx)
      );
    }
  };
  useEffect(() => {
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    const canvas = canvasRef.current;
    if (canvas && canvas?.getContext) {
      // 获取绘图上下文
      var ctx = canvas.getContext('2d');
      if (!ctx) return;
      ball.draw(ctx);
      window.addEventListener('keydown', (e) => handleKeydown(e, ctx!));
      window.addEventListener('mousedown', (e) => handleStart(e, ctx!));
    }
  }, []);
  // 保存图片
  const saveToImg = (e) => {
    const url = canvasRef.current?.toDataURL('image/webp');
    const urlSplit = url?.split(',')!;
    const mime = urlSplit[0]?.match(/:(.*);/)![1];

    const data = atob(urlSplit[1]!);
    let n = data.length;
    let u8Arr = new Uint8Array(n);
    while (n--) {
      u8Arr[n] = data.charCodeAt(n);
    }
    // 通过以下方式将以上变量生成文件对象，三个参数分别为文件内容、文件名、文件类型
    let file = new File([u8Arr], 'filename', { type: mime });
    // 将文件对象通过a标签下载
    let aDom = document.createElement('a'); // 创建一个 a 标签
    aDom.download = file.name; // 设置文件名
    let href = URL.createObjectURL(file); // 将file对象转成 UTF-16 字符串
    aDom.href = href; // 放入href
    document.body.appendChild(aDom); // 将a标签插入 body
    aDom.click(); // 触发 a 标签的点击
    document.body.removeChild(aDom); // 移除刚才插入的 a 标签
    URL.revokeObjectURL(href); // 释放刚才生成的 UTF-16 字符串
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ textAlign: 'center' }}>键盘+拖拽事件、图片保存</h2>
      <button style={{ padding: '12px' }} onClick={saveToImg}>
        点击保存
      </button>
      {/* <img src={imgSrc} alt="" /> */}
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
