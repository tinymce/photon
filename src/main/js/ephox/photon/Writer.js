define(
  'ephox.photon.Writer',

  [
    'ephox.photon.Reader'
  ],

  function (Reader) {

    var write = function (element, content) {
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
