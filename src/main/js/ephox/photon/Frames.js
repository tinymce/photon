define(
  'ephox.photon.Frames',

  [
    'ephox.compass.Arr',
    'ephox.peanut.Fun',
    'ephox.perhaps.Option',
    'ephox.photon.Reader',
    'ephox.sugar.api.Compare',
    'ephox.sugar.api.Element',
    'ephox.sugar.api.SelectorFilter',
    'ephox.sugar.api.Traverse'
  ],

  function (Arr, Fun, Option, Reader, Compare, Element, SelectorFilter, Traverse) {

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


    // At each stage:
     // if document is not an iframe element -> return []
     // if document is an iframe element -> return [iframe-document]:[rest from iframe-document]

    var getFrameTag = function (doc) {
      var frame = doc.dom().defaultView.frameElement;
      if (frame !== null && frame !== undefined) {
        var element = Element.fromDom(frame);
        return Option.some(element);
      } else {
        return Option.none();
      }
    };

    var walkUp = function (doc) {
      var frame = getFrameTag(doc);
      return frame.fold(Fun.constant([]), function (f) {
        var parent = Traverse.owner(f);
        var rest = walkUp(parent);
        return [f].concat(rest);
      });
    };

    var palax = function (element, doc) {
      var d = Traverse.owner(element);
      var paths = walkUp(d);
      return Option.some(paths);
    };

    return {
      pathTo: palax
    };
  }
);
