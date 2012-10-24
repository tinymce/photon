define(
  'ephox.photon.OuterPosition',

  [
    'ephox.compass.Arr',
    'ephox.peanut.Fun',
    'ephox.photon.Frames',
    'ephox.sugar.alien.Position',
    'ephox.sugar.api.Element',
    'ephox.sugar.api.Height',
    'ephox.sugar.api.Location',
    'ephox.sugar.api.Scroll',
    'global!document'
  ],

  function (Arr, Fun, Frames, Position, Element, Height, Location, Scroll, document) {
    var find = function (element) {
      var doc = Element.fromDom(document);
      var scroll = Scroll.get(doc);
      var offset = Location.absolute(element);
      var path = Frames.pathTo(element, doc);

      return path.fold(Fun.constant(offset), function (v) {
        var r = Arr.foldr(v, function (b, a) {
          var loc = Location.absolute(a);
          return {
            left: b.left + loc.left(),
            top: b.top + loc.top()
          };
        }, { left: 0, top: 0 });

        return Position(r.left + offset.left() - scroll.left(), r.top + offset.top() + Height.getOuter(element) - scroll.top());
      });
    };

    return {
      find: find
    };
  }
);
