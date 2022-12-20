import Basic from './examples/basic';
import Style from './examples/style';
import Font from './examples/fontImage';
import Transform from './examples/transform';
import Animation1 from './examples/animation1';
import Animation2 from './examples/animation2';
import Event1 from './examples/event1';
import Filter from './examples/filter';
import Sign from './examples/sign'
export default function App() {
  return (
    <>
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
      </div>
    </>
  );
}
