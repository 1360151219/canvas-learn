import { Application, Container, Sprite, Text, TextStyle } from 'pixi.js';
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
    // 创建一个文本样式
    const skewStyle = new TextStyle({
      fontFamily: 'Arial',
      dropShadow: true,
      dropShadowAlpha: 0.8,
      dropShadowAngle: 2.1,
      dropShadowBlur: 4,
      dropShadowColor: '0x111111',
      dropShadowDistance: 10,
      fill: ['#ffffff'],
      stroke: '#004620',
      fontSize: 60,
      fontWeight: 'lighter',
      lineJoin: 'round',
      strokeThickness: 12,
    });
    // 创建一个文本类型
    const skewText = new Text('Hello PixiJS', skewStyle);
    // 将文本倾斜
    skewText.skew.set(0.1, -0.1);
    // 定义文本在舞台（app）中的位置
    skewText.x = 10;
    skewText.y = 20;
    // 将文本添加到舞台（app）中
    app.current.stage.addChild(skewText);

    // 创建一个图像精灵
    const container = new Container();
    app.current.stage.addChild(container);
    const luFei = Sprite.from(
      'https://img1.baidu.com/it/u=2082729884,1583333066&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=711'
    );
    // 把精灵的原点设置为图片的中心点
    luFei.anchor.set(0.5);
    // 把精灵缩小0.5倍
    luFei.scale.set(0.5);
    container.addChild(luFei);
    // 把精灵定位在画布的中心
    container.x = app.current.screen.width / 2;
    container.y = app.current.screen.height / 2;
    // 为舞台添加一个更新循环的方法
    app.current.ticker.add(() => {
      // 让图像精灵每次更新旋转0.01度
      container.rotation += 0.01;
    });
  }, []);
  return null;
}
