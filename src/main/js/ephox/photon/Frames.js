define(
  'ephox.photon.Frames',

  [
    'ephox.compass.Arr',
    'ephox.peanut.Fun',
    'ephox.perhaps.Option'
  ],

  function (Arr, Fun, Option) {

    var curry = Fun.curry;

    var contents = function (iframe) {
      return iframe.dom().contentDocument || iframe.dom().contentWindow.document;
    };

    var isDoc = function (element, doc) {
      // TODO: Sugarise the content document / content window for an iframe.
      // CONSIDER: Should this be using Elements?
      return element.dom().ownerDocument == doc;
    };

    var blah = function (current, path, pred) {
      var c = contents(current);
      var frames = Find.findIn('iframe', c);
      return Arr.foldr(frames, function (b, a) {
        var f = mogel(a, path, pred);
        return f.isSome() ? f : b;
      }, Option.none());
    };

    var mogel = function (current, path, pred) {
      return pred(current) ? Option.some(path.concat([current])) : blah(current, path, pred);
    };

    var pathTo = function (element, doc) {
      var pred = curry(isDoc, element);
      return mogel(element, [], pred);
    };

    return {
      pathTo: pathTo
    };
  }
);
