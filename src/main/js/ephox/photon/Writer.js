define(
  'ephox.photon.Writer',

  [
    'ephox.photon.Reader',
    'ephox.sugar.api.Traverse'
  ],

  function (Reader, Traverse) {

    var write = function (element, content) {
      var hasParent = Traverse.parent(element).isSome();
      if (!hasParent) throw 'Internal error: attempted to write to an iframe that is not in the DOM';

      var doc = Reader.doc(element);
      var dom = doc.dom();
      dom.open();
      dom.writeln(content);
      dom.close();
    };

    return {
      write: write
    };
  }
);
