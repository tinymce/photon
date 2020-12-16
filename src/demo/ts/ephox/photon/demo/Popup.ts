import { Css, SugarElement, SugarPosition } from '@ephox/sugar';

export default (position: SugarPosition): SugarElement<HTMLDivElement> => {
  const popup = SugarElement.fromTag('div');
  Css.setAll(popup, {
    'position': 'absolute',
    'left': position.left + 'px',
    'top': position.top + 'px',
    'width': '100px',
    'height': '50px',
    'background-color': 'black'
  });
  return popup;
};