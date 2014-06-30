define(
  'ephox.photon.Navigation',

  [
    'ephox.perhaps.Option',
    'ephox.sugar.api.Element',
    'ephox.sugar.api.Traverse',
    'global!document'
  ],

  function (Option, Element, Traverse, document) {
    var view = function (doc) {
      // If the editor is in an iframe, don't walk up to the parent window
      var frame = doc.dom() === document ? null : doc.dom().defaultView.frameElement;
      if (frame !== null && frame !== undefined) {
        var element = Element.fromDom(frame);
        return Option.some(element);
      } else {
        return Option.none();
      }
    };

    var owner = function (element) {
      return Traverse.owner(element);
    };

    return {
      view: view,
      owner: owner
    };
  }
);
