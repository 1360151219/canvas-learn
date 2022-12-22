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

    // Create window frame
    let frame = new Graphics();
    frame.beginFill(0x666666);
    frame.lineStyle({ color: 0xffffff, width: 4, alignment: 0 });
    frame.drawRect(0, 0, 208, 208);
    frame.position.set(320 - 104, 180 - 104);
    app.current.stage.addChild(frame);

    // Create a graphics object to define our mask
    let mask = new Graphics();
    // Add the rectangular area to show
    mask.beginFill(0x000);
    mask.drawRect(0, 0, 200, 200);
    mask.endFill();

    const container = new Container();
    // 放置遮罩在上面
    container.mask = mask;
    container.addChild(mask);
    // Offset by the window's frame width
    container.position.set(4, 4);
    // And add the container to the window!
    frame.addChild(container);
    // Create contents for the masked container
    let text = new Text(
      'This text will scroll up and be masked, so you can see how masking works.  Lorem ipsum and all that.\n\n' +
        'You can put anything in the container and it will be masked!',
      {
        fontSize: 24,
        fill: 0x1010ff,
        wordWrap: true,
        wordWrapWidth: 180,
      }
    );
    text.x = 10;
    container.addChild(text);
    // Add a ticker callback to scroll the text up and down
    let elapsed = 0.0;
    app.current.ticker.add((delta) => {
      // Update the text's y coordinate to scroll it
      elapsed += delta;
      text.y = 10 + -100.0 + Math.cos(elapsed / 50.0) * 100.0;
    });
  }, []);
  return null;
}
