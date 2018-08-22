import { document } from '@ephox/dom-globals';
import { Css, DomEvent, Element, Insert, SelectorFind } from '@ephox/sugar';
import Popup from 'ephox/photon/demo/Popup';
import OuterPosition from 'ephox/photon/OuterPosition';
import Reader from 'ephox/photon/Reader';

var container = Element.fromTag('div');

var frame = function () {
  var r = Element.fromTag('iframe');
  Css.set(r, 'src', '#s' + Math.random());
  return r;
};

var f1 = frame();
Css.setAll(f1, {
  width: '800px',
  height: '450px',
  left: '200px',
  position: 'absolute'
});

DomEvent.bind(f1, 'load', function () {
  var doc1 = Reader.doc(f1);
  var c1 = SelectorFind.descendant(doc1, 'body');

  var button = Element.fromTag('button');
  Css.set(button, 'float', 'right');

  var f2 = frame();
  Css.setAll(f2, {
    left: '50px',
    top: '150px',
    position: 'absolute'
  });

  DomEvent.bind(f2, 'load', function () {
    var c2 = SelectorFind.descendant(Reader.doc(f2), 'body');

    DomEvent.bind(button, 'click', function () {
      var doc = Element.fromDom(document);
      var position = OuterPosition.find(button);
      var popup = Popup(position);
      Insert.append(Element.fromDom(document.body), popup);
    });

    c2.each(function (cc) {
      Insert.append(cc, button);
    });
  });

  c1.each(function (cc) {
    Insert.append(cc, f2);

    var firstButton = Element.fromTag('button');
    DomEvent.bind(firstButton, 'click', function () {
      var doc = Element.fromDom(document);
      var position = OuterPosition.find(firstButton);
      var popup = Popup(position);
      Insert.append(Element.fromDom(document.body), popup);
    });
    Insert.append(cc, firstButton);
  });
});

Insert.append(container, f1);
Css.setAll(container, {
  height: '500px'
});

var blob = document.getElementById('ephox-ui');
var blobElement = Element.fromDom(blob);
Insert.append(blobElement, container);
