import Basic from './examples/basic';
import Style from './examples/style';
import Font from './examples/font';
export default function App() {
  return (
    <>
      <div style={{ display: 'flex' }}>
        <Basic />
        <Style />
        <Font></Font>
      </div>
    </>
  );
}
