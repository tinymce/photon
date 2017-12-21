import { Css } from '@ephox/sugar';
import { Element } from '@ephox/sugar';



export default <any> function (position) {
  var popup = Element.fromTag('div');
  Css.setAll(popup, {
    position: 'absolute',
    left: position.left() + 'px',
    top: position.top() + 'px',
    width: '100px',
    height: '50px',
    'background-color': 'black'
  });
  return popup;
};