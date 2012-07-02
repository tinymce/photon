define(
  'ephox.photon.Reader',

  [
    'ephox.perhaps.Option',
    'ephox.sugar.api.Element'
  ],

  function (Option, Element) {

    var iframeDoc = function (element) {
      var dom = element.dom();
      var idoc = dom.contentWindow ? dom.contentWindow.document : dom.contentDocument;
      return idoc !== undefined && idoc !== null ? Option.some(Element.fromDom(idoc)) : Option.none();
    };

    var doc = function (element) {
      var optDoc = iframeDoc(element);
      return optDoc.fold(function () {
        return element;
      }, function (v) {
        return v;
      });
    };

    return {
      doc: doc
    };
  }
);
