import Basic from './examples/basic';
import Style from './examples/style';
import Font from './examples/fontImage';
import Transform from './examples/transform';
import Animation1 from './examples/animation1';
import Animation2 from './examples/animation2';
import Event1 from './examples/event1';
import Filter from './examples/filter';
import Sign from './examples/sign';
import Guaguale from './examples/guaguale';
import { useState } from 'react';
import PBasic from './pixi-examples/basic';
import PText from './pixi-examples/text';
import PContainerMask from './pixi-examples/container-mask';
import PGraghics from './pixi-examples/graghics';
export default function App() {
  const [route, setRoute] = useState('pixi');
  return (
    <>
      <button onClick={() => setRoute('canvas')}>Canvas</button>
      <button onClick={() => setRoute('pixi')}>Pixi</button>
      {route === 'canvas' ? (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <Basic />
          <Style />
          <Font />
          <Transform />
          <Animation1 />
          <Animation2 />
          <Event1 />
          <Filter></Filter>
          <Sign></Sign>
          <Guaguale />
        </div>
      ) : null}
      {route === 'pixi' ? (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <PBasic></PBasic>
          <PText></PText>
          <PContainerMask />
          <PGraghics />
        </div>
      ) : null}
    </>
  );
}
