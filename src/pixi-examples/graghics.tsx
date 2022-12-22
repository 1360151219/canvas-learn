import {
  Application,
  Container,
  Sprite,
  Text,
  TextStyle,
  Graphics,
} from 'pixi.js';
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
    const template = new Graphics();
    template.lineStyle({ color: 0x7a007e, width: 10 });
    template.beginFill(0x7e7e7e);
    template.drawCircle(100, 150, 50);
    template.endFill();

    const duplication = new Graphics(template.geometry);
    app.current.stage.addChild(template);
    app.current.stage.addChild(duplication);
    template.destroy();
    app.current.ticker.add((delta) => {});
  }, []);
  return null;
}
