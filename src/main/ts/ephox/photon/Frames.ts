import { Fun } from '@ephox/katamari';
import { Option } from '@ephox/katamari';

import { Navigation } from './Navigation';

const walkUp = <E, D>(navigation: Navigation<E, D>, doc: D): E[] => {
  const frame = navigation.view(doc);
  return frame.fold(Fun.constant([]), (f) => {
    const parent = navigation.owner(f);
    const rest = walkUp(navigation, parent);
    return [f].concat(rest);
  });
};

const pathTo = <E, D>(element: E, navigation: Navigation<E, D>): Option<E[]> => {
  const d = navigation.owner(element);
  const paths = walkUp(navigation, d);
  return Option.some(paths);
};

export {
  pathTo
};