define(
  'ephox.photon.demo.PhotonDemo',

  [
    'ephox.wrap.JQuery',
    'ephox.compass.Arr',
    'ephox.photon.Frames',
    'ephox.sugar.Css',
    'ephox.sugar.Element',
    'ephox.sugar.Insert',
    'ephox.sugar.Location'
  ],

  function ($, Arr, Frames, Css, Element, Insert, Location) {
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
        console.log('c1: ', c1);
        var element = $('<button>Blah</button>', c1[0]).css({
          float: 'right'
        });

        var f2 = frame();
        f2.load(function () {
          var c2 = f2.contents().find('body');

          element.click(function () {
            var path = Frames.pathTo(Element(element[0]), Element(document));
            console.log('path: ', path.fold(function () {
              return 'none';
            }, function (v) {
              var leftOffset = Arr.foldr(v, function (b, a) {
                // TODO: Really need to export the location struct, because two passes here is ridiculous.
                return Location.absolute(a).left() + b;
              }, 0);

              var topOffset = Arr.foldr(v, function (b, a) {
                // TODO: Really need to export the location struct, because two passes here is ridiculous.
                return Location.absolute(a).top() + b;
              }, 0);


              var popup = Element(document.createElement('div'));
              Css.setAll(popup, {
                position: 'absolute',
                left: leftOffset + Location.absolute(Element(element[0])).left(),
                top: topOffset + Location.absolute(Element(element[0])).top(),
                width: 100,
                height: 50,
                'background-color': 'black'
              });
              Insert.append(popup, Element(document.body));
            }));
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
