define(
  'ephox.photon.OuterPosition',

  [
    'ephox.compass.Arr',
    'ephox.peanut.Fun',
    'ephox.photon.Frames',
    'ephox.sugar.alien.Position',
    'ephox.sugar.api.Height',
    'ephox.sugar.api.Location',
    'ephox.sugar.api.Scroll',
    'global!document'
  ],

  function (Arr, Fun, Frames, Position, Height, Location, Scroll, document) {
    var find = function (element) {
      var scroll = Scroll.get(document);
      var offset = Location.absolute(anchor);
      var path = Frames.pathTo(anchor, document);

      return path.fold(Fun.constant(offset), function (v) {
        var r = Arr.foldr(v, function (b, a) {
          var loc = Location.absolute(a);
          return {
            left: b.left + loc.left(),
            top: b.top + loc.top()
          };
        }, { left: 0, top: 0 });

        return Position(r.left + offset.left() - scroll.left(), r.top + offset.top() + Height.getOuter(anchor) - scroll.top());
      });
    };

    return {
      find: find
    };
  }
);
