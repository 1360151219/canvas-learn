import { Application, Sprite } from 'pixi.js';
import { useEffect, useRef } from 'react';
export default function Index() {
  const app = useRef<Application>();
  useEffect(() => {
    app.current = new Application({
      width: 540,
      height: 360,
      backgroundColor: 0x1099bb,
    });
    document.querySelector('#root')?.appendChild(app.current.view as any);
    let sprite = Sprite.from(
      'https://img2.baidu.com/it/u=1395980100,2999837177&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1671469200&t=612c843d60c987f19081787754b94b7b'
    );
    app.current.stage.addChild(sprite);
    let elapsed = 0.0;
    // Tell our application's ticker to run a new callback every frame, passing
    // in the amount of time that has passed since the last tick
    // delta：每帧的时间间隔
    app.current.ticker.add((delta) => {
      // Add the time to our total elapsed time
      elapsed += delta;
      // Update the sprite's X position based on the cosine of our elapsed time.  We divide
      // by 50 to slow the animation down a bit...
      sprite.x = 100.0 + Math.cos(elapsed / 50.0) * 100.0;
    });
  }, []);
  return null;
}
