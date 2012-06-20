define(
  'ephox.photon.demo.PhotonDemo',

  [
    'ephox.wrap.JQuery',
    'ephox.compass.Arr',
    'ephox.photon.Frames',
    'ephox.photon.demo.Popup',
    'ephox.photon.demo.Positioner',
    'ephox.sugar.Css',
    'ephox.sugar.Element',
    'ephox.sugar.Insert',
    'ephox.sugar.Location',
    'ephox.sugar.Position'
  ],

  function ($, Arr, Frames, Popup, Positioner, Css, Element, Insert, Location, Position) {
    return function () {
      var container = $('<div/>');

      var frame = function () {
        return $('<iframe/>').css({
          src: '#s' + Math.random()
        });
      };

      var f1 = frame().css({
        width: '800px',
        height: '450px',
        left: 200,
        position: 'absolute'
      });

      f1.load(function () {
        var c1 = f1.contents().find('body');
        var element = $('<button>Blah</button>', c1[0]).css({
          float: 'right'
        });

        var f2 = frame();
        f2.css({
          left: 50,
          top: 150,
          position: 'absolute'
        });

        f2.load(function () {
          var c2 = f2.contents().find('body');

          element.click(function () {
            var elem = Element(element[0]);
            var doc = Element(document);
            var position = Positioner.position(elem, doc);
            position.each(function (v) {
              var popup = Popup(v);
              Insert.append(popup, Element(document.body));
            });
          });

          c2.append(element);
        });

        c1.append(f2);
        
      });

      container.append(f1);

      container.css({
        height: 400
      });

      $('#ephox-ui').append(container);
    };
  }
);
