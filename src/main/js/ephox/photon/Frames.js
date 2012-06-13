define(
  'ephox.photon.Frames',

  [
    'ephox.compass.Arr',
    'ephox.peanut.Fun',
    'ephox.perhaps.Option',
    'ephox.sugar.Find',
    'ephox.sugar.Tag'
  ],

  function (Arr, Fun, Option, Find, Tag) {

    var curry = Fun.curry;

    var iframeContents = function (iframe) {
      return iframe.dom().contentDocument || iframe.dom().contentWindow.document || iframe.dom();
    };

    var contents = function (doc) {
      return doc.dom().contentDocument || doc.dom().contentWindow ? iframeContents(doc) : doc.dom();
    };

    var isDoc = function (element, doc) {
      // TODO: Sugarise the content document / content window for an iframe.
      // CONSIDER: Should this be using Elements?
      return element.dom().ownerDocument === contents(doc);
    };

    var blah = function (current, path, pred) {
      var c = contents(current);
      var frames = Find.findIn(c, 'iframe');

      return Arr.foldr(frames, function (b, a) {
        var f = mogel(a, path.concat([a]), pred);
        return f.isSome() ? f : b;
      }, Option.none());
    };

    var mogel = function (current, path, pred) {
      return pred(current) ? Option.some(path) : blah(current, path, pred);
    };

    var pathTo = function (element, doc) {
      var pred = curry(isDoc, element);
      return mogel(doc, [], pred);
    };

    return {
      pathTo: pathTo
    };
  }
);
