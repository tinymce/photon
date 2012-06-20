define(
  'ephox.photon.Writer',

  [
    'ephox.photon.Reader'
  ],

  function (Reader) {

    var write = function (element, content) {
      var doc = Reader.doc(element);
      doc.open();
      doc.writeln(content);
      doc.close();
    };

    return {
      write: write
    };
  }
);
