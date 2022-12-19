import Basic from './examples/basic';
import Style from './examples/style';
import Font from './examples/fontImage';
import Transform from './examples/transform';
import Animation1 from './examples/animation1';
import Animation2 from './examples/animation2';
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
      </div>
    </>
  );
}
