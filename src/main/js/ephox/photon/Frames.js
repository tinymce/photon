define(
  'ephox.photon.Frames',

  [
    'ephox.peanut.Fun',
    'ephox.perhaps.Option',
    'ephox.photon.Navigation'
  ],

  function (Fun, Option, Navigation) {
    var walkUp = function (navigation, doc) {
      var frame = navigation.view(doc);
      return frame.fold(Fun.constant([]), function (f) {
        var parent = navigation.owner(f);
        var rest = walkUp(navigation, parent);
        return [f].concat(rest);
      });
    };

    var pathTo = function (element, doc, nav) {
      var navigation = nav === undefined ? Navigation : nav;
      var d = navigation.owner(element);
      var paths = walkUp(navigation, d);
      return Option.some(paths);
    };

    return {
      pathTo: pathTo
    };
  }
);
