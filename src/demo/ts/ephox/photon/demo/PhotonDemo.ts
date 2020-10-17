import { Css, DomEvent, Insert, SelectorFind, SugarBody, SugarElement } from '@ephox/sugar';
import Popup from 'ephox/photon/demo/Popup';
import * as OuterPosition from 'ephox/photon/OuterPosition';
import * as Reader from 'ephox/photon/Reader';

const container = SugarElement.fromTag('div');

const frame = function () {
  const r = SugarElement.fromTag('iframe');
  Css.set(r, 'src', '#s' + Math.random());
  return r;
};

const f1 = frame();
Css.setAll(f1, {
  width: '800px',
  height: '450px',
  left: '200px',
  position: 'absolute'
});

DomEvent.bind(f1, 'load', function () {
  const doc1 = Reader.doc(f1);
  const c1 = SelectorFind.descendant(doc1, 'body');

  const button = SugarElement.fromTag('button');
  Css.set(button, 'float', 'right');

  const f2 = frame();
  Css.setAll(f2, {
    left: '50px',
    top: '150px',
    position: 'absolute'
  });

  DomEvent.bind(f2, 'load', function () {
    const c2 = SelectorFind.descendant(Reader.doc(f2), 'body');

    DomEvent.bind(button, 'click', function () {
      const position = OuterPosition.find(button);
      const popup = Popup(position);
      Insert.append(SugarElement.fromDom(document.body), popup);
    });

    c2.each(function (cc) {
      Insert.append(cc, button);
    });
  });

  c1.each(function (cc) {
    Insert.append(cc, f2);

    const firstButton = SugarElement.fromTag('button');
    DomEvent.bind(firstButton, 'click', function () {
      const position = OuterPosition.find(firstButton);
      const popup = Popup(position);
      Insert.append(SugarElement.fromDom(document.body), popup);
    });
    Insert.append(cc, firstButton);
  });
});

Insert.append(container, f1);
Css.setAll(container, {
  height: '500px'
});

const blob = SelectorFind.descendant(SugarBody.body(), '#ephox-ui').getOrDie();
Insert.append(blob, container);
