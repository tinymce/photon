define(
  'ephox.photon.demo.Positioner',

  [
    'ephox.compass.Arr',
    'ephox.photon.Frames',
    'ephox.sugar.Element',
    'ephox.sugar.Location'
  ],

  function (Arr, Frames, Element, Location) {

    var position = function (element, doc) {
      var path = Frames.pathTo(element, doc);
      return path.each(function (v) {
        return Arr.foldr(v, function (b, a) {
          var abs = Location.absolute(a);
          return b.translate(abs.left(), abs.top());
        }, Location.absolute(element));
      });
    };

    return {
      position: position
    };
  }
);
