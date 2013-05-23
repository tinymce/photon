define(
  'ephox.photon.demo.PhotonDemo',

  [
    'ephox.photon.OuterPosition',
    'ephox.photon.Reader',
    'ephox.photon.demo.Popup',
    'ephox.sugar.api.Css',
    'ephox.sugar.api.Element',
    'ephox.sugar.api.Event',
    'ephox.sugar.api.Insert',
    'ephox.sugar.api.SelectorFind'
  ],

  function (OuterPosition, Reader, Popup, Css, Element, Event, Insert, SelectorFind) {
    return function () {
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
        left: 200,
        position: 'absolute'
      });

      Event.bind(f1, 'load', function () {
        var doc1 = Reader.doc(f1);
        var c1 = SelectorFind.descendant(doc1, 'body');

        var button = Element.fromTag('button');
        Css.set(button, 'float', 'right');

        var f2 = frame();
        Css.setAll(f2, {
          left: 50,
          top: 150,
          position: 'absolute'
        });

        Event.bind(f2, 'load', function () {
          var c2 = SelectorFind.descendant(Reader.doc(f2), 'body');

          Event.bind(button, 'click', function () {
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
          Event.bind(firstButton, 'click', function () {
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
        height: 500
      });

      var blob = document.getElementById('ephox-ui');
      var blobElement = Element.fromDom(blob);
      Insert.append(blobElement, container);
    };
  }
);
