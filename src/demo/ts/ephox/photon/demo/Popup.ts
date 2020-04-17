import { Css, Position } from '@ephox/sugar';
import { Element } from '@ephox/sugar';

export default function (position: Position) {
  const popup = Element.fromTag('div');
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