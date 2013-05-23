define(
  'ephox.photon.Navigation',

  [
    'ephox.perhaps.Option',
    'ephox.sugar.api.Element',
    'ephox.sugar.api.Traverse'
  ],

  function (Option, Element, Traverse) {
    var view = function (doc) {
      var frame = doc.dom().defaultView.frameElement;
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
