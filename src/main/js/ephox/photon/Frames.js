define(
  'ephox.photon.Frames',

  [
    'ephox.compass.Arr',
    'ephox.peanut.Fun',
    'ephox.perhaps.Option',
    'ephox.photon.Reader',
    'ephox.sugar.Equal',
    'ephox.sugar.Find',
    'ephox.sugar.Owner',
    'ephox.sugar.Tag'
  ],

  function (Arr, Fun, Option, Reader, Equal, Find, Owner, Tag) {

    var curry = Fun.curry;

    var isDoc = function (element, doc) {
      var idoc = Reader.doc(doc);
      var owner = Owner.owner(element);
      return Equal.eq(owner, idoc);
    };

    var pather = function (current, path, pred) {
      var doc = Reader.doc(current);
      var frames = Find.findIn(doc, 'iframe');

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
