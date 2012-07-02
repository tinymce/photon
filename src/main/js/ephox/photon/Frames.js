define(
  'ephox.photon.Frames',

  [
    'ephox.compass.Arr',
    'ephox.peanut.Fun',
    'ephox.perhaps.Option',
    'ephox.photon.Reader',
    'ephox.sugar.api.Compare',
    'ephox.sugar.api.SelectorFilter',
    'ephox.sugar.api.Traverse'
  ],

  function (Arr, Fun, Option, Reader, Compare, SelectorFilter, Traverse) {

    var curry = Fun.curry;

    var isDoc = function (element, doc) {
      var idoc = Reader.doc(doc);
      var owner = Traverse.owner(element);
      return Compare.eq(owner, idoc);
    };

    var pather = function (current, path, pred) {
      var doc = Reader.doc(current);
      var frames = SelectorFilter.descendants(doc, 'iframe');

      return Arr.foldr(frames, function (b, a) {
        var newPath = path.concat([a]);
        var f = pred(a) ? Option.some(newPath) : pather(a, newPath, pred);
        return f.isSome() ? f : b;
      }, Option.none());
    };

    var pathTo = function (element, doc) {
      var pred = curry(isDoc, element);
      return pather(doc, [], pred);
    };

    return {
      pathTo: pathTo
    };
  }
);
