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
      // 避免背景图遮盖
      ctx.globalCompositeOperation = 'destination-over';
      var sun = new Image();
      var moon = new Image();
      var earth = new Image();
      sun.src = 'https://img.lovepik.com/element/40097/4339.png_300.png';
      moon.src =
        'https://www.freepnglogos.com/uploads/moon-png/moon-png-annual-celestial-overview-simone-matthews-18.png';
      earth.src =
        'https://hbimg.b0.upaiyun.com/52f6acb53224d3e681933b3dbec668a660438e8e2e41a-QfFIff_fw658';

      const draw = () => {
        if (!ctx) return;
        ctx.clearRect(0, 0, 500, 500);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.strokeStyle = 'rgba(0, 153, 255, 0.8)';
        ctx.save(); // 第一次保存画布状态
        ctx.translate(250, 250); // 把原心移到画布中间
        var time = new Date();
        var earthDeg =
          ((2 * Math.PI) / 60) * time.getSeconds() +
          ((2 * Math.PI) / 60000) * time.getMilliseconds();
        ctx.rotate(earthDeg);
        ctx.translate(200, 0);
        // 以当前点为原点，因此要先向移动负的一半的距离
        ctx.drawImage(earth, -20, -20, 40, 40);

        ctx.save(); // 第二次保存画布状态
        var moonDeg =
          ((2 * Math.PI) / 3) * time.getSeconds() +
          ((2 * Math.PI) / 3000) * time.getMilliseconds();
        ctx.rotate(moonDeg);
        ctx.translate(0, 40);
        ctx.drawImage(moon, -7.5, -7.5, 15, 15);
        ctx.restore();
        ctx.restore();
        // // 画一个地球运行的轨迹
        ctx.beginPath();
        ctx.arc(250, 250, 200, 0, Math.PI * 2, false);
        ctx.stroke();
        // 画一个太阳
        ctx.drawImage(sun, 0, 0, 500, 500);

        window.requestAnimationFrame(draw);
      };
      window.requestAnimationFrame(draw);
    }
  }, []);
  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>动画--公转</h2>
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
